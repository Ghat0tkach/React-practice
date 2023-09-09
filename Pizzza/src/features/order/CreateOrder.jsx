import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status:addressStatus,
    position,
    address,
    errorAddress:errorAddress
  }=useSelector((state)=> state.user);
  const isLoadingAddress= addressStatus==='loading';
  const navigation=useNavigation()
  const isSubmitting=navigation.state==='submitting';

  const formErrors=useActionData();
  const dispatch=useDispatch();
  
  const cart = useSelector(getCart);
  const totalCartPrice=useSelector(getTotalPrice);
  const priorityPrice=withPriority? totalCartPrice * 0.2 : 0;
  const totalPrice=totalCartPrice+priorityPrice;

  if(!cart.length) return <EmptyCart/>
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center  ">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer"
          defaultValue={username}
           required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center"  >
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="bg-red-100 p-2 rounded-md mt-2 text-xs text-red-700">{formErrors.phone}</p>}
          </div>
         
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text " name="address" required 
               className="input w-full"
               disabled={isLoadingAddress}
               defaultValue={address}
            />
          </div>
          {addressStatus==='error' && <p className="bg-red-100 p-2 rounded-md mt-2 text-xs text-red-700">{errorAddress} error</p>}
         {!position.latitude && !position.longitude &&
          <span className="absolute right-[3px] z-50  md:right-[5px] ">
        <Button 
        disabled={isLoadingAddress}
        type="small" onClick={(e)=>{
          e.preventDefault();
          dispatch(fetchAddress())}}>
        Get Address
      </Button>
        </span>}
        </div>
      
       
        <div className="mb-5 flex gap-2 sm:flex-row sm:items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
        <input type="hidden" name='cart' value={JSON.stringify(cart)}/>
        <input type="hidden" name='position' value={
          position.longitude && position.latitude?
          `${position.latitude}.${position.longitude}`: ''}/>
         <Button disabled={isSubmitting || isLoadingAddress}   type="primary">
     {isSubmitting? 'Placing order...' :`Order Now for ${formatCurrency(totalPrice)}`}

         </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({request}){
  const formData=await request.formData()
  const data=Object.fromEntries(formData)
  console.log(data);
  const order={
    ...data,
    cart:JSON.parse(data.cart),
    priority:data.priority==="true"
  };




  const errors ={}
  if(!isValidPhone(order.phone)) errors.phone="Please give us your correct phone number"
  if(Object.keys(errors).length>0) return  errors;
 
   
  const newOrder=await  createOrder(order);
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
