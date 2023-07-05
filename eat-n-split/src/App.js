import { useState } from 'react';
import './index.css';

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App(){
  const [showAddFriend,setShowFriend]=useState(false);
  const [friends,setFriends]=useState(initialFriends);
  const [selectedFriend,setSelectedFriend]=useState(false);
  



  function handleShowFunction(){
    setShowFriend((show)=>!show);
  }
  function handleAddFriend(friend){
     setFriends(friends => [...friends,friend]);
     setShowFriend(false);
  }

  function handleSelection(friend){
    setSelectedFriend((cur)=>
    cur?.id === friend.id? null: friend
    );
  }
  function handleSplitBill(value){
       setFriends((friends)=>friends.map(
        (friend)=>friend.id===selectedFriend.id?
           {...friend,balance:friend.balance +value}
       : friend
           )
       );
  }
      
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onSelection={handleSelection}/>
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}
       
        <Button onClick={handleShowFunction}>
          {showAddFriend? "Close": "Add Friend"}
          </Button>
        
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}
      onSplitbill={handleSplitBill}
      />}
    </div>
  );
}
function FriendList({friends,onSelection}){


  return (<ul>
    {friends.map((friend)=>(
    <Friend friend={friend} key={friend.id}
    onSelection={onSelection}/>
    ))}
  </ul>
  );
}
function Friend({friend , onSelection,selectedFriend}){
  const isSelected=(selectedFriend?.id===friend.id)
  console.log(isSelected);
  return(
     <li className={isSelected?"selected":""}>
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>
    {friend.balance < 0 &&
    (
      <p className='red'>
        You owe {friend.name} {Math.abs(friend.balance)} Rs
      </p>
    )}
     {friend.balance > 0 &&
    (
      <p className='green'>
        {friend.name} owes you {Math.abs(friend.balance)} Rs
      </p>
    )} 
    {friend.balance === 0 &&
      (
        <p>
          You and {friend.name} are even
        </p>
      )}
     
      <Button onClick={()=>
      onSelection(friend)}>
        {isSelected? "Close":"Select"}
       
      </Button>

      
    </li>
     
  );
}

function Button({children,onClick}){
       return <button className='button' onClick={onClick}>{children}</button>
}
function FormAddFriend({onAddFriend}){
  const [name,setName]=useState("");
  const [image,setImg]=useState("");

  function handleSubmit(e){
    e.preventDefault();
    if(!name || !image) return;
    const id=crypto.randomUUID();
    const newFriend={
      name,
      image,
      balance:0,
      id,
    };
    
    onAddFriend(newFriend);
    setName("");
    setImg("");
    
  }

  return(
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>🐥Friend Name</label>
      <input type='text' value={name} onChange={
        (e)=>setName(e.target.value)
      }/>

      <label>🖼️ Image URL</label>
      <input type='text' value={image} 
      onChange={
        (e)=>setImg(e.target.value)
      }/>
      
      <Button>{"Add"}</Button>

    </form>
  );
}


function FormSplitBill({selectedFriend, onSplitbill}){
  const [bill,setBill]=useState("");
  const [paidbyUser,setPaidUser]=useState("");
  const paidbyfriend=bill?bill-paidbyUser:"";
  const [whoIsPaying, setWhoIsPaying]=useState("user");
  function handleSubmit(e){
    e.preventDefault();
    if(!bill || !paidbyUser) return ;
    onSplitbill(whoIsPaying==='user'?paidbyfriend:
    -paidbyUser);
  }

  return (
    <form className='form-split-bill ' onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💵 Bill Value</label>
      <input type="text"
       value={bill}
        onChange={(e)=>setBill(Number(e.target.value))}
      ></input>

      <label>😇 Your expense</label>
      <input type="text"
       value={paidbyUser}
       onChange={(e)=>setPaidUser(Number(e.target.value)
        >bill?paidbyUser:Number(e.target.value))}
       ></input>

      <label>💵 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidbyfriend}></input>

    <label>😁 Who is paying the bill?</label>
    <select value={whoIsPaying}
    onChange={(e)=>{setWhoIsPaying(e.target.value)}}>
      <option value="user">You</option>
      <option value="Friend">{selectedFriend.name}</option>

    </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
