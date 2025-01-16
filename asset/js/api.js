import { API_URL, ACCESS_TOKEN, setMovieList} from "./env.js";
import { appendMain } from "./exportfunc.js";
//인기있는 영화 GET
export async function getPopular() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    };

    let res;

    try {
        res = await fetch(`${API_URL}/movie/popular?language=ko&page=1`, options);
        res = await res.json();
    }
    catch (err) {
        console.error(err);
    }
    setMovieList(res['results']);

    appendMain();
}
//검색한 내용의 영화 GET
export async function searchMoive(word) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    };

    let res;

    try {
        res = await fetch(`${API_URL}/search/movie?query=${word}&language=ko&page=1`, options);
        res = await res.json();
    }
    catch (err) {
        console.error(err);
    }
    setMovieList(res['results']);
    appendMain();

}
//곧 개봉할 영화 GET
export async function getUpcoming() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    };

    let res;
    try {
        res = await fetch(`${API_URL}/movie/upcoming?language=ko&page=1&region=kr`, options);
        res = await res.json();
    }
    catch (err) {
        console.error(err);
    }

    setMovieList(res['results']);
    appendMain();

}