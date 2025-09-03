# Online Shop Project

This is a full-stack online shop application built with **React** (frontend) and **Node.js/Express** (backend). It supports product browsing, cart management, checkout, and order history tracking.

---

## Table of Contents
1. [Setup and Installation](#setup-and-installation)  
2. [API Documentation](#api-documentation)  
3. [Frontend Components](#frontend-components)  
4. [Project Structure](#project-structure)  
5. [How to Run the Application](#how-to-run-the-application)  
6. [Features](#features)

---

## Setup and Installation

### Prerequisites
- Node.js >= 20.19
- npm or yarn
- Git

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/AnnaSargsyan1/BookStack.git

# 2. Navigate to the server folder and install dependencies
cd server
npm install

# 3. In the React directory, install dependencies
cd ../frontend
npm install

# 4. Start the backend server
cd ../server
npm run dev

# 5. Start the frontend server
cd ../frontend
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:3001 (or your configured port)
```
## API Documentation

### 1. Product Management

**Endpoints:**

- `GET /api/products` – Retrieve all products  
  **Query Parameters:**  
  - `category` *(string, optional)* – Filter products by category name  
  - `search` *(string, optional)* – Search products by name  
  - `page` *(number, optional, default: 1)* – Page number for pagination  
  - `limit` *(number, optional, default: 12)* – Items per page  

- `GET /api/products/:id` – Retrieve a specific product by ID  

**Product Data Structure:**

```json
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
```
---

### 2. Shopping Cart Management

**Endpoints:**

- `GET /api/cart/:userId` – Retrieve a user’s cart  
- `POST /api/cart/:userId/add` – Add an item to the cart  
- `PUT /api/cart/:userId/update` – Update item quantity in the cart  
- `DELETE /api/cart/:userId/remove/:productId` – Remove a single item from the cart  
- `DELETE /api/cart/:userId/clear` – Clear the entire cart  

**Cart Data Structure:**

```json
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
```
---

### 3. Order Management

**Endpoints:**

- `POST /api/orders` – Create a new order  
- `GET /api/orders/:userId` – Retrieve a user’s order history  
- `GET /api/orders/:orderId` – Retrieve details of a single order  

**Order Data Structure:**

```json
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
```
---

### 4. Frontend Components

**Product Components:**

- `ProductList` – Displays all products in a grid  
- `ProductCard` – Individual product display with image, name, and price  
- `ProductDetail` – Detailed view of a single product  
- `CategoryFilter` – Filter products by category  
- `ProductSearch` – Search products by user input  

**Cart Components:**

- `Cart` – Displays cart items with quantities and total  
- `CartItem` – Individual cart item with quantity controls  
- `AddToCartButton` – Button to add products to cart  
- `CartHeader` – Cart icon in header showing product quantity  

**Order Components:**

- `Checkout` – Order form with shipping information  
- `OrderSummary` – Display order details before confirmation  
- `OrderHistory` – List of a user’s previous orders  
- `SingleOrder` – Detailed view of a single order  
- `ShippingForm` – Form for adding shipping details  

**Layout Components:**

- `Header` – Navigation with cart icon and item count  
- `Footer` – Basic footer information  
- `Layout` – Header, Footer, and main content wrapper  

**Pagination Component:**

- `Pagination` – Reusable component for navigating through paged lists of products or orders  

*Notes:*  
- Components are modular and reusable.  
- Product and cart components update dynamically using React state and context.  

---

### 5. Project Structure

```bash
bookstore/
├─ server/
│  ├─ models/          # Data handling (carts, orders, products)
│  ├─ routes/          # API route handlers
│  ├─ db/              # JSON files storing products, cart data, and orders
│  │  ├─ categories.json
│  │  ├─ products.json
│  │  ├─ carts.json
│  │  └─ orders.json
│  └─ server.js        # Main backend server
├─ src/
│  ├─ components/      # React components
│  ├─ context/         # React Context for cart and user management
│  ├─ api.js           # Axios API wrapper
│  └─ App.js           # Main React App
├─ package.json
└─ README.md
```
---

### 6. How to Run the Application

Follow these steps to run the online shop locally:

**1. Backend Setup**

```bash
cd server
npm install
npm run dev
```
**2. Frontend Setup**

```bash
npm install
npm run dev
```
### 3. Open the Application

- Open your browser and go to: [http://localhost:3000](http://localhost:3000)  
- Ensure both frontend and backend servers are running for full functionality.  
- You can now browse products, add items to the cart, checkout, and view your order history.

## 7. Features

- **Browse Products** – View all products in a responsive grid.  
- **Category Filter** – Filter products by category.  
- **Search Products** – Search products by name in real-time.  
- **Shopping Cart** – Add items to the cart, update quantities, remove items, or clear the cart.  
- **Checkout** – Place orders with shipping information.  
- **Order History** – View previous orders with details of each order.  
- **Pagination** – Navigate through product or order lists using a reusable pagination component.  

*Notes:*  
- Designed for **modularity** and **easy extension**.  
- Supports client-side filtering, search, and pagination.  
- Works seamlessly with the **React frontend** and **Node.js/Express backend** using JSON files as a simple database.  

