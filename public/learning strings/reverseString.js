// function reverseString(str) {
//     console.log("original string:", str)
    
//     const splitStr = str.split('');
//     console.log("step 1:split in to array:", splitStr);

//     const reversedArr = splitStr.reverse();
//     console.log("step :reversed array:", reversedArr)

//     const reversedStr = reversedArr.join('');
//     console.log("step 3:join array into string:",reversedStr)

//     return reversedStr;
// }

// console.log("result:",reverseString("hello"))
// console.log("----------");
// console.log("javascript")




function reverseString(str) {
    console.log("original string:", str);
    let reversed = "";


    for(let i=str.length-1; i>=0; i--){

        reversed += str[i];
        console.log("Added ${str[i]}->", reversed);
    }
    return reversed;
}
console.log("result:",reverseString("hello"));