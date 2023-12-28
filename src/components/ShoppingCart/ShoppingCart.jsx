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

        const add = () => {
            item.quantity += 1;
            setTotalPrice(totalPrice + item.price);
        }

        const sub = () => {
            item.quantity -= 1;
            
            if (item.quantity == 0){
                const newArray = Cart.itemsInCart.filter((cartItem) => cartItem !== item);
                Cart.setItemsInCart(newArray);
            }
            else setTotalPrice(totalPrice - item.price);
        }

        return (
            <div className={styles.item}>
                <div className={styles.imgContainer}>
                    <img src={item.image}/>
                </div>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.quantity}> x {item.quantity}</p>
                <button className={styles.subBtn} onClick={sub}>–</button>
                <button className={styles.addBtn} onClick={add}>+</button>
                <p className={styles.price}>€ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
        )
    }

    return (
        <div className={styles.cartContainer}>
            <h3 className="text-center text-primary bg-primary bg-opacity-25 pt-3 pb-3 mb-4 border-bottom">Shopping Cart</h3>
            {Cart.itemsInCart.map((item, index) => <CartItem item={item} i={index} totalPrice={totalPrice} setTotalPrice={setTotalPrice} key={item.id}/>)}
            <h4 className="text-end pb-2 pe-4">Total <span className="">€ {totalPrice.toFixed(2)}</span></h4>
        </div>
    );
};
  
export default ShoppingCart;