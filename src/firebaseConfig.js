import firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyA0hQxOL_KpwEKQ2tYzM2LwqyLqTV62pcA",
    authDomain: "ruangbawah-brew.firebaseapp.com",
    databaseURL: "https://ruangbawah-brew.firebaseio.com",
    projectId: "ruangbawah-brew",
    storageBucket: "ruangbawah-brew.appspot.com",
    messagingSenderId: "631475757839",
    appId: "1:631475757839:web:3aa01e524575acdd21947a",
    measurementId: "G-8JJ8WLKGWG"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

const settings = {
    timestampsInSnapshots: true
}
// db.settings(settings)

const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}
