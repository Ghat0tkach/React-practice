import React, { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Pas", quantity: 12, packed: true }
];

 export default function App(){
  return <div className="App">
    <Logo/>
    <Form/>
    <PackingList/>
    <Stats/>
 </div>
}

function Logo(){
  return (
    <h1>Travelist🧳⛱️</h1>
  ); 
}

function Form(){
  const [desc,setdesc]=useState("");
  const [quantity,setQuantity]=useState(1);


  function handleSubmit(event){
    event.preventDefault();
    
    if(!desc)return;
    const newItem={desc,quantity,packed:false,id:Date.now()};

    setdesc("");
    setQuantity(1);
  }

  return ( 
  <form className="add-form" onSubmit={handleSubmit} >
    <h3>What you need for your trip 🤔</h3>
    <select value={quantity}
    onChange={(e)=>setQuantity(Number(e.target.value))}>
      {Array.from({length:20},(_,i)=> i+1).map
      ((num)=>(
          <option value={num} key={num}>
            {num}
          </option>
        ))}
    </select>
    <input type="text" placeholder="Item Name" value={desc} onChange={(e)=>{
      setdesc(e.target.value);
    }}/>
    <button>Add Item</button>
  </form>
  );

}

function PackingList(){
  return (
    <ul className="list">
      {initialItems.map((item)=>(
    <Item item={item} key={item.id}/>
    )) }
      </ul>
  );
}
function Item({item}){
  return (
    <li>
    
   
      <span style={item.packed?{textDecoration:'line-through'}:{

      }}>
        {item.quantity}{item.description}
      </span>
      <button className="remove">❌&times;</button>
    </li>
  );
} 

function Stats(){
  return(
    <footer className="stats">
      <em>💼You have X items in your list and you have already packed X (X%)</em>
    </footer>
  );
  }