const API_KEY = "76678c9e499d0ed2ceb96cc73aa91ac4";
const BASE_URL = "https://api.themoviedb.org/3"

// async means that the fct is asynchronous => it will take a second before we get the result 
export const getPopularMovies = async () =>{
    // fetch is a function you can use to send a network request
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    );
    const data = await response.json();
    return data.results;
}