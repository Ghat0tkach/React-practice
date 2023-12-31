import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
function CartOverview() {
  const totalCartQuantity=useSelector(getTotalCartQuantity)
  const totalCartPrice=useSelector(getTotalPrice)

  if(!totalCartQuantity) return null;
  return (
    <div className=" flex items-center justify-between bg-stone-800 text-stone-100 uppercase md:text-base px-4 py-4 sm:px-6" >
      <p className="text-stone-300 font-semibold space-x-4">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to ='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
