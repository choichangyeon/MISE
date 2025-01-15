const $search = document.querySelector("#search");
const $bookmark = document.querySelector("#bookmark");

$search.addEventListener("input", debounce(function (e) {
    if(e.target.value !== ""){
        searchMoive(e.target.value);
    }
    else{
        getPopular();
    }
}, 200));

$bookmark.addEventListener("click", function(e){
    movieList = bookmarkList;
    appendFlex();
});

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


async function searchMoive(word) {
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

    // console.log(res);

    movieList = res['results'];
    appendFlex();

}

