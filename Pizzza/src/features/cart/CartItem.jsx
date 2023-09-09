import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuanity from "./UpdateItemQuanity";
import { getCurrentQuantitybyId } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
 const currentQuantity=useSelector(getCurrentQuantitybyId(pizzaId));
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
       <UpdateItemQuanity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
       <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
