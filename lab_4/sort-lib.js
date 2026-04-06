const SortLib = (function () {

    function prepareArray(arr) {
        let cleanArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== undefined) cleanArr.push(arr[i]);
        }
        return cleanArr;
    }

    function compare(a, b, asc) {
        return asc ? a > b : a < b;
    }

    function bubbleSort(arr, asc = true) {
        let a = prepareArray(arr);
        for (let i = 0; i < a.length - 1; i++) {
            for (let j = 0; j < a.length - i - 1; j++) {
                if (compare(a[j], a[j + 1], asc)) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                }
            }
        }
        return a;
    }

    function selectionSort(arr, asc = true) {
        let a = prepareArray(arr);
        for (let i = 0; i < a.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < a.length; j++) {
                if (compare(a[min], a[j], asc)) min = j;
            }
            if (min !== i) [a[i], a[min]] = [a[min], a[i]];
        }
        return a;
    }

    function insertionSort(arr, asc = true) {
        let a = prepareArray(arr);
        for (let i = 1; i < a.length; i++) {
            let key = a[i], j = i - 1;
            while (j >= 0 && compare(a[j], key, asc)) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
        return a;
    }

    function shellSort(arr, asc = true) {
        let a = prepareArray(arr);
        let gap = Math.floor(a.length / 2);
        while (gap > 0) {
            for (let i = gap; i < a.length; i++) {
                let temp = a[i], j = i;
                while (j >= gap && compare(a[j - gap], temp, asc)) {
                    a[j] = a[j - gap];
                    j -= gap;
                }
                a[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
        return a;
    }

    function quickSort(arr, asc = true) {
        let a = prepareArray(arr);

        function qs(left, right) {
            if (left >= right) return;
            let pivot = a[Math.floor((left + right) / 2)];
            let i = left, j = right;
            while (i <= j) {
                while (compare(pivot, a[i], asc)) i++;
                while (compare(a[j], pivot, asc)) j--;
                if (i <= j) {
                    [a[i], a[j]] = [a[j], a[i]];
                    i++; j--;
                }
            }
            if (left < j) qs(left, j);
            if (i < right) qs(i, right);
        }

        qs(0, a.length - 1);
        return a;
    }

    return { bubbleSort, selectionSort, insertionSort, shellSort, quickSort };

})();



const arr = [5, 3, 8, 1, 2];

console.log("Bubble:", SortLib.bubbleSort(arr).join(", "));
console.log("Selection:", SortLib.selectionSort(arr).join(", "));
console.log("Insertion:", SortLib.insertionSort(arr).join(", "));
console.log("Shell:", SortLib.shellSort(arr).join(", "));
console.log("Quick:", SortLib.quickSort(arr).join(", "));
