//FIREBASE LIBS
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

//FIREBASE AUTH KEYS
//const serviceAccount = require("../../ServiceAccountFirebase.json");
const serviceAccount = require("../grupo28-sw2-firebase-adminsdk-x2g5v-6e2417f4aa.json");
//FIREBASE INITIALIZATION
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
    db: db
};