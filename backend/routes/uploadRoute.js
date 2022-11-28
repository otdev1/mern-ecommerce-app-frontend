import express from 'express';
//import multer from 'multer';
//import firebase from '../../frontend/src/firebase';

// const storage = multer.diskStorage({
//     destination(req, file, cb) { //cb - callback function
//       cb(null, 'uploads/'); //all files are uploaded to upload folder
//     },
//     filename(req, file, cb) {
//       cb(null, `${Date.now()}.jpg`); //names of all uploaded files will saved as the current date
//     },
//   });

// const upload = multer({ storage }); //upload is used a middleware in router.post

// const router = express.Router();

// router.post('/', upload.single('image'), (req, res) => { 
//   //single indicates that the upload of 1 file with the name is allowed
//   res.send(`/${req.file.path}`);
// });

//firebase code
// let bucketName = 'images';
// let file = ;
// let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
// let uploadTask = storage.put(file)
// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//     )


export default router;