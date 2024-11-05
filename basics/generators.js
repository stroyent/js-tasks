function* pseudoRandom(seed) {
    let nextValue = seed;

    while (true) {
        nextValue = nextValue * 16807 % 2147483647;
        yield nextValue;
    }
}

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073

 // async generators

 async function* sequence() {
    let i = 1;
    while(true) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        i++;
        yield i;
    }
 }


(async () => {
    let sequenceGenerator = sequence()
    for await (let number of sequenceGenerator) {
        alert(number);
        if (number === 5) {
            break;
        }
     }
})()
