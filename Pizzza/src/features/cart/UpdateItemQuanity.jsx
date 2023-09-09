import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

function UpdateItemQuanity({pizzaId,currentQuantity}) {
    const dispatch=useDispatch()
  return (
    <div className='flex gap-2 md:gap-3 items-center'>
        <Button type='round' onClick={()=>{dispatch(decreaseItemQuantity(pizzaId))}}>-</Button>
        <span className='text-sm font-medium'>{currentQuantity}</span>
        <Button type='round'  onClick={()=>{dispatch(increaseItemQuantity(pizzaId))}}>+</Button>
    </div>
  )
}

export default UpdateItemQuanity