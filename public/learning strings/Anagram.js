// 

// 
function isAnagram(str1,str2) {

    const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
  const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();

    if(cleanStr1.length !== cleanStr2.length) return false;

    const count1 = {};
    const count2 = {};

    for(let char of cleanStr1) {
        count1[char] = (count1[char] || 0) + 1; 
    }

    for(let char of cleanStr2){
        count2[char] = (count2[char] || 0) + 1;
    }
    console.log("Count 1:",count1)
    console.log("Count 2:",count2)

    for(let key in count1){
        if(count1[key] !== count2[key])
            return false;
        
    }
    return true;

}
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("triangle", "integral"));
console.log(isAnagram("hello", "world"));