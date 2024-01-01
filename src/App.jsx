import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from "react"
import HomePage from './pages/HomePage/HomePage'
import ShopPage from './pages/ShopPage/ShopPage'
import ItemPage from './pages/ItemPage/ItemPage'
import ErrorPage from './pages/ErrorPage'
import "./index.css"

function App() {
  const [Products, setProducts]     = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const Cart = {itemsInCart, setItemsInCart, showCart, setShowCart, addItemToCart, removeItemFromCart};

  function addItemToCart(newItem){
    Cart.setItemsInCart([...Cart.itemsInCart, newItem]);
  }

  function removeItemFromCart(removeItem){
    const newArray = Cart.itemsInCart.filter((item) => item !== removeItem)
    Cart.setItemsInCart(newArray);
  }

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
        element: <ItemPage Products={Products} Cart={Cart}/>,
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