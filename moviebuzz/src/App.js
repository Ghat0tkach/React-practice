import { useEffect,useState } from "react";
import StarRating from "./StarRating";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY="3b81e9e2";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setLoading]=useState(false);
  const [error,setError]=useState("");
  const [selectedID , setSelectedID]=useState(null);
  
  
  function handleSelectMovie(id){
    setSelectedID(selectedID=>id===selectedID?null :id );
  }
  function onCloseMovie(id){
    setSelectedID(null);
  }
  function handleAddWatch(movie){
    if (!watched.some((m) => m.imdbID === movie.imdbID)) {
      setWatched((watched) => [...watched, movie]);
    }
  }
  function handleDeleteWatch(id){
    setWatched((watched)=>watched.filter((movie)=>movie.imdbID!==id));
  }
  
  useEffect(function(){
    async function fetchmovies(){
  try{
    setLoading(true);
    setError("");
    const res=await fetch(`
    https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
    )

  if(!res.ok) throw new Error("something went wrong , check your internet connection");

    const data=await res.json();
    if(data.Response === "False") throw new Error ("Movie not found");
    setMovies(data.Search);
    
  }
  catch(err){
    
      setError(err.message);
    }
  finally{
    setLoading(false);
  }  
  }
  if(query.length<3){
    setMovies([]);
    setError("");
    return; 
  }
  fetchmovies();
  },
  [query]

);



  return (
    <>
     
     <Navbar>
        <Logo/>
        <Search query={query} setQuery={setQuery}/>
        <Numresults movies={movies}/>
     </Navbar>
     <Main>
       <Box>
         {isLoading && <Loader/>}
         {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>  }
         {error && <ErrorMessage message={error}/>}
       </Box>
      
       <Box>
        { 
         selectedID ? <SelectedMovie selectedID={selectedID} onCloseMovie={onCloseMovie} handleAddWatch={handleAddWatch} watched={watched} />:
        <>
        <WatchedSummary watched={watched}/>
        <WatchedMoviesList watched={watched} handleDeleteWatch={handleDeleteWatch}/>
        </>
}
       </Box>
     </Main>
    </>
  );
}
function Loader(){
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({message}){
  return <p className="error">
    <span>⛔</span>{message}
  </p>
}

function Navbar({children}){
 
  return(
   
    <nav className="nav-bar">
    {children}
  </nav>
  );
}
function Logo(){
 return(
  <div className="logo">
  <span role="img">🎬</span>
  <h1>MovieBuzz</h1>
</div>
 );
}
function Search({query,setQuery}){
 
  return(
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Numresults({movies}){
  if (!movies) {
    // Handle the case when movies is undefined
    return null; // Or return a loading indicator or placeholder text
  }
  return(
    <p className="num-results">
    Found <strong>{movies.length}</strong> results
  </p>
  );
}
function Main({children}){
 return(
    <main className="main">
     {children}
  </main>
  );
 
}

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);

  return(
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        children
      )}
    </div>
  );
  
}
// function WatchedBox({children}){

  
//   const [isOpen2, setIsOpen2] = useState(true);
  

//     return(
//       <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         children
         
//       )}
//     </div>
//     );
// }
function MovieList({movies,onSelectMovie}){
 
  return(
    <ul className="list list-movies">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
    ))}
  </ul>
  );
}
function Movie({movie,onSelectMovie}){
  return(
    <li onClick={()=>onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>📆</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
  );
}


  

function SelectedMovie({selectedID,onCloseMovie,handleAddWatch,watched}){
  const[movie,setMovie]=useState({});
  const[isLoading, setLoading]=useState(false);
  const [userRating,setUserRating]=useState(0)

  const isWatched=watched.map((movie)=>movie.imdbID).includes(selectedID);
  const watchedUserRating=watched.find(movie=>movie.imdbID===selectedID)?.userRating;
  const {Title:title,
    Poster:poster, 
    Runtime:runtime,
    imdbRating,
    Plot:plot,
    Released:released,
    Actors:actors,
    Director:director,
    Genre:genre}=movie;
    function handleAdd(){
      const newWatchedMovie={
        imdbID:selectedID,
        title,
        poster,
        imdbRating:Number(imdbRating),
        runtime: Number(runtime.split(" ").at(0)),
        userRating
        
      }
      handleAddWatch(newWatchedMovie);
      onCloseMovie();
    }
    useEffect(function(){
    async function fetchmovies(){
      setLoading(true);
     const res=await fetch(
    `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
    );
    const data=await res.json();
   
    setMovie (data);
    setLoading(false)
  }
  fetchmovies();
},[selectedID]);


useEffect(function(){
      if(!title) return;
      document.title=`Movie | ${title}`;

      return function(){
        document.title="MovieBuzz";
      }
},[title])
  return (
  <div className="details">
    {isLoading? <Loader/>:
    <>
    <header>
    <button className="btn-back" onClick={onCloseMovie}>
    &larr;
      </button> 
    <img src={poster} alt={`Poster of ${movie} movie`} />
     <div className="details-overview">
      <h2>{title}</h2>
      <p>{released} &bull; {runtime} </p>
      <p>{genre}</p>
      <p><span>🌟</span>
      {imdbRating} IMDb rating</p>

     </div>

    </header>
   
    
    <section>
    <div className="rating">
    {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
    </div>
      <p><em>{plot}</em></p>
      <p>Starring {actors}</p>
      <p>directey by {director}</p>
    </section>
   </>
} 
  </div>
  
  );
}

function WatchedSummary({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return(
    <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>
  );
}
function WatchedMoviesList({watched,handleDeleteWatch}){
  return(
    <ul className="list">
    {watched.map((movie) => (
       <WatchedMovie movie={movie} key={movie.imdbID} handleDeleteWatch={handleDeleteWatch}/>
    ))}
  </ul>
  );
}
function WatchedMovie({movie,handleDeleteWatch}){
  return(
    <li >
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div className="watchedlist">
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className="btn-delete" onClick={()=>handleDeleteWatch(movie.imdbID)}>Delete</button>
    </div>
  </li>
  );
}
