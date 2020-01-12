import axios from "axios";
const apikey = "8cc341a0";

export default {
    searchMovies: axios.create({
        baseURL: `http://www.omdbapi.com/?apikey=${apikey}&s=`
    })
}