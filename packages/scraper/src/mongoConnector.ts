const mongoose = require('mongoose');

export default async function connect() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to mongo. Ready to fill in your database 🍄‍');
}

export const disconnect = async () => {
  await mongoose.connection.close();
  console.log('Disconnected from mongo 🍀');
};
