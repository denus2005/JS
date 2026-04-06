const SortToolkit = (() => {

    const checkInput = (data) => {
        if (!(data instanceof Array)) {
            throw new Error("Потрібно передати масив");
        }
    };

    const toStringArray = (data) =>
        "[" + data.map(x => x === undefined ? "undef" : x).join(" | ") + "]";

    const writeOut = (msg) => {
        console.log(msg);
        const el = document.querySelector("#output");
        if (el) el.textContent += msg + "\n";
    };

    const splitArray = (data) => {
        let values = [];
        let empty = 0;

        for (let val of data) {
            if (val === undefined) empty++;
            else values.push(val);
        }

        return { values, empty };
    };

    const mergeBack = (target, values, empty) => {
        let i = 0;

        for (; i < values.length; i++) {
            target[i] = values[i];
        }

        while (i < values.length + empty) {
            target[i++] = undefined;
        }

        return target;
    };

    const showInfo = (name, cmp, mv, hadEmpty, arr) => {
        writeOut(`=== ${name} ===`);
        writeOut(`cmp: ${cmp}`);
        writeOut(`moves: ${mv}`);
        if (hadEmpty) {
            writeOut("є undefined -> перенесено в кінець");
        }
        writeOut(`=> ${toStringArray(arr)}\n`);
    };

    // Bubble
    const bubble = (data, asc = true) => {
        checkInput(data);
        const { values, empty } = splitArray(data);

        let cmp = 0, mv = 0;

        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < values.length - 1 - i; j++) {
                cmp++;
                if (asc ? values[j] > values[j + 1] : values[j] < values[j + 1]) {
                    [values[j], values[j + 1]] = [values[j + 1], values[j]];
                    mv++;
                }
            }
        }

        mergeBack(data, values, empty);
        showInfo("Bubble", cmp, mv, empty > 0, data);
        return data;
    };

    // Selection
    const select = (data, asc = true) => {
        checkInput(data);
        const { values, empty } = splitArray(data);

        let cmp = 0, mv = 0;

        for (let i = 0; i < values.length; i++) {
            let best = i;

            for (let j = i + 1; j < values.length; j++) {
                cmp++;
                if (asc ? values[j] < values[best] : values[j] > values[best]) {
                    best = j;
                }
            }

            if (best !== i) {
                [values[i], values[best]] = [values[best], values[i]];
                mv++;
            }
        }

        mergeBack(data, values, empty);
        showInfo("Selection", cmp, mv, empty > 0, data);
        return data;
    };

    // Insertion
    const insert = (data, asc = true) => {
        checkInput(data);
        const { values, empty } = splitArray(data);

        let cmp = 0, mv = 0;

        for (let i = 1; i < values.length; i++) {
            let cur = values[i];
            let j = i - 1;

            while (j >= 0) {
                cmp++;
                if (!(asc ? values[j] > cur : values[j] < cur)) break;

                values[j + 1] = values[j];
                mv++;
                j--;
            }

            values[j + 1] = cur;
            mv++;
        }

        mergeBack(data, values, empty);
        showInfo("Insertion", cmp, mv, empty > 0, data);
        return data;
    };

    // Shell
    const shell = (data, asc = true) => {
        checkInput(data);
        const { values, empty } = splitArray(data);

        let cmp = 0, mv = 0;

        for (let gap = Math.floor(values.length / 2); gap > 0; gap >>= 1) {
            for (let i = gap; i < values.length; i++) {
                let temp = values[i];
                let j = i;

                while (j >= gap) {
                    cmp++;
                    if (!(asc ? values[j - gap] > temp : values[j - gap] < temp)) break;

                    values[j] = values[j - gap];
                    mv++;
                    j -= gap;
                }

                values[j] = temp;
                mv++;
            }
        }

        mergeBack(data, values, empty);
        showInfo("Shell", cmp, mv, empty > 0, data);
        return data;
    };

    // Quick
    const quick = (data, asc = true) => {
        checkInput(data);
        const { values, empty } = splitArray(data);

        let cmp = 0, mv = 0;

        const qs = (l, r) => {
            if (l >= r) return;

            let pivot = values[(l + r) >> 1];
            let i = l, j = r;

            while (i <= j) {
                while ((cmp++, asc ? values[i] < pivot : values[i] > pivot)) i++;
                while ((cmp++, asc ? values[j] > pivot : values[j] < pivot)) j--;

                if (i <= j) {
                    if (i !== j) {
                        [values[i], values[j]] = [values[j], values[i]];
                        mv++;
                    }
                    i++; j--;
                }
            }

            if (l < j) qs(l, j);
            if (i < r) qs(i, r);
        };

        qs(0, values.length - 1);

        mergeBack(data, values, empty);
        showInfo("Quick", cmp, mv, empty > 0, data);
        return data;
    };

    return {
        bubble,
        select,
        insert,
        shell,
        quick
    };

})();

window.SortToolkit = SortToolkit;
