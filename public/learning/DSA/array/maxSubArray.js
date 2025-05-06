function maxSubArray(nums) {
    let maxSum=nums[0];
    let currentSum=nums[0]

    console.log("starting values:");
    console.log(`current = ${currentSum},maxSum = ${maxSum}`);
    console.log("-------------");

    for(let i=1;i<nums.length;i++){
        console.log(`nums[${i}] = ${nums[i]}`);
        currentSum=Math.max(nums[i],currentSum+nums[i]);
        console.log( `Updated currentsum = ${currentSum}`);

        maxSum=Math.max(currentSum,maxSum);
        console.log(`Updated maxSum = ${maxSum}`);
        console.log("----------")
    }
    return maxSum;
}
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
// console.log(currentSum);
// console.log(maxSum);