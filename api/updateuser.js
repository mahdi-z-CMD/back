// netlify/functions/updateuser.js
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB URI and Database
const uri = 'mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority';
const databaseName = 'customers';
const collectionName = 'vpn';

exports.handler = async (event, context) => {
  if (event.httpMethod === 'PUT') {
    try {
      const { id, email, date, telegramId } = JSON.parse(event.body);

      // Validate ObjectId
      if (!ObjectId.isValid(id)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Invalid ID format' }),
        };
      }

      // Connect to MongoDB
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const database = client.db(databaseName);
      const collection = database.collection(collectionName);

      // Update the user
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { email, date, telegramId } }
      );

      await client.close();

      if (result.modifiedCount > 0) {
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true }),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ success: false, message: 'User not found' }),
        };
      }
    } catch (error) {
      console.error('Error:', error); // Log errors
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ success: false, message: 'Method not allowed' }),
  };
};
