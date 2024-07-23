// netlify/functions/deleteuser.js

const { MongoClient, ObjectId } = require('mongodb');

exports.handler = async (event) => {
  if (event.httpMethod === 'DELETE') {
    try {
      const { id } = JSON.parse(event.body);

      if (!ObjectId.isValid(id)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Invalid ID format' }),
        };
      }

      const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('customers');
      const collection = db.collection('vpn');

      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      client.close();

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
