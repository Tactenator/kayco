const env = require('dotenv').config({path:__dirname+'/.env'});

const express = require('express')
const app = express(); 
const cors = require("cors");

app.use(express.json())
app.use(express.static("public"))

app.use(cors());

let Stripe = require("stripe")(env.STRIPE_PRIVATE_KEY)
let products; 
let map;

fetch(process.env.DATA_URL)
  .then(res => res.json())
  .then(data => {
    products = data;
   })
  .then(() => {
    map = products.map(item => ({ name: item.name, price: item.price }))
    console.log(map)
   });

   app.post("/create-checkout-session", async (req, res) => {
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5500/success",
      cancel_url: "http://localhost:5500/cancel",
    });
  
    res.json({url: session.url}) // <-- this is the changed line
  });

app.listen(3000, () => {
  console.log('Listening on port 3000')
})