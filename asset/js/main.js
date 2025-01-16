import { getPopular } from "./api.js";
import { $movieFlex } from "./env.js";
import { showmodal } from "./exportfunc.js";

//초기 화면 가져오기
getPopular();
//이벤트 위임을 통한 ID 함수
$movieFlex.addEventListener("click", function(e){
    
    const card = e.target.closest(".movie-card");
    
    if (!card) return;

    const movieId = card.id;

    console.log("클릭한 카드 ID:", movieId);
    showmodal(movieId);
})
