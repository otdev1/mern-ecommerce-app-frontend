The link to the web application that this code implements is https://ot-amazona.onrender.com/ and it replicates some of the features and functionality of https://www.amazon.com/

The repo for the corresponding backend code of this project is https://github.com/otdev1/mern-ecommerce-app-backend/tree/main

Screenshots of various webpages of this project can be viewed at - https://drive.google.com/drive/folders/1m3oImz3Jk2RPDe0-CnJVqH-hViqNFKjg?usp=drive_link

The Sign-In credentials for the guest user are:
Email - guestuser@guest.com
Password - password

The PayPal sandbox user account credentials are: 
Email - sb-m0hdg2901075@personal.example.com
Password - iHQp<v97

On the site users can:

-	view a list of all products, change the order in which they are displayed as well as filter them based on category

-	add a product(s) to a virtual shopping cart

-	increase the quantity of a product(s) in a virtual shopping cart

-	remove a product(s) from a virtual shopping cart

-	register as a new user

-	complete a checkout process by signing in, providing shipping information, selecting a payment method, and placing the order

-	view all orders they have placed and view the details of each of these orders

-	make a payment with PayPal for an order that they have placed 

-	update their user profile

-	rate and write reviews on products

In addition to these actions, an Admin user can:

-	view or delete all orders that have been placed by every user and view the details of each of these orders

-	create, edit, and delete all products 

Some other noteworthy details of the website are that: 

-	user authentication was implemented using JSON Web Tokens (JWT) 

-	Firebase/FIRESTORE storage is used to store all uploaded product images. 

-	Axios and Mongoose is used to facilitate interaction between the React front-end, the backend API and the Mongodb document database.
