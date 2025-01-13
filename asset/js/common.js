const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTJhZGMyOThkYzY4ZTUzNTZmZTIxOTFmYjBiNzExNyIsIm5iZiI6MTczNjMxNTk3Ny40MzI5OTk4LCJzdWIiOiI2NzdlMTQ0OWYyYzYyMTgwN2RiYjAyZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X50UgxFG-hBsW_81nxM4eW4LGKaeHWaAnJDjAeDfVHw";
const API_KEY = "c92adc298dc68e5356fe2191fb0b7117";
const API_URL = "https://api.themoviedb.org/3";
const POSTER_URL = "https://image.tmdb.org/t/p/w200";

const $movieFlex = document.querySelector("#movie-flex");

function appendFlex(movieList) {
    movieList.forEach(movie => {

        let childElement = movieCard(movie);
        console.log(childElement);
        console.log($movieFlex);
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

    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const childElement = tempElement.firstElementChild;

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
            <div id="bookmarkbtn">
                <p>
                    ${overview}
                </p>
                ${releaseDate}
                <br>
                ${scoreAver}
            </div>
            <button id="close-modal">닫기</button>
        </dialog>
    `;

    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const modalElement = tempElement.firstElementChild;

    document.body.appendChild(modalElement);

    const dialog = document.querySelector("#movie-modal");
    dialog.showModal();

    const closeButton = document.querySelector("#close-modal");
    closeButton.addEventListener("click", () => {
        dialog.close();
        dialog.remove();
    });
}

function openMovieContent(movie) {
    movieContent(movie);
}