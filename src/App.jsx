import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from "react"
import HomePage from './pages/HomePage/HomePage'
import ShopPage from './pages/ShopPage/ShopPage'
import ItemPage from './pages/ItemPage'
import ErrorPage from './pages/ErrorPage'
import "./index.css"

function App() {
  const [Products, setProducts]     = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const Cart = {itemsInCart, setItemsInCart}

  const router = createBrowserRouter([
      {
        path: "/",
        element: <HomePage Products={Products} Cart={Cart}/>,
        errorElement: <ErrorPage />,
      },
      {
        path: "shop",
        element: <ShopPage Products={Products} Cart={Cart}/>,
      },
      {
        path: "shop/:id",
        element: <ItemPage/>,
      }
  ]);

  useEffect(() => {
      const getProducts = async () => {
        try {
              const res  = await fetch('https://fakestoreapi.com/products');
              const json = await res.json();
              
              setProducts(json);
        } catch(error) {
            console.log("Error fetching products");
        }
      }
      
      getProducts();
    }, [])

  return (
      <RouterProvider router={router} />
  )
}
  
export default App