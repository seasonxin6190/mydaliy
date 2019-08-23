/**
 * 
 * @param {array} arr
 * 冒泡排序
 * 时间复杂度： O(n²) 
 */ 


function BubbleSort(arr) {
    let alen = arr.length;
    for (let i = 1; i < alen; i++) {
        let flag = true; // 加个标示
        for (let j = 0; j < alen; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                flag = false;
            }
        }
        if (flag) {
            break;
        }
    }
    return arr;
}
let tempArr = [2, 1, 37, 78, 8, 6, 0]
console.log('bubbleSort:', BubbleSort(tempArr));

function bubbleSort2(arr) {
    console.time('改进后冒泡排序耗时');
    var i = arr.length - 1;  //初始时,最后位置保持不变
    while (i > 0) {
        var pos = 0; //每趟开始时,无记录交换
        for (var j = 0; j < i; j++)
            if (arr[j] > arr[j + 1]) {
                pos = j; //记录交换的位置
                var tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
            }
        i = pos; //为下一趟排序作准备
    }
    console.timeEnd('改进后冒泡排序耗时');
    return arr;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort2(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]