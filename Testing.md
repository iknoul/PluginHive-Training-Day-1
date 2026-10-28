# Testing Evidence - ShipHub API

### 1. Filter Miss
**Command:**
\`\`\`bash
curl -i "http://localhost:3000/orders?status=pending"
\`\`\`
**Output:**
\`\`\`
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
{"success":true,"count":0,"data":[], "timeStamp": "2026-10-28T09:12:03.277Z"}
...
\`\`\`

### 2. Filter Hit
**Command:**
\`\`\`bash
curl -i "http://localhost:3000/orders?status=Pending"
\`\`\`
**Output:**
\`\`\`
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
{"success":true,
"count":1,
"data":[{"id":"ORD-001","customer":"Alice Johnson","product":"Wireless Headphones","status":"Pending"}]},
"timeStamp": "2026-10-28T09:12:03.277Z"
...
\`\`\`

### 3. Existing Order
**Command:**
\`\`\`bash
curl -i "http://localhost:3000/orders/ORD-001"
\`\`\`
**Output:**
\`\`\`
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
{
  "success": true,
  "data": {
    "id": "ORD-001",
    "customer": "Alice Johnson",
    "product": "Wireless Headphones",
    "status": "Pending"
  },
  "timeStamp": "2026-10-28T09:12:03.277Z"
}
...
\`\`\`

### 4. Missing Order
**Command:**
\`\`\`bash
curl -i "http://localhost:3000/orders/ORD-008"
\`\`\`
**Output:**
\`\`\`
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
{
  "error": "Order not found",
  "timeStamp": "2026-10-28T09:11:21.294Z"
}
...
\`\`\`

### 5. health
**Command:**
\`\`\`bash
curl -i "http://localhost:3000/health"
\`\`\`
**Output:**
\`\`\`
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
{"success":true,"message":"ShipHub API is healthy"}
...
\`\`\`

### 6. Unknown Route
**Command:**
\`\`\`bash
curl -i "http://localhost:3000/hi"
Content-Type: application/json; charset=utf-8
\`\`\`
**Output:**
\`\`\`
HTTP/1.1 404 Not Found

{
  "error": "Not Found",
  "timeStamp": "2026-10-28T09:09:30.553Z"
}
...
\`\`\`

