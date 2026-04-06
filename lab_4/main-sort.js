function generateArray(size) {
    return Array.from({ length: size }, () =>
        Math.floor(Math.random() * 1000)
    );
}


let normalArray = generateArray(100);


let sparseArray = generateArray(100);
sparseArray[10] = undefined;
sparseArray[40] = undefined;
sparseArray[90] = undefined;

console.log("=== NORMAL ARRAY ===");
SortLib.bubbleSort(normalArray);
SortLib.selectionSort(normalArray);
SortLib.insertionSort(normalArray);
SortLib.shellSort(normalArray);
SortLib.quickSort(normalArray);

console.log("=== SPARSE ARRAY ===");
SortLib.bubbleSort(sparseArray);
SortLib.selectionSort(sparseArray);
SortLib.insertionSort(sparseArray);
SortLib.shellSort(sparseArray);
SortLib.quickSort(sparseArray);
