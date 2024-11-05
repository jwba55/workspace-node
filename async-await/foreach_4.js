console.log("START");

//resolve = 이 promise가 끝나면 무엇을 해라(여기에 지정되는거는 람다orfunction이어야한다.)
const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 5000));

delay().then(() => console.log(1))
    .finally(() => delay().then(() => console.log(2)))
        .finally(() => delay().then(() => console.log(3)))
            .finally(() => delay().then(() => console.log(4)))
                .finally(() => delay().then(() => console.log(5)))
                    .finally(() => console.log("END")); //생성한 promise를 호출하고.then에 있는 내용이 resolve자리에 들어가고 setTimeot안의 resolve에 다시 대입된다.
                    //이것을 깔끔하게 하기위해 async - await이 나옴             