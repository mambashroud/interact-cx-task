const express = require('express');
const axios = require('axios');
const port = process.env.PORT;

const app = express();
app.use(express.json());
const baseURL = 'https://orderstatusapi-dot-organization-project-311520.uc.r.appspot.com/api/getOrderStatus';

app.get('/', (request, response) => {
  response.send("working");
});

app.post('/', async (request, response) => {
  const { queryResult } = request.body;

    const orderId = queryResult.parameters.order_id;

    const result = await axios.post(baseURL, { orderId: orderId });

    var shipmentDate = result.data.shipmentDate;
    const newshipmentDate = new Date(shipmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    console.log(newshipmentDate);

    const res = {
      fulfillmentText: `Your order ${orderId} will be shipped on ${newshipmentDate}`,
      fulfillmentMessages: [{
        text: {
          text: [`Your order ${orderId} will be shipped on ${newshipmentDate}`]
        },
      }]
    };

    response.json(res);
  } )
 

app.listen(port || 3000, () => {
  console.log('Server is running on port 3000');
})
