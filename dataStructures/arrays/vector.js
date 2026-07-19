class Vector {
  constructor(capacity) {
    this._capacity = capacity;
    this.data = [];
    this._size = 0;
  }

  at(index) {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }
    return this.data[index];
  }

  push(item) {
    this.data[this._size] = item;
    this._size++;
  }

  size() {
    return this._size;
  }

  is_empty() {
    return this._size === 0;
  }

  pop() {
    if (this.is_empty()) {
      throw new Error("Vector is empty");
    }

    const item = this.data[this._size - 1];
    this.data[this._size - 1] = undefined;
    this._size--;

    if (this._size <= Math.floor(this._capacity / 4) && this._capacity > 16) {
      this.resize(Math.floor(this._capacity / 2));
    }
    return item;
  }

  resize(newCapacity) {
    const newData = [];
    for (let i = 0; i < this._size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this._capacity = newCapacity;
  }

  capacity() {
    return this._capacity;
  }

  insert(index, item) {
    if (index < 0 || index > this._size) {
      throw new Error("Index out of bounds");
    }

    // 꽉 찼으면 resize로 용량 2배.
    if (this._size >= this._capacity) {
      this.resize(this._capacity * 2);
    }

    // index부터 뒤까지 오른쪽으로 한칸씩 이동해서 Index 자리를 비움
    for (let i = this._size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = item;
    this._size++;
  }

  prepend(item) {
    this.insert(0, item); // 0번째 자리에 삽입
  }

  // 방향이 insert와 반대인 이유는 삭제할 요소를 왼쪽으로 한칸씩 이동시키기 때문
  delete(index) {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }
    for (let i = index; i < this._size - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.data[this._size - 1] = undefined;
    this._size--;
  }

  remove(item) {
    for (let i = 0; i < this._size; i++) {
      if (this.data[i] === item) {
        this.delete(i);
        return;
      }
    }
  }

  find(item) {
    for (let i = 0; i < this._size; i++) {
      if (this.data[i] === item) {
        return i;
      }
    }
    return -1;
  }
}

const myArray = new Vector(5);
myArray.push(1);
myArray.push(2);
myArray.push(3);
myArray.push(4);
myArray.push(5);

console.log(myArray); // [1, 2, 3, 4, 5]

myArray.pop();
console.log(myArray); // [1, 2, 3, 4]
