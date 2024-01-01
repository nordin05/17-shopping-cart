const Item = (props) => {
    let { product, Cart} = props;

    const handleClick = (e) => {
        const el = e.target;

        if (el.className == "btn btn-primary btn-sm"){ 
            el.className = "btn btn-success btn-sm";
            el.innerHTML = "Added to Cart";
            Cart.addItemToCart(product);
        }
        else {
            el.className = "btn btn-primary btn-sm";
            el.innerHTML = "Add to Cart";
            Cart.removeItemFromCart(product);
        }
    }

    if (Cart.itemsInCart.includes(product)) return <button className="btn btn-success btn-sm" onClick={handleClick}>Added to Cart</button>
        else return <button className="btn btn-primary btn-sm" onClick={handleClick}>Add to Cart</button>
    
  };
  
  export default Item;