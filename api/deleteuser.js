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
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        };
      }

      const client = await MongoClient.connect('mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority&appName=vpn-customers', { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('customers');
      const collection = db.collection('vpn');

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      client.close();

      if (result.deletedCount > 0) {
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ success: false, message: 'User not found' }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        };
      }
    } catch (error) {
      console.error('Error:', error.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: error.message }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  };
};
