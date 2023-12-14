import { useState } from "react";
import Navbar from "../../components/Navbar"
import Sortbar from "../../components/Sortbar/Sortbar"
import Categorybar from "../../components/Categorybar/Categorybar"
import Item from "../../components/Item/Item";
import "./ShopPage.css"

function ShopPage(props) {
    const {Products} = props;
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    return (
        <>
            {/* <Navbar/> */}
            <p>{sortBy}</p>
            <p>{category}</p>
            <div className="container-fluid bg-body-secondary">
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
                        {Products.map((product) => <Item product={product} key={product.id}/>)}
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default ShopPage