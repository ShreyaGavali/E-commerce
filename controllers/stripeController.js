import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

export const payment = (async (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) => {
        if(stripeErr){
            console.log(stripeErr);
            return res.status(500).json(stripeErr);
        }else{
            return res.status(200).json(stripeRes);
        }
    })
})