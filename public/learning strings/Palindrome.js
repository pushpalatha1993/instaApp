function isPalindrome(str){
    let left = 0;
    let right = str.length-1;

    while(left < right){
        console.log(`compare str [${left}]= ${str[left]} with str [${right}] = ${str[right]}`)
        if(str[left] !== str[right]) {
            console.log("charater are not match. not a palindrome")
            return false;
                
        left ++;
        right --;
        }
       
     }
     console.log("charactors are matched.it's a palindrome")
     return true;
}

console.log(isPalindrome["m" ,"a", "d", "a", "m"]);
// console.log("------------------")
// console.log(isPalindrome("world"));
// console.log("-------------");
// console.log(isPalindrome("racecar"))