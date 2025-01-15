const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTJhZGMyOThkYzY4ZTUzNTZmZTIxOTFmYjBiNzExNyIsIm5iZiI6MTczNjMxNTk3Ny40MzI5OTk4LCJzdWIiOiI2NzdlMTQ0OWYyYzYyMTgwN2RiYjAyZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X50UgxFG-hBsW_81nxM4eW4LGKaeHWaAnJDjAeDfVHw";
const API_KEY = "c92adc298dc68e5356fe2191fb0b7117";
const API_URL = "https://api.themoviedb.org/3";
const POSTER_URL = "https://image.tmdb.org/t/p/w200";

const $search = document.querySelector(".search");

const $movieFlex = document.querySelector("#movie-flex");
const $banner = document.querySelector("#banner");
const $bookmark = document.querySelector("#bookmark");
const $upcoming = document.querySelector('#upcoming');

let movieList = [];

function getBookmarkList() {
    let checkList = window.localStorage.getItem("movie");
    let bookmarkList = JSON.parse(checkList);

    return (bookmarkList) ? bookmarkList : [];
}

function appendFlex() {
    $movieFlex.innerHTML = "";
    movieList.forEach(movie => {

        let childElement = movieCard(movie);
        try {
            $movieFlex.appendChild(childElement);
        }
        catch (e) {
            console.error(`ERROR:${e}`);
        }

    });
}

function movieCard(movie) {
    let movieName = movie.title;
    let poster = POSTER_URL + movie.poster_path;
    let scoreAver = movie.vote_average;
    let id = movie.id;

    let html = `
        <div class='movie-card' id=${id}> 
            <img src="${poster}" alt="포스터 이미지가 존재하지 않습니다.">
            <h3>${movieName}</h3>
            ${scoreAver}
        </div>
    `;

    const childElement = makeDiv(html);

    childElement.addEventListener("click", function (e) {
        e.preventDefault();
        openMovieContent(movie);
    });

    return childElement;

}

function movieContent(movie) {
    let movieName = movie.title;
    let poster = POSTER_URL + movie.poster_path;
    let scoreAver = movie.vote_average;
    let releaseDate = movie.release_date;
    let overview = movie.overview;

    let html = `
        <dialog id="movie-modal">
            <h1>${movieName}</h1>
            <div>
                <img src="${poster}" alt="포스터 이미지가 존재하지 않습니다.">
            </div>
            <div>
                <p>
                    ${overview}
                </p>
                ${releaseDate}
                <br>
                ${scoreAver}
            </div>
            <button id="bookmarkbtn">북마크 저장</button>
            <button id="close-modal">닫기</button>
        </dialog>
    `;

    const childElement = makeDiv(html);

    document.body.appendChild(childElement);

    const $dialog = document.querySelector("#movie-modal");
    $dialog.showModal();

    const $closeButton = document.querySelector("#close-modal");
    $closeButton.addEventListener("click", () => {
        $dialog.close();
        $dialog.remove();
    });

    const $bookmarkbtn = document.querySelector("#bookmarkbtn");
    $bookmarkbtn.addEventListener("click", () => {
        let bookmarkList = getBookmarkList();
        if (bookmarkList) {
            if (!bookmarkList.some((Movie) => Movie.id === movie.id)) {
                bookmarkList.push(movie);
                alert("북마크 추가 완료!");
            }
            else {
                alert("이미 북마크에 포함되어있습니다!");
            }
        }
        else {
            bookmarkList.push(movie);
            alert("북마크 추가 완료!");
        }


        const movieList = JSON.stringify(bookmarkList);
        window.localStorage.setItem("movie", movieList);
    });
}

function openMovieContent(movie) {
    movieContent(movie);
}

function makeDiv(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const childElement = tempElement.firstElementChild;

    return childElement;
}