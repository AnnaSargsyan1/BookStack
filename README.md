# Online Shop Project

This is a full-stack online shop application built with **React** (frontend) and **Node.js/Express** (backend). It supports product browsing, cart management, checkout, and order history tracking.

---

## Table of Contents
1. [Setup and Installation](#setup-and-installation)  
2. [API Documentation](#api-documentation)  
3. [Frontend Components](#frontend-components)  
4. [Project Structure](#project-structure)  
5. [How to Run the Application](#how-to-run-the-application)

---

## Setup and Installation

### Prerequisites
- Node.js >=  20.19
- npm or yarn
- Git

### Steps
```bash
1. Clone the repository:

git clone https://github.com/AnnaSargsyan1/BookStack.git

2. Navigate to the server folder and install dependencies:

cd server
npm install

3. In current React directory install dependencies:

npm install

4. Start the backend server:

npm run dev

5. Start the frontend server:

npm run dev

6. The frontend will be available at http://localhost:3000 and backend at http://localhost:3001 (or your configured port).
```
### API Documentation

#### 1. Product Management
<pre>  
Endpoints:

• GET /api/products – Retrieve all products
• GET /api/products/:id – Retrieve a specific product
• GET /api/products/category/:category – Retrieve products by category

Product Data Structure:

{
  "id": "unique-id",
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "category": "electronics",
  "imageUrl": "product-image.jpg",
  "inStock": true,
  "quantity": 50
}
</pre>
#### 2. Shopping Cart Management
<pre>  
Endpoints:

• GET /api/cart/:userId – Retrieve user’s cart
• POST /api/cart/:userId/add – Add item to cart
• PUT /api/cart/:userId/update – Update item quantity
• DELETE /api/cart/:userId/remove/:productId – Remove item from cart
• DELETE /api/cart/:userId/clear – Clear entire cart

Cart Data Structure:

{
  "userId": "user-id",
  "items": [
    {
      "productId": "product-id",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "totalAmount": 59.98,
  "createdAt": "2024-01-01T00:00:00Z"
}
</pre>

#### 3. Order Management
<pre>
Endpoints:

• POST /api/orders – Create new order
• GET /api/orders/:userId – Retrieve user’s order history

Order Data Structure:
  
{
  "id": "order-id",
  "userId": "user-id",
  "items": [
    {
      "productId": "product-id",
      "productName": "Product Name",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "totalAmount": 59.98,
  "status": "pending",
  "orderDate": "2024-01-01T00:00:00Z",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "City",
    "zipCode": "12345"
  }
}
</pre>

### Frontend Components

```bash

Product Components

• ProductList: Displays all products in a grid
• ProductCard: Individual product display with image, name, price
• ProductDetail: Detailed view of a single product
• CategoryFilter: Filter products by category
• ProductSearch: Search products by user input

Cart Components

• Cart: Displays cart items with quantities and total
• CartItem: Individual cart item with quantity controls
• AddToCartButton: Button to add products to cart
• CartHeader: Cart icon displayed in header with product quantity in cart

Order Components

• Checkout: Order form with shipping information
• OrderSummary: Display order details before confirmation
• OrderHistory: List of user’s previous orders
• SingleOrder: Details of a single order
• ShippingForm: Form for adding shipping details

Layout Components

• Header: Navigation with cart icon and item count
• Footer: Basic footer information
• Layout: Header, Footer and main block for content

```

### Project Structure

<pre> 
bookstore/
├─ server/
│  ├─ models/
│  ├─ routes/
│  ├─ db/
│  │  ├─ categories.json
│  │  ├─ products.json
│  │  ├─ carts.json
│  │  └─ orders.json
│  └─ server.js
├─ src/
│  ├─ components/
│  ├─ context/
│  ├─ api.js
│  └─ App.js
├─ package.json
└─ README.md
</pre>

#### Backend

```bash

server/routes/: API route handlers
server/models/: Data handling (carts, orders, products)
server/db/: JSON files storing products, cart data, and orders

```

#### Frontend

```bash

src/components/: React components
src/context/: React Context for cart and user management

```

### How to Run the Application

```bash

1. Ensure backend server is running:

cd backend
npm run dev

2. Ensure frontend server is running:

cd frontend
npm run dev

3. Open your browser at http://localhost:3000

4. Browse products, add items to cart, adjust quantities, proceed to checkout, and view order history.

```

### Features:

```bash

• Browse and filter products by category
• Add items to cart and adjust quantities
• Remove single items or clear entire cart
• Place orders with shipping information
• View previous order history

```
