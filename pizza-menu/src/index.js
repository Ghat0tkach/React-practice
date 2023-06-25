import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
  ];

   function App(){
    return (
        <div className='container'>
        <Header/>
        <Menu/>
        <Footer/> 
    </div>
    );
}
function Header(){
    return (
    <header className='header'>
        <h1>Has'ta-Pizza</h1>
    </header>
    );
}
function Menu(){
    const pizzas=pizzaData;
    const numPizzas=pizzas.length;
    return(
        <main className="menu">
        <h2>Menu</h2>
        
        {numPizzas>0 ? (
         
         <>
            <p>
            Authentic Italian pizza made with love and passion.All pizzas are 11 inches and are made with fresh ingredients.
           </p>
            <ul className='pizzas'>
                {pizzas.map((pizza)=>(
                   <Pizza pizzaObj={pizza} key={pizza.name} />
        ))}
            
            </ul>
            </>
        ):<p>Sorry we are closed , will open soon</p>}

        {/* <Pizza name='Pizza Spinaci'
        ingredients='Tomato, mozarella, spinach, and ricotta cheese'
        photoName='pizzas/spinaci.jpg'
        price={12}
        />
        <Pizza name='Pizza Funghi'
        ingredients='Tomato, mozarella, mushrooms, and onion'
        photoName='pizzas/funghi.jpg'
        price= {15}
        /> */}
        </main>
    );
}
        
function Footer(){
    const hour=new Date().getHours();
    const openHour=10;
    const closeHour=23;
   const isOpen=hour>=openHour && hour<=closeHour;

    return (
    <footer className="footer">
        {isOpen ? (
        <div className="order"><p>We Are Open untill {closeHour}</p>
        <button className='btn'>order</button>
    </div>):
    <p>Sorry we are closed , will open at {openHour}:00</p>
    }
    </footer>
   );
 }
  function Pizza({pizzaObj}){
  

    return(
        
        <div className={`pizza ${pizzaObj.soldOut? "sold-out":" "}`}>
         <img src={pizzaObj.photoName} alt={pizzaObj.name}/>'   
         <h3>{pizzaObj.name}</h3>
         <p>{pizzaObj.ingredients}</p>
         <span>{pizzaObj.soldOut? 'Sold out': pizzaObj.price * 3}</span>
        </div>
       
    );
 }
//React v18
 const root= ReactDOM.createRoot(document.getElementById('root'));
 root.render(
 <React.StrictMode>
    <App/>
 </React.StrictMode>
 );

 