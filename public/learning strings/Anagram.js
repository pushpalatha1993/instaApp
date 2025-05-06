import React, {useEffect} from 'react'

function ValidanagramExample() {
    useEffect(() => {
        const s = "listen";
        const t = "silent";
        const result = isAnagram(s,t);
        console.log(`is "${s}" an anagram of "${t}"?`,result);
    } ,[] );

    function isAnagram(s,t) {
        if(s.length !== t.length) {
            console.log("lenght are different, not anagram");
            return  false;
        }

       const count = {};

       for(let char of s){
        count[char] = (count[char] ||0) +1;

       }
       console.log("charctor count after proccessing s:",count);

       for(let char of t){
        if(!count[char]) {
            console.log(`charactor '${char}' is not matched or used too many times.`);
            return false;
        }
        count[char]--;
       }
       console.log("charactor count after proccessing t:",count);
       return true;
    }
//  return<div> check the console to see if the string are anagrams.</div>
} 
export default ValidanagramExample;