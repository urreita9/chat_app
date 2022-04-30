const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ekvu2.mongodb.net/${process.env.MONGO_NAME}`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				// useCreateIndex: true,
			}
		);

		console.log('DB online');
	} catch (error) {
		console.log(error);
		throw new Error('Error in Db');
	}
};

module.exports = { dbConnection };
