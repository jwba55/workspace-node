console.log("START");

setTimeout(() => console.log(1), Math.random() * 5000);
setTimeout(() => console.log(2), Math.random() * 5000);
setTimeout(() => console.log(3), Math.random() * 5000);
setTimeout(() => console.log(4), Math.random() * 5000);
setTimeout(() => console.log(5), Math.random() * 5000);

console.log("END")

//자바 스크립트에서 기본적으로는 이 코드를 동기적으로 처리하는 방법이 없음. 그래서 promise를 써야함. 