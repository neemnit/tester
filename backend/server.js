 // Load environment variables
 require('dotenv').config();
 const express = require('express');
 const cors = require('cors');
 const stripe = require('stripe')(process.env.STRIPE_KEY) // Initialize Stripe with secret key
 
 // Validate environment variables
 
 
 
 
 const app = express();
 
 // CORS configuration
 
 app.use(cors());
 
 // Middleware for handling JSON
 app.use(express.json());
 
 // Log all incoming requests for debugging
 
 
 // Temporary in-memory store for user data (can be replaced with a database)
 let tempStore = {};
 
 // Payment route
 app.post('/payment', async (req, res) => {
     try {
         const userData = req.body;
 
         // Validate the request body
         if (!userData) {
             return res.status(400).json({ error: 'Invalid request body' });
         }
 
         // Storing user data in the temporary store using a unique session ID
         const sessionId = generateSessionId();
         tempStore[sessionId] = userData;
 
         // Create a Stripe product
         const product = await stripe.products.create({ name: "T-Shirt" });
 
         // Create a Stripe price for the product
         const price = await stripe.prices.create({
             product: product.id,
             unit_amount: 100 * 100, // 100 INR
             currency: 'inr',
         });
 
         // Create a Stripe checkout session
         const session = await stripe.checkout.sessions.create({
             payment_method_types: ['card'],
             line_items: [{ price: price.id, quantity: 1 }],
             mode: 'payment',
             success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}&user_data=${sessionId}`,
             cancel_url: `http://localhost:5173/cancel`,
             billing_address_collection: 'required',
         });
 
         // Log the session URL for debugging
         res.status(200).json({ url: session.url });
     } catch (error) {
         console.error('Error creating Stripe session:', error);
         res.status(500).json({ error: 'Internal Server Error' });
     }
 });
 
 // Success route
 app.get('/success', async (req, res) => {
     try {
         const { session_id, user_data } = req.query;
 
         if (!session_id || !user_data) {
             return res.status(400).json({ error: 'Session ID or user data is missing' });
         }
 
         const userData = tempStore[user_data];
         if (!userData) {
             return res.status(404).json({ error: 'User data not found' });
         }
 
         const session = await stripe.checkout.sessions.retrieve(session_id);
 
         res.status(200).json({
             message: 'Payment successful',
             userData: userData,
             sessionDetails: session,
         });
     } catch (error) {
         console.error('Error handling success:', error);
         res.status(500).json({ error: 'An error occurred while processing the payment.' });
     }
 });
 
 // OPTIONS preflight request handling
 app.options('*', (req, res) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     res.send();
 });
 
 // Function to generate a unique session ID
 function generateSessionId() {
     return Math.random().toString(36).substring(7);
 }
 
 // Start the server on port 4000
 const port = process.env.PORT || 4000;
 app.listen(port, () => {
     console.log(`Stripe server running on http://localhost:${port}`);
 });
 
 // Test Stripe initialization
 // stripe.products
 //     .list()
 //     .then((products) => console.log('Stripe is initialized successfully:', products.data))
 //     .catch((error) => {
 //         console.error('Error initializing Stripe:', error);
 //         process.exit(1); // Exit if Stripe initialization fails
 //     });
 