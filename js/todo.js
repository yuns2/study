// toDoForm
// toDoInput : 할일을 기록하는 공간
// toDoList : 할일이 기록된 공간
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

// 로컬 스토리지에 들어갈 '항목이름'을 저장함
const TODOS_LS = 'toDos';

// 할일이 하나가 아니라 여러개이므로, 배열로 저장해야하며
// 이를 저장할 빈 배열을 만들어 준다.
var toDos = [];

// 기능3 : 바뀐 할일 목록을 저장한다.
function saveToDos(){
    // stringfy : 자바스크립트 object를 string으로 바꿔줌
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
// 기능4 : 할일을 삭제한다.
function deleteToDo(event){
    // event.target : 이벤트를 전달한 객체에 대한 참조
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // toDos에 있는 각 목록들이 하나씩 인자로 작동

    // filter(): 주어진 함수의 테스트를 통과하는(True) 모든 요소를 모아 새로운 배열로 반환 
    // → return값이 참이 되도록만 하는 값을 반환
    const cleanToDos = toDos.filter(function(toDo){
        // console.log(li.id);
        // console.log(toDo.id);
        // id의 데이터 타입 : String → 숫자형 데이터로 변환해 줘야함.
        return toDo.id !== parseInt(li.id);
    });
    
    toDos = cleanToDos;
    const currentToDos = JSON.stringify(cleanToDos);
    localStorage.setItem(TODOS_LS, currentToDos);
}

// 기능1 : 할일을 기록한다.(만든다)
function paintToDo(text){
    // 할일을 추가할때 마다 li를 하나씩 만듦
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    // delete 버튼을 누르면 삭제됨
    delBtn.addEventListener('click', deleteToDo);
    // 실제 내용이 들어갈 곳
    const span = document.createElement("span");
    // ---> 버튼 만들기

    


    // newId → 새로 만들어진 할일의 번호 (0+1) 
    const newId = toDos.length + 1;

    // text → submit에서 제출된 값, 인자로 넘겨줌
    span.innerText = text;
    // ----> 값 할당

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    // ----> Element의 위치 지정

    // 할일 목록을 네트워크에 저장하기 위해 객체 형태로 배열에 저장한다.
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}
// 기능5 : 제출버튼을 클릭했을때, input안의 텍스트 변화
function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    // 할일 작성 칸을 비워줌
    toDoInput.value = "";
}
// 기능2 : 할일 목록을 로드한다.
function loadToDos(){
    // localStorage의 TODOS_LS의 value를 가져온다.
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
    // 저장된 값이 있으면 → paintToDo와 saveTodo를 통해 toDos(배열)이 TODO_LS 값으로 저장된 상태(String으로)
    // JSON.parse : JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성
    const parsedToDos = JSON.parse(loadedToDos);
    // console.log(parsedToDos);
    // parsedToDos → 객체
    // 할일을 기록한다(화면상에 나타낸다).
    // 여기서 인자 toDo는 객체
    parsedToDos.forEach(function(toDo){
        // 저장된 목록을 화면에 구현
        // text 속성만 빼오기 위해서 parse한거임
        paintToDo(toDo.text);
    });
    
}
}
function init(){
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit)
}

init();


// forEach처럼 각각의 아이템에서 실행될 예정
// toDos에 있는 모든 항목을 통과하되, 조건이 참일 경우만 return값을 반환한다.
