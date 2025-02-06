const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  unshift(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }

  pop() {
    if (!this.tail) return -1;
    const popValue = this.tail.value;

    if (this.tail === this.head) {
      this.head = this.tail = null;
    } else {
      const prevNode = this.tail.prev;
      this.tail.prev = null;
      this.tail = prevNode;
      this.tail.next = null;
    }

    this.length--;
    return popValue;
  }

  shift() {
    if (!this.head) return -1;
    const popValue = this.head.value;
    
    if (this.head === this.tail) {
      this.head.prev = null;
    } else {
      const nextNode = this.head.next;
      this.head.next = null;
      this.head = nextNode;
      this.head.prev = null;
    }
    this.length--;
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
let li = input[1].split(" ").map(Number);
let deque = new Deque();
let results = [];

for (let i = 0; i < N; i++) {
  deque.push([i + 1, li[i]]);
}

while (!deque.empty()) {
  let [num, val] = deque.shift();
  results.push(num);

  if (deque.empty()) break;

  if (val > 0) {
    for (let i = 1; i < val; i++) {
      deque.push(deque.shift());
    }
  } else {
    for (let i = 0; i < Math.abs(val); i++) {
      deque.push(deque.pop());
    }
  }
}

console.log(results.join(" "));