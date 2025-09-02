import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProductList } from "./components/products/ProductList";
import { ProductDetail } from "./components/products/ProductDetail";
import { Layout } from "./components/layout/Layout";
import { Cart } from "./components/cart/Cart";
import { OrderHistory } from "./components/order/OrderHistory";
import { NotFound } from "./components/NotFound";
import { Checkout } from "./components/order/Checkout";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout />
      ),
      children: [
        { index: true, element: <ProductList /> },
        { path: "products", element: <ProductList /> },
        { path: "products/:id", element: <ProductDetail /> },
        { path: "products/category/:category", element: <ProductList /> },
        { path: "cart", element: <Cart /> },
        { path: "orders", element: <OrderHistory />},
        { path: "checkout", element: <Checkout />}
      ],
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return <>
    <RouterProvider router={router} />
  </>
  
}