import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY = "38676991-eca9780ceec23f3471420f73e";
const PARAMS = `key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`

export const fetchImages = async (searchQuery, page) => {
    const response = await axios.get(`?q=${searchQuery}&${PARAMS}&page=${page}`);
    return response.data;
}