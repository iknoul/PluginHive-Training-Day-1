// order-store.js
const orders = [
  { id: 'ORD-001', customer: 'Alice Johnson',
    product: 'Wireless Headphones', status: 'Pending' },
  { id: 'ORD-002', customer: 'Bob Smith',
    product: 'Laptop Stand', status: 'Shipped' },
];
let nextId = 3;
 
export function getAllOrders(filters = {}) {
  let result = [...orders];                       // copy: don't mutate the original
  if (filters.status) result = result.filter(o => o.status === filters.status);
  return result;
}
 
export function getOrderById(id) {
  return orders.find(o => o.id === id) || null;   // order or null
}
 
export function createOrder(customer, product) {
  const order = {
    id: 'ORD-' + String(nextId++).padStart(3, '0'),   // ORD-003, ORD-004 ...
    customer, product, status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}


export function updateOrder(id, updates) {
  const order = orders.find(order => order.id === id);
  if (!order) return null;                         // route will send 404
  if (updates.customer !== undefined) order.customer = updates.customer;
  if (updates.product  !== undefined) order.product  = updates.product;
  if (updates.status   !== undefined) order.status   = updates.status;
  return { ...order };                  // return a COPY, not the internal object
}
 
export function deleteOrder(id) {
  const index = orders.findIndex(order => order.id === id);
  if (index === -1) return false;                  // not found
  orders.splice(index, 1);                         // remove exactly one item
  return true;
}
