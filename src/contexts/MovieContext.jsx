import { createContext, useState, useContext, useEffect } from "react";

// a context is like  box where you can store data and make availble in any place in your app
// instead of passing props down multiple levels ( prop drilling we can use context ) 
const MovieContext = createContext();

// useMovieContext lets us read the data  from the context => an easier shortcut 
// now any component just can do const {favorites, addToFavorites} = useMovieContext()
export const useMovieContext = () => useContext(MovieContext);

// MovieProvider is a special component that will wrap our app (or part of it)
// insite it we manage a state (favorites: array of movies) 
export const MovieProvider = ({children  }) => {
    const [favorites, setFavorites] = useState([])
    //the first use effect runs at first when the component loads : it loads our favorites frol localStorage
    // this makes favorites persists even after refreshing the page
    useEffect(() =>{
        

        // here we get at loading the favorites stored in the local storage of the browser 
        // (keeps the data even if refereshed evzn the browserclosed , romoves data only if we clear the cache)
        const storedFavs = localStorage.getItem("favorites")
        if(storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    // here we update the local storage of the new new value of our favorites , whenever we catch a changement in the favorites
    useEffect(() =>{
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])


    // functions for managing our favorites
    const addToFavorites = (movie) =>{
        setFavorites(prev => [...prev, movie])
    } 

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id != movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId )
    }

    // finally we want to create an object thaat contains every thing another component wants to use 
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}