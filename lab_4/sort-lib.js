// Псевдопростір імен
const SortLib = {

    // Перевірка undefined (для sparse arrays)
    handleUndefined(arr) {
        let hasUndefined = arr.some(el => el === undefined);
        if (hasUndefined) {
            console.log("⚠ Масив містить undefined елементи");
        }
    },

    compare(a, b, asc) {
        if (a === undefined) return false;
        if (b === undefined) return true;
        return asc ? a > b : a < b;
    },

    // 1. Сортування обміну (bubble)
    bubbleSort(arr, asc = true) {
        let a = [...arr];
        let cmp = 0, swap = 0;

        this.handleUndefined(a);

        for (let i = 0; i < a.length - 1; i++) {
            for (let j = 0; j < a.length - i - 1; j++) {
                cmp++;
                if (this.compare(a[j], a[j + 1], asc)) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    swap++;
                }
            }
        }

        console.log("BubbleSort:", { cmp, swap });
        return a;
    },

    // 2. Сортування мінімальних елементів (selection)
    selectionSort(arr, asc = true) {
        let a = [...arr];
        let cmp = 0, swap = 0;

        this.handleUndefined(a);

        for (let i = 0; i < a.length - 1; i++) {
            let idx = i;
            for (let j = i + 1; j < a.length; j++) {
                cmp++;
                if (this.compare(a[idx], a[j], asc)) {
                    idx = j;
                }
            }
            if (idx !== i) {
                [a[i], a[idx]] = [a[idx], a[i]];
                swap++;
            }
        }

        console.log("SelectionSort:", { cmp, swap });
        return a;
    },

    // 3. Сортування вставками
    insertionSort(arr, asc = true) {
        let a = [...arr];
        let cmp = 0, move = 0;

        this.handleUndefined(a);

        for (let i = 1; i < a.length; i++) {
            let key = a[i];
            let j = i - 1;

            while (j >= 0) {
                cmp++;
                if (!this.compare(a[j], key, asc)) break;
                a[j + 1] = a[j];
                move++;
                j--;
            }
            a[j + 1] = key;
        }

        console.log("InsertionSort:", { cmp, move });
        return a;
    },

    // 4. Сортування Шелла
    shellSort(arr, asc = true) {
        let a = [...arr];
        let cmp = 0, move = 0;

        this.handleUndefined(a);

        for (let gap = Math.floor(a.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < a.length; i++) {
                let temp = a[i];
                let j = i;

                while (j >= gap) {
                    cmp++;
                    if (!this.compare(a[j - gap], temp, asc)) break;
                    a[j] = a[j - gap];
                    move++;
                    j -= gap;
                }
                a[j] = temp;
            }
        }

        console.log("ShellSort:", { cmp, move });
        return a;
    },

    // 5. Швидке сортування (Хоара)
    quickSort(arr, asc = true) {
        let a = [...arr];
        let cmp = 0, swap = 0;

        this.handleUndefined(a);

        function qs(left, right) {
            if (left >= right) return;

            let pivot = a[Math.floor((left + right) / 2)];
            let i = left, j = right;

            while (i <= j) {
                while (a[i] !== undefined && (asc ? a[i] < pivot : a[i] > pivot)) {
                    i++; cmp++;
                }
                while (a[j] !== undefined && (asc ? a[j] > pivot : a[j] < pivot)) {
                    j--; cmp++;
                }

                if (i <= j) {
                    [a[i], a[j]] = [a[j], a[i]];
                    swap++;
                    i++; j--;
                }
            }

            if (left < j) qs(left, j);
            if (i < right) qs(i, right);
        }

        qs(0, a.length - 1);

        console.log("QuickSort:", { cmp, swap });
        return a;
    }
};
