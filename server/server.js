const env = require('dotenv').config({path:__dirname+'/.env'});
const fetch = require('node-fetch')

const express = require('express')
const app = express(); 
const cors = require("cors");

app.use(express.json())
app.use(express.static("public"))

app.use(cors());

let Stripe = require("stripe")(env.STRIPE_PRIVATE_KEY)
let products; 
let storeItems;

fetch(process.env.DATA_URL)
  .then(res => res.json())
  .then(data => {
    products = data;
   })
  .then(() => {
    storeItems = products.map(item => ({id: item.id, name: item.name, price: item.actualPrice }))
    console.log(storeItems)
   });

   app.post("/create-checkout-session", async (req, res) => {
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map(item => {
       const storeItem = storeItems.get(item.id)
       return {
        price_data: {
          currency: 'usd', 
          product_data: {
            name: storeItem.name
          }, 
          unit_amount: storeItem.actualPrice
        }, 
        quantity: item.quantity
       }  
      }),
      mode: "payment",
      success_url: "http://localhost:5500/success",
      cancel_url: "http://localhost:5500/cancel",
    });
  
    res.json({url: session.url}) // <-- this is the changed line
  });

app.listen(3000, () => {
  console.log('Listening on port 3000')
})