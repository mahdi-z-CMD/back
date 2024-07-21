// api/hello.js
exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "kir to kone mirza!" })
    };
  };
  