// ## Day One

import http from 'node:http';
import {orders} from './data/orders.js'
import { getAllOrders, getOrderById, createOrder, deleteOrder } from './store/order-store.js'; 

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    contentType: 'application/json'
  });
  res.end(JSON.stringify({...data,timeStamp: new Date().toISOString() }, null, 2))
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://3000`);
  const pathname = parsedUrl.pathname;

  console.log(`Req ${req.method} ${pathname}`)

   if(req.method === 'GET' && pathname === '/orders')
    {
      const filters = {
        status: req.query.status,  customer: req.query.customer,
        q: req.query.q,  sort: req.query.sort,  order: req.query.order,
      };
    sendJson(res, 200, {success: true, count: orders.length, data: getAllOrders(filters)})

  } else if(req.method === 'GET' && pathname.startsWith('/orders/')) {
    const orderId = pathname.split('/').pop();
    const order = getOrderById(orderId);
    if (order) {
      sendJson(res, 200, {success: true, data: order});
    } else {
      sendJson(res, 404, {error: "Order not found"});
    }
  } else if(req.method === 'GET' && pathname === '/health') {
    sendJson(res, 200, {success: true, data: {health:"ShipHub API is healthy"}})
  }  else {
    sendJson(res, 404, {error: "Not Found"})
  }
})

server.listen(3000, ()=> {
  console.log("listening to 3000")
})

// ## Day two
// import express from 'express';
// import cors from 'cors';
// import { getAllOrders, getOrderById, createOrder, deleteOrder } from './store/order-store.js'; 


// const app = express();         
// app.use(cors());                
// app.use(express.json());        

// app.get('/orders', (req, res) => {
  // const filters = {
  //   status: req.query.status,  customer: req.query.customer,
  //   q: req.query.q,  sort: req.query.sort,  order: req.query.order,
  // };
//   const orders = getAllOrders(filters);
//   res.status(200).json({success: true, count: orders.length, data: orders });
// });


// app.get('/orders/:id', (req, res) => {
//   const orderId = req.params.id;
//   const order = getOrderById(orderId);
 
//   if (!order) {
//     return res.status(404).json({            // 'return' stops the handler
//       error: 'Order not found',
//       details: 'No order exists with ID ' + orderId,
//     });
//   }
//   res.status(200).json({success: true, data: order });
// });


// app.post('/orders', (req, res) => {
//   if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
//     return res.status(400).json({ error: 'Invalid request body' });
//   }
//   const { customer, product } = req.body;
//   if (!customer || !product) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }
//   if (typeof customer !== 'string' || typeof product !== 'string') {
//     return res.status(400).json({ error: 'Invalid field types' });
//   }
//   if (!customer.trim() || !product.trim()) {
//     return res.status(400).json({ error: 'Fields cannot be empty' });
//   }
//   const order = createOrder(customer.trim(), product.trim());
//   res.status(201).json({success: true, data: order });
// });


// app.delete('/orders/:id', (req, res) => {
//   const deleted = deleteOrder(req.params.id);
//   if (!deleted) {
//     return res.status(404).json({ error: 'Order not found' });
//   }
//   res.status(204).send();          // no body
// });

// app.get('/health', (req, res) => {
//   res.json({ success: true, message: 'ShipHub API is healthy' });
// });

// app.get('/', (req, res) => {
//   res.json({ success: true, message: 'ShipHub API is running' });
// });

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     error: 'Not Found',
//     message: `Route ${req.originalUrl} does not exist`
//   });
// });
 
// const PORT = 3000;
// app.listen(PORT, () => {        // start accepting requests
//   console.log('ShipHub API running at http://localhost:' + PORT);
// });
