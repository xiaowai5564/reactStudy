function Sup(name){
    this.name =  name || 'animal';
    this.sleep = function(){
        console.log(this.name + '正在睡觉');
    }
}


Sup.prototype.eat = function(food){
    console.log(this.name+'正在吃'+food);
}

//原型链继承
/* 将父类的实例作为子类的原型 */
/* 
特点：
1.非常纯粹的继承关系，实例是子类的实例，也是父类的实例
2.父类新增的原型方法或原型属性子类都能访问到
3.简单，易于实现

缺点
1.要想为子类增加属性与方法，必须要在new Sup()语句之后执行，不能放在构造器中
2.无法实现多继承
3.来自原型对象的引用属性是所有实例共享的
4.创建子类实例时，无法向父类构造函数传参

3，4两大致命缺陷
*/

/* function Cat(){}
Cat.prototype = new Sup();
Cat.prototype.name = 'cat';
var cat = new Cat();

console.log(cat.name,cat.eat('fish'),cat.sleep(),cat instanceof Cat,cat instanceof Sup); */

//构造继承
/* 使用父类的构造函数来增强子类实例，等于复制父类的实例属性给子类（没有用到原型） */
/* 
特点：
1.解决了原型继承中，子类实例共享父类引用属性的问题
2.创建子类实例时，可以向父类传递参数
3.可以实现多继承

缺点：
1.实例并不是父类的实例，而是子类的实例
2.只能继承父类的实例属性和方法，不能继承原型属性和方法
3.无法实现函数的复用，每个子类都有父类实例函数的副本，影响性能
*/

/* function Cat(name){
    Sup.call(this);
    this.name = name || 'Animal';
}

var cat = new Cat('s');


console.log(cat.name,cat.sleep(),cat instanceof Cat,cat instanceof Sup); */

//true false


//实例继承
/* 为父类实例添加新特性，作为子类实例返回 */
/* 
特点：
1.不限制调用方式，不管是new子类()还是子类()，返回的对象具有相同的效果

缺点：
1.实例是父类的实例，不是子类的实例
2.不支持多继承
*/


/* function Cat(name){
    var instance = new Sup();
    instance.name = name || 'animal';
    return instance;
}

var cat = new Cat();
console.log(cat.name,cat.sleep(),cat instanceof Cat,cat instanceof Sup) */
//false true

//拷贝继承
/*  */

function Cat(name){
    var sup = new Sup();
    for(var p in sup){
        Cat.prototype[p]=sup[p]
    }
    Cat.prototype.name = name || 'animal';
}

var cat = new Cat();
console.log(cat.name,cat.sleep(),cat instanceof Cat,cat instanceof Sup);
//true false

