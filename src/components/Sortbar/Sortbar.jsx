import { useState } from "react";
import styles from "./Sortbar.module.css"

const Sortbar = () => {
    const [activeElement, setActiveElement] = useState(null)

    const handeClick = (e) => {
        const el = e.target;

        if (activeElement && activeElement == el){ 
            activeElement.className = "list-group-item";
            setActiveElement(null);
        }
        else if (activeElement && activeElement != el){ 
            activeElement.className = "list-group-item";
            el.className += " active";
            setActiveElement(el);
        }
        else {
            el.className += " active";
            setActiveElement(el);
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