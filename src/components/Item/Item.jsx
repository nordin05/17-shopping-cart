import { useNavigate } from "react-router-dom";
import AddToCart from "../AddToCart";
import styles from "./Item.module.css"

const Item = (props) => {
    let { product, Cart} = props;
    const navigate = useNavigate();

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
    
    return (
        <div className={styles.Item}>
            <div className={styles.imgContainer} onClick={() => navigate(`/shop/${product.id}`)}>
                 <img src={product.image} />
            </div>
            <div className={styles.body}>
                <h5 className={styles.title} >{trimTitle(product.title)}</h5>
                <p  className={styles.price} >€ {product.price}</p>
                <p  className={styles.rating}>{product.rating.rate}/5</p>
                <AddToCart product={product} Cart={Cart}/>
            </div>
        </div>
    );
  };
  
  export default Item;