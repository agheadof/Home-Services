import Stripe from "stripe";
import { config } from "dotenv";
config();

const stripe = new Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const price = {
	currency: "usd",
	unit_amount: 1000,
	product_data: {
		name: "Gold Plan",
	},
};

const CreateSession = async () => {


	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "payment",
		success_url: `${process.env.CLIENT_URL}`,
		cancel_url: `${process.env.CLIENT_URL}`,
		line_items: [
			{
				price_data: price,
				quantity: 2,
			},
		],
	});
	return session;


};

export default CreateSession;
