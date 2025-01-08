async function getNowPlaying() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTJhZGMyOThkYzY4ZTUzNTZmZTIxOTFmYjBiNzExNyIsIm5iZiI6MTczNjMxNTk3Ny40MzI5OTk4LCJzdWIiOiI2NzdlMTQ0OWYyYzYyMTgwN2RiYjAyZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X50UgxFG-hBsW_81nxM4eW4LGKaeHWaAnJDjAeDfVHw'
        }
    };

    var res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR', options);
    res = res.json();
    if(res.status === 200){
        console.log(res);
    }
    else{
        console.error(err);
    }
    // .then(res => res.json())
    //     .then(res => console.log(res))
    //     .catch(err => console.error(err));
}

