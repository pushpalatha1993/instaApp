// function firstUniqueChar(str) {
//     const freq = {};
  
//     // First pass: count frequencies
//     for (let char of str) {
//       freq[char] = (freq[char] || 0) + 1;
//     }
//     console.log("Frequency map:", freq);
  
//     // Second pass: find first unique
//     for (let i = 0; i < str.length; i++) {
//       if (freq[str[i]] === 1) {
//         console.log(`First unique character: '${str[i]}' at index ${i}`);
//         return i;
//       }
//     }
  
//     console.log("No unique character found.");
//     return -1;
//   }
  
//   // Test cases
//   console.log(firstUniqueChar("leetcode"));

function firstUniqueChar(str) {
    for(i=0; i<str.length; i++){
        isUnique = true;

        for(j=0; j<str.lenght; j++) {
            if(i !==j  && str[i] === str[j]) {
                isUnique = false;
                break;
            }
        }
        if(isUnique) {
            console.log(`first unique character: '${str[i]}' at index ${i}`);
            return i;
        }
    }
    console.log('No unique charactor found');
    return -1;
}

console.log(firstUniqueChar("loveleetcode"));
console.log(firstUniqueChar("hello"));