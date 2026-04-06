const SortLib = (function () {

    // Підготовка масиву: видаляє undefined та повідомляє про наявність
    function prepareArray(arr) {
        let hasUndefined = false;
        let cleanArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) hasUndefined = true;
            else cleanArr.push(arr[i]);
        }
        if (hasUndefined) console.log("⚠ Масив містив undefined-елементи (розріджений масив)");
        return cleanArr;
    }

    // Порівняння двох елементів з урахуванням сортування
    function compare(a, b, asc) {
        return asc ? a > b : a < b;
    }

    // ------------------------
    // 1. Сортування обміну (Bubble)
    // ------------------------
    function bubbleSort(arr, asc = true) {
        let a = prepareArray(arr);
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < a.length - 1; i++) {
            for (let j = 0; j < a.length - i - 1; j++) {
                comparisons++;
                if (compare(a[j], a[j + 1], asc)) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    swaps++;
                }
            }
        }

        console.log(`BubbleSort - comparisons: ${comparisons}, swaps: ${swaps}`);
        return a;
    }

    // ------------------------
    // 2. Сортування мінімальних елементів (Selection)
    // ------------------------
    function selectionSort(arr, asc = true) {
        let a = prepareArray(arr);
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < a.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < a.length; j++) {
                comparisons++;
                if (compare(a[min], a[j], asc)) min = j;
            }
            if (min !== i) {
                [a[i], a[min]] = [a[min], a[i]];
                swaps++;
            }
        }

        console.log(`SelectionSort - comparisons: ${comparisons}, swaps: ${swaps}`);
        return a;
    }

    // ------------------------
    // 3. Сортування вставками (Insertion)
    // ------------------------
    function insertionSort(arr, asc = true) {
        let a = prepareArray(arr);
        let comparisons = 0, swaps = 0;

        for (let i = 1; i < a.length; i++) {
            let key = a[i];
            let j = i - 1;

            while (j >= 0) {
                comparisons++;
                if (!compare(a[j], key, asc)) break;
                a[j + 1] = a[j];
                swaps++;
                j--;
            }
            a[j + 1] = key;
        }

        console.log(`InsertionSort - comparisons: ${comparisons}, swaps: ${swaps}`);
        return a;
    }

    // ------------------------
    // 4. Сортування Шелла (Shell)
    // ------------------------
    function shellSort(arr, asc = true) {
        let a = prepareArray(arr);
        let gap = Math.floor(a.length / 2);
        let comparisons = 0, swaps = 0;

        while (gap > 0) {
            for (let i = gap; i < a.length; i++) {
                let temp = a[i];
                let j = i;

                while (j >= gap) {
                    comparisons++;
                    if (!compare(a[j - gap], temp, asc)) break;
                    a[j] = a[j - gap];
                    swaps++;
                    j -= gap;
                }
                a[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }

        console.log(`ShellSort - comparisons: ${comparisons}, swaps: ${swaps}`);
        return a;
    }

    // ------------------------
    // 5. Сортування Хоара (Quick)
    // ------------------------
    function quickSort(arr, asc = true) {
        let a = prepareArray(arr);
        let comparisons = 0, swaps = 0;

        function qs(left, right) {
            let i = left, j = right;
            let pivot = a[Math.floor((left + right) / 2)];

            while (i <= j) {
                while ((comparisons++, compare(pivot, a[i], asc))) i++;
                while ((comparisons++, compare(a[j], pivot, asc))) j--;

                if (i <= j) {
                    [a[i], a[j]] = [a[j], a[i]];
                    swaps++;
                    i++; j--;
                }
            }

            if (left < j) qs(left, j);
            if (i < right) qs(i, right);
        }

        qs(0, a.length - 1);

        console.log(`QuickSort - comparisons: ${comparisons}, swaps: ${swaps}`);
        return a;
    }

    return {
        bubbleSort,
        selectionSort,
        insertionSort,
        shellSort,
        quickSort
    };

})();
