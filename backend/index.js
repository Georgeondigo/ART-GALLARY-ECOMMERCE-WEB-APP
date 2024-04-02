const port = 5858;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const stripe = require('stripe')('sk_test_51Ow7SuRurjVAv2nUx6lDaDNRNz2kGfUC9LuKBIup58STVfWDlKF7ROiU1RDCDZSgFKpQUf8ahZveUzzoWgjS9GTP00tozMReER');

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://georgeondigo:Benadate%401998@cluster0.bngkl1y.mongodb.net/ART-SCAPE");

// Image Storage Engine for products
const productStorage = multer.diskStorage({
    destination: './upload/product_images',
    filename: (req, file, cb) => {
        cb(null, `product_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Image Storage Engine for artists
const artistStorage = multer.diskStorage({
    destination: './upload/artist_images',
    filename: (req, file, cb) => {
        cb(null, `artist_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Image Storage Engine for artworks
const artworkStorage = multer.diskStorage({
    destination: './upload/artwork_images',
    filename: (req, file, cb) => {
        cb(null, `artwork_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Multer upload configurations
const productUpload = multer({ storage: productStorage });
const artistUpload = multer({ storage: artistStorage });
const artworkUpload = multer({ storage: artworkStorage });

// Creating Upload Endpoint for product images
app.use('/product_images', express.static('upload/product_images'));

// Creating Upload Endpoint for artist images
app.use('/artist_images', express.static('upload/artist_images'));

// Define static file server for artwork images
app.use('/artwork_images', express.static('upload/artwork_images'));

// Endpoint for uploading product images
app.post("/upload/product", productUpload.single('productImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    // Construct the full image URL
    const imageUrl = `http://localhost:${port}/product_images/${req.file.filename}`;

    res.json({
        success: 1,
        image_url: imageUrl
    });
});

// Endpoint for uploading artist images
app.post("/upload/artist", artistUpload.single('artistImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    // Construct the full image URL
    const imageUrl = `http://localhost:${port}/artist_images/${req.file.filename}`;

    res.json({
        success: 1,
        image_url: imageUrl
    });
});

// Endpoint for uploading artwork images
app.post("/upload/artwork", artworkUpload.single('artworkImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: 0, message: 'No file uploaded' });
        }

        // Construct the full image URL
        const imageUrl = `http://localhost:${port}/artwork_images/${req.file.filename}`;

        res.json({
            success: 1,
            image_url: imageUrl
        });
    } catch (error) {
        console.error('Error uploading artwork:', error);
        res.status(500).json({ success: 0, message: 'Failed to upload artwork' });
    }
});

// Schema for Creating Products
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    artist:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default: true
    },
})

// Endpoint for adding a product
app.post("/addproduct",async(req,res)=>{
    try {
        let products = await Product.find({});
        let id = 1;
        if(products.length > 0) {
            let lastProduct = products[products.length - 1];
            id = lastProduct.id + 1;
        }

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            artist: req.body.artist,
        });

        await product.save();
        console.log("Product saved:", product);
        res.json({
            success:true,
            name:req.body.name
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, message: 'Failed to add product' });
    }
});

// Endpoint for deleting a product
app.post('/removeproduct', async(req,res)=>{
    try {
        await Product.findOneAndDelete({ id:req.body.id });
        console.log("Product removed");
        res.json({
            success:true,
            name:req.body.name
        });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ success: false, message: 'Failed to remove product' });
    }
});

// Endpoint for getting all products
app.get('/allproducts',async(req,res)=>{
    try {
        let products = await Product.find({});
        console.log("All products fetched");
        res.json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch products' });
    }
});

// Schema for Creating Artists
const Artist = mongoose.model("Artist", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    descriptionOfWork: {
        type: String,
        required: true
    },
    artworks: [
        {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ]
});

// Endpoint for adding an artist
app.post("/addartist", async (req, res) => {
    try {
        let artists = await Artist.find({});
        let id = 1;
        if (artists.length > 0) {
            let lastArtist = artists[artists.length - 1];
            id = lastArtist.id + 1;
        }

        // Extract artist details from the request body
        const { name, picture, bio, descriptionOfWork, artworks } = req.body;

        // Map artworks and assign IDs
        const mappedArtworks = artworks.map((artwork, index) => ({
            id: id + index,
            ...artwork
        }));

        // Construct the artist object with the provided data
        const artist = new Artist({
            id: id,
            name: name,
            picture: picture,
            bio: bio,
            descriptionOfWork: descriptionOfWork,
            artworks: mappedArtworks
        });

        // Save the artist to the database
        await artist.save();
        console.log("Artist saved:", artist);
        res.json({
            success: true,
            name: name
        });
    } catch (error) {
        console.error('Error adding artist:', error);
        res.status(500).json({ success: false, message: 'Failed to add artist' });
    }
});

// API for removing an artist
app.post('/removeartist', async (req, res) => {
    try {
        await Artist.findOneAndDelete({ id: req.body.id });
        console.log("Artist removed");
        res.json({
            success: true,
            id: req.body.id
        });
    } catch (error) {
        console.error('Error removing artist:', error);
        res.status(500).json({ success: false, message: 'Failed to remove artist' });
    }
});

// API to get all artists
app.get('/allartists', async (req, res) => {
    try {
        let artists = await Artist.find({});
        console.log("All artists fetched");
        res.json(artists);
    } catch (error) {
        console.error('Error fetching all artists:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch artists' });
    }
});

//Schema creating for user model

const Users = mongoose.model('Users',{
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type:String
    },
    cartData:{
        type: Object,
       
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Creating Endpoint for registering user

app.post("/signup",async (req,res)=>{

    let check = await Users.findOne({email:req.body.email}); 

    if(check){
        return res.status(400).json({success:false,error:"Existing user"})
    }

    let cart = {};

    for (let i = 0; i < 300; i++) {
        cart[i]=0 ;     
    }

    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_artscape')
    res.json({success:true,token})
})

//Endpoint for User login

app.post('/login',async(req,res)=>{

    let user = await Users.findOne({email:req.body.email});

    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_artscape');
            res.json({success:true,token})
        }
        else{
        res.json({success:false,error:"Wrong Password"})
        }
    }else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
    

})

//creating endpoint for newcollection data

app.get('/newcollection',async(req,res)=>{
    let products = await Product.find({})

    let newcollection = products.slice(1).slice(-9)
    console.log(newcollection);
    res.send(newcollection)
})

//endpoint for Explore

app.get('/explore', async (req, res) => {
    try {
        const categories = ["Painting", "photograph", "DigitalArt", "drawing"];
        let explore = [];

        for (let category of categories) {
            // Find all products in the category
            const products = await Product.find({ category: category });

            console.log(`Category: ${category}, Products: ${products.length}`);

            if (products.length > 0) {
                // Choose a random product from the category
                const randomIndex = Math.floor(Math.random() * products.length);
                explore.push(products[randomIndex]);
            }
        }

        res.send(explore);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//creating middleware to fetch user
const fetchUser = async (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate with valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_artscape');
            req.user = data.user;
            next()

        } catch (error) {
            res.status(401).send({errors:"Please authenticate"})
        }
    }
}

//creating endpoint for adding product in cartdata

app.post('/addtocart',fetchUser, async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id})

    userData.cartData[req.body.itemId]+=1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData}) 

    console.log("added")
})

//endpoint for remove to cart

app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData}) 

    console.log("removed")
})

//creating endpoint to get cart data

app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("Getcart");
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData)
})


// Schema for order

const orderSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    items: { type: Array, required:true},
    amount: { type: Number, required: true},
    address:{type:Object,required:true},
    status: {type:String,default:"Order Processing"},
    date: {type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// Function to get default cart data
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
}

// Endpoint for placing an order
app.post("/placeorder", async (req, res) => {

    try {
        const defaultCartData = getDefaultCart();
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await Users.findByIdAndUpdate(req.body.userId, { cartData: defaultCartData });

        const line_items = req.body.items.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [item.image],
              },
              unit_amount: item.price*100
            },
            quantity: item.quantity
          }))

        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Charge"
                },
                unit_amount: 5*100
            },
            quantity:1
        })
        
          const session = await stripe.checkout.sessions.create({
            success_url: `http://localhost:3000/verifyorder?success=true&orderId=${newOrder._id}`,
            cancel_url: `http://localhost:3000/verifyorder?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
          });
      
          res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
});

// Endpoint for listing orders for admin panel
app.get("/listorders", async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
});

// Endpoint for updating order status
app.post("/updatestatus", async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

});

// Endpoint for listing user orders for frontend
app.post("/userorders", async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
});

app.post("/verifyorder", async (req, res) => {
    const {orderId , success} = req.body;
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

});


app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port);
    } else {
        console.error("Error starting server:", error);
    }
});
