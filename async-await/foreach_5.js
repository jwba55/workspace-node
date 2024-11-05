//resolve = 이 promise가 끝나면 무엇을 해라(여기에 지정되는거는 람다 or function이어야한다.)
const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 5000));    

const foreach = async () => {
    console.log("START");

    for(let a=1; a <= 5; a++){
        await delay(console.log(a));
    }
    console.log("END")
}

foreach();