//기본 변수 선언
export const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTJhZGMyOThkYzY4ZTUzNTZmZTIxOTFmYjBiNzExNyIsIm5iZiI6MTczNjMxNTk3Ny40MzI5OTk4LCJzdWIiOiI2NzdlMTQ0OWYyYzYyMTgwN2RiYjAyZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X50UgxFG-hBsW_81nxM4eW4LGKaeHWaAnJDjAeDfVHw";
export const API_KEY = "c92adc298dc68e5356fe2191fb0b7117";
export const API_URL = "https://api.themoviedb.org/3";
export const POSTER_URL = "https://image.tmdb.org/t/p/w200";
//각 태그 변수 선언
export const $search = document.querySelector(".search");
export const $movieFlex = document.querySelector("#movie-flex");
export const $moviename = document.querySelector("#moviename");
export const $movieimg = document.querySelector("#movieimg");
export const $overview = document.querySelector("#overview");
export const $etc = document.querySelector("#etc");
export const $modalback = document.querySelector("#modal-back");
export const $banner = document.querySelector("#banner");
export const $bookmark = document.querySelector("#bookmark");
export const $upcoming = document.querySelector('#upcoming');
export const $closeButton = document.querySelector("#close-modal");
export const $bookmarkbtn = document.querySelector("#bookmarkbtn");
export const $delbtn = document.querySelector("#delbtn");
export const $buttons = document.querySelector("#buttons");
//화면에 띄울 영화 리스트 배열
let movieList = [];
//영화 리스트 getter
export function getMovieList() {
    return movieList;
}
//영화 리스트 setter
export function setMovieList(newList) {
    movieList = newList; 
}