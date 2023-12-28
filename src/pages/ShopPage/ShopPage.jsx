import { useState } from "react";
import Navbar from "../../components/Navbar"
import Sortbar from "../../components/Sortbar/Sortbar"
import Categorybar from "../../components/Categorybar/Categorybar"
import Item from "../../components/Item/Item";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import "./ShopPage.css"

function ShopPage(props) {
    const {Products, Cart } = props;
    const [category, setCategory]       = useState("");
    const [sortBy, setSortBy]           = useState("");
    
    const filterProducts = () => {
        const filtered = filterCategory(Products);
        const sorted = sort(filtered)
        return sorted
    }
    
    const filterCategory = (array) => {
        if (category != "") return array.filter( product => product.category == category)
        else return array
    }

    const sort = (array) => {
        if (sortBy == "Title"){
            const arrayCopy = [...array];
            return arrayCopy.sort((a, b) => a.title.localeCompare(b.title)) 
        }
        else if (sortBy == "Price"){
            const arrayCopy = [...array];
            return arrayCopy.sort((a, b) => a.price - b.price)
        }
        else if (sortBy == "Rating"){
            const arrayCopy = [...array];
            return arrayCopy.sort((a, b) => b.rating.rate - a.rating.rate)
        }

        else return array
    }

    const addItemToCart = (newItem) => {
        Cart.setItemsInCart([...Cart.itemsInCart, newItem]);
    }

    const removeItemFromCart = (removeItem) => {
        const newArray = Cart.itemsInCart.filter((item) => item !== removeItem)
        Cart.setItemsInCart(newArray);
    }

    return (
        <>
            <Navbar Cart={Cart}/>
            <div className="container-fluid">
                {Cart.showCart? <ShoppingCart Cart={Cart}/>: null}
                <div className="row mt-3">
                    <div className="col-md-6 offset-sm-4 offset-md-3 offset-lg-2">
                        <Sortbar setSortBy={setSortBy}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-sm-4 col-md-3 col-lg-2">
                        <Categorybar setCategory={setCategory}/>
                    </div>
                    <div id="items-container" className="col-sm-8 col-md-9 col-lg-10 mt-3 mt-sm-0 p-2">
                        {filterProducts().map((product) => <Item product={product} Cart={Cart} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} key={product.id}/>)}
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default ShopPage