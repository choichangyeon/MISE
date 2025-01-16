import { POSTER_URL, $movieFlex, getMovieList } from "./env.js";
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
//main 영역에 띄우는 영화 카드 함수
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
    //모달창 열기 이벤트
    childElement.addEventListener("click", function (e) {
        e.preventDefault();
        movieContent(movie);
    });

    return childElement;
}
//모달창 함수
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
            <button id="delbtn">북마크 삭제</button>
            <button id="close-modal">닫기</button>
        </dialog>
    `;

    const childElement = makeDiv(html);
    document.body.appendChild(childElement);
    //모달창 보여주기 코드
    const $dialog = document.querySelector("#movie-modal");
    $dialog.showModal();
    //모달창 닫기 코드
    const $closeButton = document.querySelector("#close-modal");
    $closeButton.addEventListener("click", () => {
        $dialog.close();
        $dialog.remove();
    });
    //북마크
    const $bookmarkbtn = document.querySelector("#bookmarkbtn");
    const $delbtn = document.querySelector("#delbtn");
    //북마크 저장 코드
    $bookmarkbtn.addEventListener("click", () => {
        let bookmarkList = getBookmarkList();
        if (bookmarkList) {
            if (!bookmarkList.some((_movie) => _movie.id === movie.id)) {
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
    //북마크 삭제 코드
    $delbtn.addEventListener("click", () => {
        let bookmarkList = getBookmarkList();
        if (bookmarkList) {
            if (bookmarkList.some((_movie) => _movie.id === movie.id)) {
                bookmarkList = bookmarkList.filter((_movie) => _movie.id !== movie.id);
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
}
//html 코드 -> DOM 객체 함수
function makeDiv(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const childElement = tempElement.firstElementChild;

    return childElement;
}