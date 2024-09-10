import { createServer } from 'node:http';

const port = 7337;
const host = "0.0.0.0"; //모든 기기에 대하여 작동할 수 있도록 설정하는 것
//본래 localhost는 내 컴퓨터의 ip이다.

//let = 가변 변수 (대상 객체 자체를 변경할 수 있음.-가변), const = 불변 변수(객체 자체는 변하지 않고 내용물을 변경할 수 있음.-불변)
//const로 사용해서 작업후 작동시켰을때 문제가 생기면 해당 부분을 let으로 변경해주기
//
let list = [];  //데이터를 관리할 배열
let seq = 1;    //시퀀스적용

// 리스트 데이터를 저장할 배열
list.push({
    id: seq++,   // 고유한 id 값을 seq에서 증가시키며 설정
    name: "지우개",  // 항목의 이름
    address: "주소",  // 항목의 주소
});

list.push({
    id: seq++,   // id 값을 seq에서 증가시키며 설정
    name: "나혼자",  // 항목의 이름
    address: "주소",  // 항목의 주소
});

// 서버 생성 및 요청 처리
const server = createServer((req, res) => {
    req.setEncoding("utf-8"); // 요청 바디의 인코딩을 UTF-8로 설정
    res.writeHead(200, { 'Content-Type': 'application/json' }); // 응답 헤더를 JSON 타입으로 설정

    const body = []; // 요청 바디를 저장할 배열 초기화

    // 요청이 읽힐 때마다 데이터를 body 배열에 저장
    req.on("readable", () => {
        let chunk;
        while (null !== (chunk = req.read())) // 읽을 데이터가 있는 동안
            body.push(chunk); // body 배열에 추가
    });

    // 요청이 끝났을 때 호출됨
    req.on("end", () => {    
        if(req.method === "POST") { // 요청 메소드가 POST인 경우
            if(body) {  // body에 데이터가 있는지 확인
                const item = JSON.parse(body); // 요청 바디를 파싱하여 JSON 객체로 변환
    
                if(item) { // 파싱된 객체가 존재할 경우
                    item.id = seq++; // 새로운 항목의 id를 할당
                    list.push(item); // 리스트에 항목 추가
                }
            }
        } else if(req.method === "DELETE") {  // 요청 메소드가 DELETE인 경우
            const id = req.url.split("/").at(-1); // URL에서 마지막 부분을 id로 간주
    
            if(id)
                list = list.filter(value => value.id != id); // id에 해당하는 항목을 리스트에서 삭제
        } else if(req.method === "PUT") {  // 요청 메소드가 PUT인 경우
            const item = JSON.parse(body); // 요청 바디를 JSON 객체로 파싱
    
            if(item) {
                // 기존 id에 해당하는 항목을 리스트에서 삭제 후
                list = list.filter(value => value.id != item.id);
                // 업데이트된 항목을 리스트에 추가
                list.push(item);
            }
        }

        // 리스트를 id 순서로 정렬 (오름차순)
        list.sort((left, right) => left.id - right.id);
    
        // 정렬된 리스트를 JSON 형식으로 응답
        res.end(JSON.stringify(list));
    });  
});

// 서버가 지정된 포트와 호스트에서 요청을 듣기 시작
server.listen(port, host, () => {
    console.log(`Listening on ${host}:${port}`); // 서버가 실행 중임을 콘솔에 출력
});