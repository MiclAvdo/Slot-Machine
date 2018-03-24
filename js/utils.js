//shufflle function on Array prototype (use for slot machine!!!)


Array.prototype.shuffle = function () {
    for (let index = this.length - 1; index > 0; index--) {
        let j = Math.floor(Math.random() * (index + 1));
        let tmp = this[j];
        this[j] = this[index];
        this[index] = tmp;
    }
    return this;
}

let x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];