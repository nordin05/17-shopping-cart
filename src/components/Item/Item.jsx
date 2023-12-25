import Spinner from "../Spinner";
import styles from "./Item.module.css"

const Item = (props) => {
    let { product, Cart, addItemToCart, removeItemFromCart } = props;

    const trimTitle = (str) => {
        const max = 5;
        const splitStr = str.split(" ");

        let newStr = "";

        for (let i = 0; i < max; i++) {
            if (splitStr[i]){
                newStr += " " + splitStr[i]
            }
        }
        return newStr;
    }

    const handleClick = (e) => {
        const el = e.target;

        if (el.className == "btn btn-primary btn-sm"){ 
            el.className = "btn btn-success btn-sm";
            el.innerHTML = "Added to Cart";
            addItemToCart(product);
        }
        else {
            el.className = "btn btn-primary btn-sm";
            el.innerHTML = "Add to Cart";
            removeItemFromCart(product);
        }
    }

    const ItemButton = () => {
        if (Cart.itemsInCart.includes(product)) return <button className="btn btn-success btn-sm" onClick={handleClick}>Added to Cart</button>
        else return <button className="btn btn-primary btn-sm" onClick={handleClick}>Add to Cart</button>
    }
    
    return (
        <div className={styles.Item}>
            <div className={styles.imgContainer}>
                 <img src={product.image} />
            </div>
            <div className={styles.body}>
                <h5 className={styles.title} >{trimTitle(product.title)}</h5>
                <p  className={styles.price} >€ {product.price}</p>
                <p  className={styles.rating}>{product.rating.rate}/5</p>
                <ItemButton/>
            </div>
        </div>
    );
  };
  
  export default Item;