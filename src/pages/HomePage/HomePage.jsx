import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"
import Spinner from "../../components/Spinner";
import styles from "./HomePage.module.css"

function HomePage(props) {
  const navigate = useNavigate();
  const {Products, Cart } = props;

  const goToShop = () => {
    navigate("/shop");
  }


  function ProductLinks(){
    if (Products[0]) return (
      Products.slice(1, 4).map((product) => (
        <div className={"mt-3 " + styles.productLink} key={product.id}>
          <img src={product.image}/>
          <h4 className="text-secondary">{product.title}</h4>
        </div>
      ))
    )

    else return (
      [0,1,2].map((product) => (
        <div className={"mt-3 pt-5 " + styles.productLink} key={product}>
          <Spinner/>
        </div>
      ))
    )
  }

  console.log(Products);
  return (
    <>
      <Navbar itemsInCart={Cart.itemsInCart}/>
      <div className={"container-fluid " + styles.pageContainer}>
        <div className={"row " + styles.mainSection}>
          <div className={"p-3 " + styles.content}>
            <h2 className="text-primary">Webshop</h2>
            <p className="text-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto nisi reprehenderit cupiditate accusamus aut id?</p>
            <button className="btn btn-outline-primary" onClick={goToShop}>Shop now</button>
          </div>
          <div className={styles.imgContainer}>
            {Products[0]? <img src={Products[0].image}/>: null}
          </div>
        </div>
        <div className={"row pb-3 bg-body-secondary " + styles.links}>
          <ProductLinks/>
        </div>
      </div>
    </>
  )
}

export default HomePage