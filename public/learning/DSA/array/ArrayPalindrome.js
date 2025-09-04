function isArrayPalindrome(arr) {
    let left= 0;
    let right = arr.length-1;

    while(left < right) {
        console.log(`compare arr [${left}] =${arr[left]} with arr[${right}] = ${arr[right]}`);
        if(arr[left] !== arr[right]) {
            console.log("charactors are not matche. not a palindrom")
            return false;
        }
        left++;
        right--;
    }
    console.log("charactors are matched.it's a palindrom")
    return true;
}
console.log(isArrayPalindrome(["m", "a", "d", "a", "m"]))
console.log("-----------------")
console.log(isArrayPalindrome(["h", "e", "l", "l","o"]))
console.log(isArrayPalindrome([1,2,1]))
console.log(isArrayPalindrome([1,2,3,4]))
console.log(isArrayPalindrome("madam"))
