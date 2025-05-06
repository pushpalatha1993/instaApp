function removeDuplicates (num) {
   if(num.length === 0)return 0;
    let result=[];
    
    for( let j=0;j<num.length;j++){
        console.log("-------start------")

        console.log('j = ',j)
        console.log('prev result = ',result)
        console.log('result.indexOf(num[j]) = ',result.indexOf(num[j]))
        if(result.indexOf(num[j]) === -1){   // or if (!result.includes(num[j])) {
            result.push(num[j])
        console.log('updated result = ',result)
        }

    }
    console.log('outputing results')

return result
}
console.log(removeDuplicates([1,1,2,2,2,3,3]))
