// netlify/functions/edituser.js

exports.handler = async (event, context) => {
    if (event.httpMethod === 'PUT') {
      try {
        const { id, email, date, telegramId } = JSON.parse(event.body);
  
        // Replace this with your actual database logic
        const result = await database.collection('users').updateOne(
          { _id: new ObjectId(id) },
          { $set: { email, date, telegramId } }
        );
  
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
  