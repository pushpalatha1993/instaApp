
function twoSum(nums, target) {
    if (nums.length<=0) return []
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
  }

  console.log(twoSum([3,2,4],6))
  console.log(twoSum([4,2,7],11))
  console.log(twoSum([3,2,4,6,7],7))
  console.log(twoSum([3,2,4,6,7],9))
  console.log(twoSum([],6))