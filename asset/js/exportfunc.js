import {
    POSTER_URL, $movieFlex, getMovieList,
    $moviename, $movieimg, $overview, $etc, $modalback,
    $delbtn, $closeButton, $bookmarkbtn, $buttons
} from "./env.js";
//북마크 리스트 가져오기 함수
export function getBookmarkList() {
    let checkList = window.localStorage.getItem("movie");
    let bookmarkList = JSON.parse(checkList);

    return (bookmarkList) ? bookmarkList : [];
}
//main 영역에 띄우는 함수
export function appendMain() {
    $movieFlex.innerHTML = "";
    let movieList = getMovieList();
    if (movieList.length === 0) {
        $movieFlex.innerText = "해당 결과가 없습니다."
    }
    else {
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

}
//모달 정보 전달 함수
export function showmodal(movieid) {
    let movieList = getMovieList();
    let modalcontent = movieList.find(movie => movie.id == movieid);

    let movieName = modalcontent.title;
    let poster = POSTER_URL + modalcontent.poster_path;
    let scoreAver = modalcontent.vote_average;
    let releaseDate = modalcontent.release_date;
    let overview = modalcontent.overview;


    $moviename.innerHTML = movieName;
    $movieimg.innerHTML = `<img src="${poster}" alt="포스터 이미지가 존재하지 않습니다."></img>`;
    $overview.innerHTML = formatTextByPeriod(overview);
    $etc.innerHTML = `개봉일 ${releaseDate} <br> ⭐️ ${scoreAver}`;
    $buttons.setAttribute("movieid", modalcontent.id);

    $modalback.style.display = "block";
}
//모달창 닫기 코드
$closeButton.addEventListener("click", () => {
    $modalback.style.display = "none";
});
//북마크 저장 코드
$bookmarkbtn.addEventListener("click", (e) => {
    var temp = e.target.parentElement;
    const movieId = temp.getAttribute("movieid");
    let bookmarkList = getBookmarkList();
    let movies = getMovieList();

    if (bookmarkList) {
        if (!bookmarkList.some((_movie) => _movie.id == movieId)) {
            bookmarkList.push(movies.find((_movie) => _movie.id == movieId));
            alert("북마크 추가 완료!");
        }
        else {
            alert("이미 북마크에 포함되어있습니다!");
        }
    }
    else {
        bookmarkList.push(movies.find((_movie) => _movie.id == movieId));
        alert("북마크 추가 완료!");
    }
    const movieList = JSON.stringify(bookmarkList);
    window.localStorage.setItem("movie", movieList);
});
//북마크 삭제 코드
$delbtn.addEventListener("click", (e) => {
    var temp = e.target.parentElement;
    const movieId = temp.getAttribute("movieid");
    let bookmarkList = getBookmarkList();

    if (bookmarkList) {
        if (bookmarkList.some((_movie) => _movie.id == movieId)) {
            bookmarkList = bookmarkList.filter((_movie) => _movie.id != movieId);
            const movieList = JSON.stringify(bookmarkList);
            window.localStorage.setItem("movie", movieList);
            alert("북마크 삭제 완료!");
        }
        else {
            alert("북마크에 해당 영화가 없습니다!")
        }
    }
    else {
        alert("북마크에 해당 영화가 없습니다!")
    }
});
//영화 카드 함수
function movieCard(movie) {
    let movieName = movie.title;
    let poster = POSTER_URL + movie.poster_path;
    let scoreAver = movie.vote_average;
    let id = movie.id;

    let html = `
        <div class='movie-card' id=${id}> 
            <img src="${poster}" alt="포스터 이미지가 존재하지 않습니다.">
            <h3>${movieName}</h3>
            ⭐️ ${scoreAver}
        </div>
    `;
    const childElement = makeDiv(html);

    return childElement;
}
//html 코드 -> DOM 객체 함수
function makeDiv(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const childElement = tempElement.firstElementChild;

    return childElement;
}
//줄바꿈 함수
function formatTextByPeriod(text) {
    if (!text) return "";

    const regex = /(?<!\([^)]*)[.!?](?=\s|$)/g;
    const sentences = text.split(regex);

    return sentences
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .join(".<br>");
}