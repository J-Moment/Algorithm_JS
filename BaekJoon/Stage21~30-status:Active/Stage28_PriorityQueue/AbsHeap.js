class AbsMinHeap {
    constructor() {
        this.heap = [];
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    compare(a, b) {
        const absA = Math.abs(a);
        const absB = Math.abs(b);
        if (absA === absB) return a - b;
        return absA - absB;
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        if (this.heap.length === 0) return 0;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        
        return min;
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[parentIndex], this.heap[index]) <= 0) break;
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
            let smallest = index;

            if (leftChildIdx < length && this.compare(this.heap[leftChildIdx], this.heap[smallest]) < 0) {
                smallest = leftChildIdx;
            }

            if (rightChildIdx < length && this.compare(this.heap[rightChildIdx], this.heap[smallest]) < 0) {
                smallest = rightChildIdx;
            }

            if (smallest === index) break;

            this.swap(index, smallest);
            index = smallest;
        }
    }
}

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let N = Number(input[0]);

let li = [];
for(let i = 1 ; i <= N ; i++){
    li.push(Number(input[i]));
}
const heap = new AbsMinHeap();
const result = [];

for (const num of li) {
    if (num === 0) {
        result.push(heap.pop());
    } else {
        heap.push(num);
    }
}

console.log(result.join("\n"));