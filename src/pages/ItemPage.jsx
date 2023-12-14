import { useParams } from "react-router-dom"

function ItemPage() {
    const {id} = useParams();

    return (
      <div>item {id} page</div>
    )
  }
  
  export default ItemPage