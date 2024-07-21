const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority&appName=vpn-customers";
let client;

async function connectToDatabase() {
  if (client) return client;
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client;
}

exports.handler = async (event, context) => {
  try {
    const dbClient = await connectToDatabase();
    const db = dbClient.db('your-database-name'); // replace with your database name
    const collection = db.collection('your-collection-name'); // replace with your collection name
    
    // Example query
    const data = await collection.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data fetched successfully", data }),
    };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
