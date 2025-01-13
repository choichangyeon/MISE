const $search = document.querySelector("#search");

$search.addEventListener("input", debounce(function (e) {
    console.log(e.target.value);
    if(e.target.value !== null){
        searchMoive(e.target.value);
    }
}, 200));

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

    console.log(res);

    let movieList = res['results'];
    appendFlex(movieList);

}

