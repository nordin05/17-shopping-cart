import { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.css"

function ShoppingCart(props){
    const {Cart} = props;
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;

        for (let i = 0; i < Cart.itemsInCart.length; i++){
            const item = Cart.itemsInCart[i]
            if (!item.quantity) item.quantity = 1;
            total += (item.quantity * item.price)
        }
        setTotalPrice(total);
    }, [Cart]);
    
    const CartItem = (props) => {
        const {item, i, totalPrice, setTotalPrice} = props;
        
        function isDisabled(){
            if (item.quantity == 0) return true
            return false;
        }

        const add = () => {
            item.quantity += 1;
            setTotalPrice(totalPrice + item.price);
        }

        const sub = () => {
            item.quantity -= 1;
            setTotalPrice(totalPrice - item.price);
        }

        return (
            <div>
                <div className={styles.imgContainer}>
                    {/* <img src={item.image}/> */}
                </div>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.quantity}> x {item.quantity}</p>
                <button className={styles.subBtn} onClick={sub} disabled={isDisabled()}>–</button>
                <button className={styles.addBtn} onClick={add}>+</button>
                <p className={styles.price}>€ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
        )
    }

    return (
        <div className={styles.cartContainer}>
            <h3>Shopping Cart</h3>
            {Cart.itemsInCart.map((item, index) => <CartItem item={item} i={index} totalPrice={totalPrice} setTotalPrice={setTotalPrice} key={item.id}/>)}
            <h4>Total <span>€ {totalPrice.toFixed(2)}</span></h4>
        </div>
    );
};
  
export default ShoppingCart;