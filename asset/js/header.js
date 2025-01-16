import { getPopular, getUpcoming, searchMoive } from "./api.js";
import { $search, $bookmark, $banner, $upcoming, setMovieList } from "./env.js";
import { appendMain, getBookmarkList } from "./exportfunc.js";
//검색창 리스너
$search.addEventListener("input", debounce(function (e) {
    if(e.target.value !== ""){
        searchMoive(e.target.value);
    }
    else{
        getPopular();
    }
}, 200));
//북마크 탭 리스너
$bookmark.addEventListener("click", function(){
    setMovieList(getBookmarkList());
    appendMain();
});
//배너 리스너
$banner.addEventListener("click", function(){
    location.reload(true);
})
//곧 개봉할 영화 리스너
$upcoming.addEventListener("click", function(){
    getUpcoming();
})
//디바운싱 함수
function debounce(func, delay) {
    let timer;
    return function () {
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}