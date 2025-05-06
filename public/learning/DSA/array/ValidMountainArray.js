import React, {useEffect} from "react";

function validmountainArray( ){
    useEffect(()=>{
        const arr=[0,2,3,4,5,2,1,0];
        const result = isValidMountainArray(arr);
        console.log("Is valid moutain array:", result);
    }, []);


function isValidMountainArray(arr){
    const n=arr.length;
    if(n<3){
        console.log("array too short.Length:",n);
        return false;
    }
    let i=0;

    while(i+1 < n && arr[i]<arr[i+1]) {
        console.log(`walking up: arr[${i}] = ${arr[i]}< arr[${i+1}] = ${arr[i+1]}`);
        i++;
    }

    if(i ===0 || i === n-1){
        console.log("peak is at the wrong position. Index:",i);
        return false;
    }

    while(i + 1 < n && arr[i] > arr[i+1]){
        console.log(`walking down: arr[${i}]=${arr[i+1]}>arr[${i+1}]=${arr[i+1]}`)
        i++;
    }
    const isValid = i === n-1;
    console.log("Reached end?",isValid);
    return isValid;

}
return <div> Check console for mountain validation steps! </div>
}
export default validmountainArray;