$search.addEventListener("input", debounce(function (e) {
    if(e.target.value !== ""){
        searchMoive(e.target.value);
    }
    else{
        getPopular();
    }
}, 200));

$bookmark.addEventListener("click", function(){
    movieList = getBookmarkList();
    appendFlex();
});

$banner.addEventListener("click", function(){
    location.reload(true);
})

$upcoming.addEventListener("click", function(){
    getUpcoming();
})

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

    movieList = res['results'];
    appendFlex();

}

async function getUpcoming() {
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

    movieList = res['results'];
    appendFlex();

}

