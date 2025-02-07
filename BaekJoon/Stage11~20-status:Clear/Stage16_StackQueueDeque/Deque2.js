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
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.length--;
    return popValue;
  }

  shift() {
    if (!this.head) return -1;
    const popValue = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
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
let deque = new Deque();
let results = [];

for (let i = 1; i <= N; i++) {
  let query = input[i];
  let [cmd, value] = query.split(" ");
  switch (cmd) {
    case "1":
      deque.unshift(parseInt(value));
      break;
    case "2":
      deque.push(parseInt(value));
      break;
    case "3":
      results.push(deque.shift());
      break;
    case "4":
      results.push(deque.pop());
      break;
    case "5":
      results.push(deque.size());
      break;
    case "6":
      results.push(deque.empty());
      break;
    case "7":
      results.push(deque.front());
      break;
    case "8":
      results.push(deque.back());
      break;
  }
}

console.log(results.join("\n"));