import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { saveProduct, listProducts,  deleteProduct } from '../actions/productActions';

import firebase from '../firebase'; 
//import { storage } from '../firebase';
import FileUploader from "react-firebase-file-uploader";

function ProductsScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);
    //used to enable the display/concealment of the product creation from 

    const [id, setId] = useState('');
    
    const [name, setName] = useState('');
    
    const [price, setPrice] = useState('');
    
    const [image, setImage] = useState('');
    
    const [brand, setBrand] = useState('');
    
    const [category, setCategory] = useState('');
    
    const [countInStock, setCountInStock] = useState('');
    
    const [description, setDescription] = useState('');

    const [rating, setRating] = useState('');

    const [numReview, setNumReview] = useState('');
    
    const [uploading, setUploading] = useState(false);

    const productList = useSelector((state) => state.productList);
    //gets initial state from productList in store.js and productReducers.js

    const { loading, products, error } = productList;

    const productSave = useSelector(state => state.productSave); 
    //gets initial state from productSave in store.js and productReducers.js

    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector((state) => state.productDelete);

    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();

    const allInputs = {imgUrl: ''};
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    //const [fbimageurl, setFbimageurl] = useState(''); //firebase generated image url - custom added code 

    const [progress, setProgress] = useState(0);

    useEffect(() => {

        if (successSave) {
            setModalVisible(false);
        }

        dispatch(listProducts());

        return () => {
          //
        };
    }, [successSave, successDelete]); 
    
    const openModal = (product) => {

        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
    };

    // const submitProcessor = () => {
    //     // uploadFileHandler();
    //     FireBaseHandler();
    //     formsubmitHandler();
    // }

    const submitHandler = (e) => { //formsubmitHandler
        e.preventDefault();
         //prevents screen from being refreshed when user clicks on submit button
        dispatch(
            saveProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            })
        ); //see userActions.js for definition of signin
    }

    // const formsubmitHandler = (e) => { //formsubmitHandler
    //     e.preventDefault();
    //      //prevents screen from being refreshed when user clicks on submit button

    //     if(imageAsFile === '' ) {
    //         console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    //     }
        
    //     const uploadTask = storage.ref(`images/${imageAsFile.name}`).put(imageAsFile);

    //     //initiates the firebase side uploading
    //     uploadTask.on('state_changed',
    //         (snapshot) => {
    //             //takes a snap shot of the process as it is happening
    //             //console.log(snapshot);
    //         },
    //         (error) => {
    //             //catches the errors
    //             console.log(error);
    //         },
    //         () => {
    //             // gets the functions from storage refences the image storage in firebase by the children
    //             // gets the download url then sets the image from firebase as the value for the imgUrl key:
    //             storage.ref('images').child(imageAsFile.name).getDownloadURL().then(firebaseurl => {
                    
    //                 //console.log(firebaseurl);
    //                 setImage(firebaseurl);

    //                 //console.log(image);

    //                 //setFbimageurl({firebaseurl});
    //                 setImageAsUrl(prevObject => ({...prevObject, imgUrl: firebaseurl}))

    //                 //setImage(prevObject => ({...prevObject, imgUrl: firebaseurl}));

    //                 //console.log(product.image)

    //             });

    //             dispatch(
    //                 saveProduct({
    //                     _id: id,
    //                     name,
    //                     price,
    //                     image,
    //                     brand,
    //                     category,
    //                     countInStock,
    //                     description,
    //                 })
    //             ); //see userActions.js for definition of signin

    //         }
    //     )

    //     // dispatch(
    //     //     saveProduct({
    //     //         _id: id,
    //     //         name,
    //     //         price,
    //     //         image,
    //     //         brand,
    //     //         category,
    //     //         countInStock,
    //     //         description,
    //     //     })
    //     // ); //see userActions.js for definition of signin
    // }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };

    // const uploadFileHandler = (e) => {
    //     const file = e.target.files[0]; //single file upload allowed only is indicated by index 0
    

    //     const bodyFormData = new FormData();

    //     bodyFormData.append('image', file);

    //     setUploading(true);

    //     axios
    //       .post('/api/uploads', bodyFormData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       })
    //       .then((response) => {
    //         setImage(response.data);
    //         setUploading(false);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         setUploading(false);
    //       });
    //   };
    
    const uploadFileHandler = (e) => {
        
        const file = e.target.files[0]; //single file upload allowed only is indicated by index 0
        //const file = {image};
        //setImage(file);

        //const {file} = image;

        //try this - const uploadTask = storage.ref(`images/${file.name}`).put(image);

        setImageAsFile(imageFile => (file));

        if(imageAsFile === '' ) {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }
        
        //const uploadTask = storage.ref(`images/${imageAsFile.name}`).put(imageAsFile);

        //initiates the firebase side uploading
        /*uploadTask.on('state_changed',
            (snapshot) => {
                //takes a snap shot of the process as it is happening
                //console.log(snapshot);
            },
            (error) => {
                //catches the errors
                console.log(error);
            },
            () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storage.ref('images').child(imageAsFile.name).getDownloadURL().then(firebaseurl => {
                    
                    //console.log(firebaseurl);
                    setImage(firebaseurl);

                    //console.log(image);

                    //setFbimageurl({firebaseurl});
                    setImageAsUrl(prevObject => ({...prevObject, imgUrl: firebaseurl}))

                    //setImage(prevObject => ({...prevObject, imgUrl: firebaseurl}));

                    //console.log(product.image)

                });

            }
        )*/


    };

    // const FireBaseHandler = (e) => {
    //     e.preventDefault();

    //     if(imageAsFile === '' ) {
    //         console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    //     }
        
    //     const uploadTask = storage.ref(`images/${imageAsFile.name}`).put(imageAsFile);

    //     //initiates the firebase side uploading
    //     uploadTask.on('state_changed',
    //         (snapshot) => {
    //             //takes a snap shot of the process as it is happening
    //             //console.log(snapshot);
    //         },
    //         (error) => {
    //             //catches the errors
    //             console.log(error);
    //         },
    //         () => {
    //             // gets the functions from storage refences the image storage in firebase by the children
    //             // gets the download url then sets the image from firebase as the value for the imgUrl key:
    //             storage.ref('images').child(imageAsFile.name).getDownloadURL().then(firebaseurl => {
                    
    //                 //console.log(firebaseurl);
    //                 setImage(firebaseurl);

    //                 //console.log(image);

    //                 //setFbimageurl({firebaseurl});
    //                 setImageAsUrl(prevObject => ({...prevObject, imgUrl: firebaseurl}))

    //                 //setImage(prevObject => ({...prevObject, imgUrl: firebaseurl}));

    //                 //console.log(product.image)
    //             });

    //         }
    //     )
    // }

    const handleUploadStart = () => { 
        
        //const file = e.target.files[0];

        //setImageAsFile(imageFile => (file));

        setUploading(true); 
        
        setProgress(0); 
    };

    const handleProgress = (progress) => setProgress( progress );

    const handleUploadError = (error) => {
        setUploading(false);
        console.error(error);
      };
    
    
    const handleUploadSuccess = (imageAsFile) => { 
        
        setUploading(false); 
        
        setProgress(100); 

        firebase
          .storage()
          .ref("images")
          .child(imageAsFile)
          .getDownloadURL()
          .then(firebaseurl => {
                    
            //console.log(firebaseurl);

            setImage(firebaseurl);

           });
    };

    return  <div className="content content-margined">
                <div className="product-header">
                    <h3>Products</h3>
                    <button className="button primary" onClick={ () => openModal({}) }>
                    {/* {} i.e empty object is passed to openModal in order to create a new product */}
                    {/* <button className="button primary"> */}
                        Create Product
                    </button>
                </div>

                {/* <form onSubmit={FireBaseHandler}>
                    <input 
                        type="file"
                        onChange={uploadFileHandler}
                    />
                    <button>upload to firebase</button>
                </form>
                <img src={imageAsUrl.imgUrl} alt="image tag" /> */}

                    {/* <FileUploader
                        //hidden
                        accept="image/*"
                        name="image"
                        //randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    /> */}
                
                {modalVisible && (
                    /*if modalVisible is set to true via setModalVisible in openModal show 
                    the product creation form */

                    <div className="form">
                        {/* <form onSubmit={formsubmitHandler} > */}
                        {/* <form onSubmit={submitProcessor} > */}
                        <form onSubmit={submitHandler} >
                            {/* <form > */}
                            <ul className="form-container">
                                <li>
                                    <h2>Create Product</h2>
                                </li>
                                <li>
                                    {loadingSave && <div>Loading...</div>} 
                                    {/*shows loading if signin returns loading after being dispatched*/}
                                    {errorSave && <div>{errorSave}</div>}
                                </li>
                                <li>
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        type="name" 
                                        name="name" 
                                        value={name}
                                        id="name" 
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </li>
                                <li>
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={price}
                                        id="price"
                                        onChange={(e) => setPrice(e.target.value)}
                                    >
                                    </input>
                                </li>
                                <li>
                                    <label htmlFor="image">Image</label>
                                    {image ? <img src={image} alt="product-img" width="120" height="150"></img> : ''}
                                    {/* <img src={image} alt="product-img" width="120" height="150"></img> */}
                                    <input
                                        type="text"
                                        name="image"
                                        value={image}
                                        id="image"
                                        // onChange={(e) => setImage(e.target.value)}
                                        //onChange={uploadFileHandler}
                                        disabled //prevents text input from being entered by user
                                    >
                                    </input>
                                    {/* <input type="file" onChange={uploadFileHandler}></input> */}
                                    <FileUploader
                                        //hidden
                                        accept="image/*"
                                        name="image"
                                        //randomizeFilename
                                        storageRef={firebase.storage().ref("images")}
                                        onUploadStart={handleUploadStart}
                                        onUploadError={handleUploadError}
                                        onUploadSuccess={handleUploadSuccess}
                                        onProgress={handleProgress}
                                    />
                                    {/* {uploading && <div>Uploading...</div>} */}
                                </li>
                                <li>
                                    <label htmlFor="brand">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={brand}
                                        id="brand"
                                        onChange={(e) => setBrand(e.target.value)}
                                    >
                                    </input>
                                </li>
                                <li>
                                    <label htmlFor="countInStock">CountInStock</label>
                                    <input
                                        type="text"
                                        name="countInStock"
                                        value={countInStock}
                                        id="countInStock"
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    >
                                    </input>
                                </li>
                                <li>
                                    <label htmlFor="name">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={category}
                                        id="category"
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                    </input>
                                </li>
                                <li>
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        name="description"
                                        value={description}
                                        id="description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="A description is required..."
                                    >
                                    </textarea>
                                </li>
                                <li>
                                    {/* <button type="submit" className="button primary">Create</button> */}
                                    <button type="submit" className="button primary">
                                        {id ? 'Update' : 'Create'}
                                        {
                                            /*if id exists, a product is being editted so show Update label 
                                            on the button else show Create label on the button
                                            id will exist when a non-empty object is passed to openModal,
                                            openModal is triggered whenever the Create Product or Edit button 
                                            is clicked*/
                                        }
                                    </button>
                                </li> 
                                <li>
                                    <button 
                                        type="button" 
                                        onClick={ () => setModalVisible(false)} 
                                        className="button secondary"
                                    >Cancel
                                    </button>
                                </li>   
                            </ul>
                        </form>
                    </div>

                )}
                
                <div className="product-list">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map( product =>(
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button className="button" onClick={() => openModal(product)}>
                                            Edit
                                        </button>
                                        {' '} {/*add space between edit and delete buttons */}
                                        <button className="button" onClick={() => deleteHandler(product)}>
                                            Delete
                                        </button>
                                        {/* <button> Edit </button> */}
                                        {/* <button> Delete </button> */}
                                    </td> 
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
            
  }
  export default ProductsScreen;