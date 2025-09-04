// function removeDuplicates(str) {
//      let result = "";

//      for(let i=0; i<str.length; i++) {
//         if(!result.includes(str[i])) {
//             result += str[i];
//             console.log(`Added '${str[i]}' ->${result}`)
//         }else {
//             console.log(`skipped '${str[i]}`)
//         }
//      }
//      return result;
// }
// console.log(removeDuplicates("abcabc"));


function removeDuplicates(str) {

    const uniquechars = [new Set(str)];
    console.log("unique characters array:",uniquechars);
    return uniquechars.join();
}
console.log(removeDuplicates("hello"));
console.log(removeDuplicates("javaScript"));