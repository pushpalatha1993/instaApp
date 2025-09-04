// function countVowels(str) {
//     const vowels = "aeiou";
//     let count = 0;

//     const lowerStr = str.toLowerCase();

//     for(let i=0; i<lowerStr.length; i++){
//         if(vowels.includes(lowerStr[i])){
           
//             count++;
//             console.log(`founded vowels:${str[i]},(count:${count++})`);
//         }
//     }
//     return count;
// }
// console.log("Total vowels:",countVowels("hello"));




function countVowels(str) {
    const vowels = "aeiouAEIOU";
    let count = 0;

    for(const char of str){
        if(vowels.includes(char)) {
            count++;
            console.log(`founded vowels:${char}`);
        }
    }
    return count;
}
console.log("Total vowels:", countVowels("javaScript is Fun"));