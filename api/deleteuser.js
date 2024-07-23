// netlify/functions/deleteuser.js

exports.handler = async (event, context) => {
    if (event.httpMethod === 'DELETE') {
      try {
        const { id } = JSON.parse(event.body);
  
        // Replace this with your actual database logic
        const result = await database.collection('users').deleteOne({ _id: new ObjectId(id) });
  
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
  