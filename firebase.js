const firebaseConfig = {
    apiKey: "AIzaSyBWMXgyfDEA5i-zVFJlGjt-u1zxJU5aWys",
    authDomain: "mibar-kitchen.firebaseapp.com",
    projectId: "mibar-kitchen",
    storageBucket: "mibar-kitchen.firebasestorage.app",
    messagingSenderId: "734512100645",
    appId: "1:734512100645:web:a2122880160b21799716cc",
    measurementId: "G-GYFMZ9ZNF0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

const saveOrder = async (orderData) => {
    try {
        const docRef = await db.collection('orders').add({
            ...orderData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Order saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
};

const getAllOrders = async () => {
    const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
    const orders = [];
    snapshot.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
    return orders;
};

const getOrderById = async (orderId) => {
    try {
        const doc = await db.collection('orders').doc(orderId).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting order:', error);
        throw error;
    }
};

const updateOrderStatus = async (orderId, newStatus) => {
    try {
        await db.collection('orders').doc(orderId).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Order status updated');
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};

const uploadProductImage = async (file, productId) => {
    try {
        const storageRef = storage.ref(`products/${productId}/${file.name}`);
        const snapshot = await storageRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        console.log('Image uploaded:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

window.Firebase = {
    saveOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    uploadProductImage,
};
// Debug helper
window.testFirebase = async () => {
    console.log('Testing Firebase connection...');
    try {
        const orders = await getAllOrders();
        console.log('✅ Firebase OK! Orders:', orders.length);
        return orders;
    } catch (e) {
        console.error('❌ Firebase Error:', e);
    }
};

// Auto-check Firebase on load
setTimeout(() => {
    if (window.Firebase) {
        console.log('✅ Firebase loaded successfully');
    } else {
        console.error('❌ Firebase failed to load');
    }
}, 1000);