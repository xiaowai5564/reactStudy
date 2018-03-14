/* var textCount = {
    input: null,
    init: function (config) {
        this.input = $(config.id);
        this.bind()
        return this;
    },
    bind: function () {
        var self = this;
        this.input.on('input', function () {
            self.render()
        })
    },
    getNum: function () {
        return this.input.val().length;
    },
    render: function () {
        var num = this.getNum();
        if ($('#ipt_count').length == 0) {
            this.input.after('<span id="ipt_count"></span>')
        }
        $('#ipt_count').html(num + '个字')
    }
}; */

var TextCount = (function(){
    var _bind = function(that){
        that.input.on('input',function(){
            that.render();
        })
    } ;

    var _getNum = function(that){
        return that.input.val().length;
    };

    var TextCountFun = function(config){};

    TextCountFun.prototype.init = function(config){
        this.input = $(config.id);
        _bind(this);
        return this;
    }
    TextCountFun.prototype.render = function(){
        var num = _getNum(this);
        if ($('#ipt_count').length == 0) {
            this.input.after('<span id="ipt_count"></span>')
        }
        $('#ipt_count').html(num + '个字')
    };

    return TextCountFun;
})();

$(function(){
   /*  var ipt = $('#ipt');

    function getNum(){
        return ipt.val().length;
    }

    function render(){
        var num = getNum();
        if($('#ipt_count').length==0){
            ipt.after('<span id="ipt_count"></span>')
        }
        $('#ipt_count').html(num+'个字')
    }

    ipt.on('input',function(){
        render()
    })

    render(); */

    // textCount.init({id:'#ipt'}).render();

    new TextCount().init({id:'#ipt'}).render();

})

