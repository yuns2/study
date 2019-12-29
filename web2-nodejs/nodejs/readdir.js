// 파일이 있는 위치가 아니라, 실행하는 위치(경로를 탐색할 위치)에서 데이터의 경로를 적어줌
const testFolder = './data';
const fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
});