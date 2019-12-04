const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS ="currentUser",
    SHOWING_ON = "showing";

// 기능5 : user의 이름을 로컬 스토리지에 저장한다.
function saveName(text){
    localStorage.setItem(USER_LS, text);
}
// currentUser가 없으면, 유저의 이름을 요청한다.

// 기능4 : 제출 버튼을 눌렀을 때 1) 인삿말 표시, 2) 로컬 스토리지에 새롭게 저장
function handleSubmit(event){
    // submit의 기본적 특성 제거 → 제출하면 새로고침 되는 것
    event.preventDefault();
    // input에 입력된 값을 저장
    const currentValue = input.value;
    console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);

}
// 기능2 : 이름 물어보기
function askForName (){
    // 이름을 입력하는 칸을 보이게 한다 > 유저가 등록되어 있는 경우는 안보임
    form.classList.add(SHOWING_ON);
    form.addEventListener('submit',handleSubmit);
}
// 기능3 : 인삿말 표시하기
function paintGreeting(text){
    form.classList.remove(SHOWING_ON)
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text} :)`;
}

// 기능1 : 이름 불러오기
function loadName (){
    // 로컬 스토리지에서 USER_LS를 가져오기 위해 변수 지정
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // she is not
        // 유저를 가지고 있지 않을 때(로컬 스토리지에서) 작동
        // 이름을 물어본다.
        askForName();
    }else{
        // she is
        // 유저를 가지고 있을 때 작동
        // local storage에서 가져온 유저 이름을 인자로 가져옴
        // 인삿말을 표시한다.
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}
init();