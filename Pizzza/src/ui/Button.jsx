import { Link } from "react-router-dom"

export default function Button({children,disabled,to,type,onClick}){
    const className="bg-yellow-400 uppercase font-semibold text-stone-800 py-3 px-4 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors ease-out focus:ring-yellow-300 focus:ring focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4";
    const base= 
    "bg-yellow-400 text-sm uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors ease-out focus:ring-yellow-300 foucs:ring focus:ring-offset-2 disabled:cursor-not-allowed "
    const styles={
      
        primary: base + 'px-4 py-3 md:px-6 md:py-4',
        small: base +'px-4 py-2 md:px-5 md:py-2.5 text-xs',
        round: base +'px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
        secondary:" text-sm inline-block border-2 border-stone-300 uppercase font-semibold text-stone-800  tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors ease-out focus:ring-stone-300 focus:ring focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5 transition-colors-300"
    };


    if(to) 
    return <Link  to={to} className={styles[type]}>{children}</Link>
    if(onClick)
    return(
        <button onClick={onClick} disabled={disabled}
         className={styles[type]}
        >
        {children}
        </button>
    )
   return (
    <button disabled={disabled}
     
     className={styles[type]}
     >
        {children}
     </button>
   )

   
}