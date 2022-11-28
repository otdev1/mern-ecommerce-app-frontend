import firebase from 'firebase';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCng7T4zqPZQQqnEmSe_VXqVn2phmaWu54",
    authDomain: "ot-a-storage.firebaseapp.com",
    databaseURL: "https://ot-a-storage.firebaseio.com",
    projectId: "ot-a-storage",
    storageBucket: "ot-a-storage.appspot.com",
    messagingSenderId: "357944571292",
    appId: "1:357944571292:web:fcf1082575519309774459"
}

firebase.initializeApp(config);

const storage = firebase.storage();

// export default firebase
export {
    storage, firebase as default
}