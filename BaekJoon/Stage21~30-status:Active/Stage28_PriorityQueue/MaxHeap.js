class MaxHeap {
    constructor() {
        this.heap = [];
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        if (this.heap.length === 0) return 0;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();

        return max;
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] >= this.heap[index]) break;
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    heapifyDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            let leftChildIdx = index * 2 + 1;
            let rightChildIdx = index * 2 + 2;
            let largest = index;

            if (leftChildIdx < length && this.heap[leftChildIdx] > this.heap[largest]) {
                largest = leftChildIdx;
            }

            if (rightChildIdx < length && this.heap[rightChildIdx] > this.heap[largest]) {
                largest = rightChildIdx;
            }

            if (largest === index) break;

            this.swap(index, largest);
            index = largest;
        }
    }
}

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let N = Number(input[0]);
const heap = new MaxHeap();
let result = [];

for(let i = 1 ; i <= N ; i++){
    let num = Number(input[i]);

    if(num === 0) result.push(heap.pop());
    else heap.push(num);
}

console.log(result.join("\n"));