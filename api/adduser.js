// netlify/functions/adduser.js

exports.handler = async (event, context) => {
    const { email, date, telegramId } = JSON.parse(event.body);
    
    // Your existing code to handle adding the user
    
    try {
      // Assuming you have a function to add the user to your database
      const result = await addUserToDatabase(email, date, telegramId);
  
      return {
        statusCode: 200,
        body: JSON.stringify({ insertedId: result.insertedId }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'An error occurred' }),
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    }
  };
  