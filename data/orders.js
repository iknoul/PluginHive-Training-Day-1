export const orders = [
    { 
        "orderId": "ORD-101", 
        "customerName": "Priya Sharma",
        "orderStatus": "PROCESSING",
        "lineItems": [
            { 
                "itemId": "ITM-001", "name": "Mechanical Keyboard",
                "quantity": 1, "unitPrice": 4999 
            },
            { 
                "itemId": "ITM-002", "name": "USB Hub",
                "quantity": 1, "unitPrice": 1299 
            }  
        ],
        "shipment": { 
            "shipmentId": "SHP-201", 
            "carrier": "FedEx",
            "trackingStatus": "IN_TRANSIT"
         }
    }
]