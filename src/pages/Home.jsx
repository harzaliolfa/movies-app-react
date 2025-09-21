import MovieCard from "../Components/MovieCard";
import { useEffect, useState } from "react";
import "../css/Home.css"
import { getPopularMovies, searchMovies } from "../services/api";
import { MovieProvider } from "../contexts/movieContext";

function Home(){

    const [searchQuery, setSearchQuery] = useState("")
    const [movies , setMovies] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect (() => {
        // implementation of the function 
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            }
            catch(error){
                console.log(error)
                setError("Failed to load movies...")
            }
            finally{
                setLoading(false)
            }
        }
        // call of the function
        loadPopularMovies()
    },[])

    const handleSearch = async (event) => {
        // to prevent default behaviour of refreshing the page each time we press the button
        event.preventDefault();
        if(!searchQuery.trim()) return;
        if(loading) return;
        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            console.log(error);
            setError("Failed to search movies...");
        }finally{
            setLoading(false);
        }
        setSearchQuery("");
    };
    
    return(
        <div className="home">
                <form  onSubmit={handleSearch} action="" className="search-form">
                    <input type="text" 
                    name="" id="" 
                    placeholder="Search for movie..." 
                    className="movie-input"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
                {error && <div className="error-message" >{error}</div>}
                {
                    loading ? (<div className="loading">Loading... </div>) : 
                        <div className="movies-grid">
                        {movies.map(movie =>
                        // another simple way of search 
                            // movie.title.toLowerCase().startsWith(searchQuery) &&
                            <MovieCard movie={movie} key={movie.id}/>
                        )}
                        </div>
                }
        </div>
    )
}
export default Home;