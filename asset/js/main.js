


function getNowPlaying() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    };

    fetch(`${API_URL}/movie/now_playing?language=ko&page=1&region=KR`, options)
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
        res = await fetch(`${API_URL}/movie/popular?language=ko&page=1`, options);
        res = await res.json();
    }
    catch (err) {
        console.error(err);
    }

    console.log(res);

    let movieList = res['results'];

    appendFlex(movieList);

    console.log(movieList);
}

// getNowPlaying();
getPopular();