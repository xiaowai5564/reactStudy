var Class = (function(){
    var _mix = function(r,s){
        for(var p in s){
            if(s.hasOwnProperty(p)){
                r[p] = s[p];
            }
        }
    };

    var _extend = function(){
        this.initPrototype = true;
        var prototype = new this();
        this.initPrototype = false;
        var items = Array.prototype.slice.call(arguments) || [];
        var item;
        while(item = item.shift()){
            _mix(prototype,item.prototype || item);
        }

        function SubClass(){
            if(!SubClass.initPrototype&&this.init){
                this.init.apply(this,arguments);
            }
        }

        SubClass.prototype = prototype;
        SubClass.prototype.constructor = SubClass;

        SubClass.extend = _extend;
        return SubClass;
    }

    var Class = function(){};
    Class.extend = _extend;
    return Class;
})();