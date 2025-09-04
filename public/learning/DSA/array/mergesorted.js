function mergesorted (nums1,m, nums2,n){
    i=m-1;
    j=n-1;
    k=m+n-1;
    console.log("initial numsq1:",[nums1])
    console.log('initial nums2:',[nums2])
    console.log('starting merge....\n')
    
    
    while(j>=0){
    if(i>=0  && nums1[i]>nums2[j]){
        console.log('nums1[${i}]>nums2[${j}], placing nums1[${i}] at nums1[${k}]')
        nums1[k] = nums1[i];
        i--;
    }else {
        console.log('nums2[${j}]>nums1[${i}],placing nums2[${j}] at nums1[${k}')
        nums1[k] = nums2[j];
        j--;
    }
    console.log('current merge array:',[nums1],"\n")
    k--;
    }
    console.log("final merge array:", nums1);
    }
    let nums1 = [1,2,3,0,0,0];
    let nums2 = [2,5,6];
    let m=3;
    let n=3;

    mergesorted(nums1,m,nums2,n);



