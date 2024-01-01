import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import AddToCart from "../../components/AddToCart"
import styles from "./ItemPage.module.css";

function ItemPage(props) {
    const {id} = useParams();
    const {Products, Cart} = props;
    const [item, setItem] = useState(null);

    useEffect(() => {
      setItem(Products.find(item => item.id == id));
    }, [Products]);

    function renderPage(){
      if (item) return (
        <div className="container bg-white mt-4 rounded-2">
          <h4 className="py-3 px-3 text-primary border-bottom">{item.title}</h4>
          <div className="row p-3">
            <div className="col-12 col-md-7 col-lg-4">
              <img src={item.image} className="w-100"/>
            </div>
            <div className="col-12 col-md-5 col-lg-8 px-3">
              <p className={styles.price}>€ {item.price}</p>
              <AddToCart product={item} Cart={Cart}/>
              <p className="mt-3 pt-2 border-top">{item.description}</p>
            </div>
          </div>
        </div>
      )
      else return (
        <div className="container bg-white mt-4 rounded-2">
          <p className="m-3">Product not found.</p>
        </div>
      )
    }

    return (
      <>
        <Navbar Cart={Cart}/>
        <div className="container-fluid">
          {Cart.showCart? <ShoppingCart Cart={Cart}/>: null}
          {renderPage()}
        </div>
      </>
    )
}
  
export default ItemPage