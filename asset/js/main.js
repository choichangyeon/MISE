const $movieFlex = document.querySelector("#movie-flex");

function getNowPlaying() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    };

    fetch(`${API_URL}/now_playing?language=ko&page=1&region=KR`, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
}

async function getPopular() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    };

    let res;

    try {
        res = await fetch(`${API_URL}/popular?language=ko&page=1`, options);
        res = await res.json();
    }
    catch (err) {
        console.error(err);
    }

    let movieList = res['results'];
    movieList.forEach(movie => {

        childElement = movieCard(movie);

        if ($movieFlex) {
            $movieFlex.appendChild(childElement);

        } else {
            console.error('html 문서오류');
        }

    });



    console.log(movieList);
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


// getNowPlaying();
getPopular();