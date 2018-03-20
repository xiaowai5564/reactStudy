function Sup() {
    this.name = 'window';
    this.bra = ['a', 'b'];
}

Sup.prototype.sayWhat = function () {
    console.log('hello');
}

function Sub() {
    this.subname = 'your sisiter';
    console.log('this',this)
    Sup.call(this);
}

var sub = new Sub();
console.log(sub);