import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38676991-eca9780ceec23f3471420f73e";
const PARAMS = `key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`

export const getImages = (searchQuery, page) => {
    return axios.get(`${BASE_URL}?q=${searchQuery}&${PARAMS}&page=${page}`)
}