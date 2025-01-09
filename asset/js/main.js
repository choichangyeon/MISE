const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTJhZGMyOThkYzY4ZTUzNTZmZTIxOTFmYjBiNzExNyIsIm5iZiI6MTczNjMxNTk3Ny40MzI5OTk4LCJzdWIiOiI2NzdlMTQ0OWYyYzYyMTgwN2RiYjAyZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X50UgxFG-hBsW_81nxM4eW4LGKaeHWaAnJDjAeDfVHw";
const API_KEY = "c92adc298dc68e5356fe2191fb0b7117";
const API_URL = "https://api.themoviedb.org/3/movie";
const POSTER_URL = "https://image.tmdb.org/t/p/w200";

const $test = document.querySelector("#test");
const $movieGrid = document.querySelector("#movieGrid");



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

        let movieName = movie.title;
        let poster = POSTER_URL + movie.poster_path;
        let scoreAver = movie.vote_average;
        let releaseDate = movie.release_date;
        let overview = movie.overview;

        let html = `
            <div>
                <h1>${movieName}</h1>
                <div>
                    <img src="${poster}" alt="포스터 이미지가 존재하지 않습니다.">
                </div>
                <div id="bookmarkbtn">
                    <p>
                        ${overview}
                    </p>
                    ${releaseDate}
                    ${scoreAver}
                </div>
            </div>
        `;

        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        const childElement = tempElement.firstElementChild;

        // 변환한 DOM 요소를 $movieGrid에 추가
        if ($movieGrid) {
            $movieGrid.appendChild(childElement);
        } else {
            console.error('$movieGrid 요소를 찾을 수 없습니다.');
        }

    })
    console.log(movieList);
}


// getNowPlaying();
getPopular();