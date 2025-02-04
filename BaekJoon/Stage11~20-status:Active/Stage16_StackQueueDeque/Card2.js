const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    push(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.length++;
    }
  
    pop() {
      if (!this.head) return -1;
      const popValue = this.head.value;
      this.head = this.head.next;
      this.length--;
      if (!this.head) this.tail = null;
      return popValue;
    }
  
    size() {
      return this.length;
    }
  
    empty() {
      return this.length === 0 ? 1 : 0;
    }
  
    front() {
      return this.head ? this.head.value : -1;
    }
  
    back() {
      return this.tail ? this.tail.value : -1;
    }
  }

let N = Number(input[0]);
let queue = new Queue;

for(let i = 1; i <= N ; i++) {
    queue.push(i);
}

while(queue.size() > 1) {
    queue.pop();
    queue.push(queue.pop());
}

console.log(queue.front());