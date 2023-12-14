import { useState } from "react";
import styles from "./Sortbar.module.css"

const Sortbar = (props) => {
    const {setSortBy} = props;
    const [activeElement, setActiveElement] = useState(null)

    const handeClick = (e) => {
        const el = e.target;

        if (activeElement && activeElement == el){ 
            activeElement.className = "list-group-item";
            setActiveElement(null);
            setSortBy("");
        }
        else if (activeElement && activeElement != el){ 
            activeElement.className = "list-group-item";
            el.className += " active";
            setActiveElement(el);
            setSortBy(el.innerHTML);
        }
        else {
            el.className += " active";
            setActiveElement(el);
            setSortBy(el.innerHTML);
        }
    }

    return (
        <div className={styles.Sorting}>
            <h5 className="me-2">Sort by:</h5>
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item" onClick={handeClick}>Title</li>
                <li className="list-group-item" onClick={handeClick}>Price</li>
                <li className="list-group-item" onClick={handeClick}>Rating</li>
            </ul>
        </div>
    );
  };
  
  export default Sortbar;