// netlify/functions/deleteuser.js

const { MongoClient, ObjectId } = require('mongodb');

exports.handler = async (event) => {
  if (event.httpMethod === 'DELETE') {
    try {
      // Parse and validate the request body
      const { id } = JSON.parse(event.body);
      if (!ObjectId.isValid(id)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Invalid ID format' }),
        };
      }

      // Connect to MongoDB using the URI directly
      const client = await MongoClient.connect('mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority&appName=vpn-customers', { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('customers');
      const collection = db.collection('vpn');

      // Delete the user
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      client.close();

      // Return appropriate response
      if (result.deletedCount > 0) {
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
      // Log and return error message
      console.error('Error:', error.message);
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
