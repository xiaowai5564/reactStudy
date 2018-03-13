
function ReactDOMTextComponent(text) {
    this._currentElement = '' + text;
    this._rootNodeID = null;
}

ReactDOMTextComponent.prototype.mountComponent = function (rootID) {
    this._rootNodeID = rootID;
    return '<span data-reactid="' + rootID + '">' + this._currentElement + '</span>';
}




function ReactDOMComponent(element) {
    this._currentElement = element;
    this._rootNodeID = null;
}

ReactDOMComponent.prototype.mountComponent = function (rootID) {
    this._rootNodeID = rootID;
    var props = this._currentElement.props;
    var tagOpen = '<' + this._currentElement.type;
    var tagClose = '</' + this._currentElement.type + '>'
    tagOpen += ' data-reactid=' + this._rootNodeID;

    for (var propKey in props) {
        if (/^on[A-Za-z]/.test(propKey)) {
            var eventType = propKey.replace('on', '');
            $(document).delegate('[data-reactid="' + this._rootNodeID + '"]', eventType + '.' + this._rootNodeID, props[propKey])
        }

        if (props[propKey] && propKey != 'children' && !/^on[A-Za-z]/.test(propKey)) {
            tagOpen += ' ' + propKey + '=' + props[propKey];
        }
    }

    //获取子节点渲染出的内容
    var content = '';
    var children = props.children || {};
    var childrenInstances = [];
    var that = this;
    $.each(children, function (key, child) {
        var childComponentInstance = instantiateReactComponent(child);
        childComponentInstance._mountIndex = key;

        childrenInstances.push(childComponentInstance);
        var curRootID = that._rootNodeID + '.' + key;
        var childMakeUp = childComponentInstance.mountComponent(curRootID);
        content += ' ' + childMakeUp;
    })

    this._renderedChildren = childrenInstances;
    return tagOpen + '>' + content + tagClose
}


function ReactCompositeComponent(element) {
    this._currentElement = element;
    this._rootNodeID = null;
    this._instance = null;
}

ReactCompositeComponent.prototype.mountComponent = function (rootID) {
    this._rootNodeID = rootID;
    var publicProps = this._currentElement.props;
    var ReactClass = this._currentElement.type;
    var inst = new ReactClass(publicProps);
    this._instance = inst;
    inst._reactInternalInstance = this;
    if (inst.componentWillMount) {
        inst.componentWillMount();
    }
    var renderedElement = this._instance.render();
    var renderedComponentInstance = instantiateReactComponent(renderedElement);
    this._renderedCompoonent = renderedComponentInstance;
    var renderedMakeup = renderedComponentInstance.mountComponent(this._rootNodeID);

    $(document).on('mountReady', function () {
        inst.componentDidMount && inst.componentDidMount();
    });

    return renderedMakeup;
}



function instantiateReactComponent(node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return new ReactDOMTextComponent(node);
    }
    //浏览器默认节点
    if (typeof node === 'object' && typeof node.type === 'string') {
        return new ReactDOMComponent(node);
    }
    //自定义元素节点
    if (typeof node === 'object' && typeof node.type === 'function') {
        return new ReactCompositeComponent(node);
    }
}


var ReactClass = function () { };
ReactClass.prototype.render = function () { };



// React.render('hello world',document.getElementById('root'));

function ReactElement(type, key, props) {
    this.type = type;
    this.key = key;
    this.props = props;
}


var React = {
    nextReactRootIndex: 0,
    createClass: function (spec) {
        var Constructor = function (props) {
            this.props = props;
            this.state = this.getInitialState ? this.getInitialState() : null;
        }
        Constructor.prototype = new ReactClass();
        Constructor.prototype.constructor = Constructor;
        $.extend(Constructor.prototype, spec);
        return Constructor;
    },
    createElement: function (type, config, children) {
        var props = {};
        config = config || {};
        var key = config.key || null;

        for (var propName in config) {
            if (config.hasOwnProperty(propName) && propName !== 'key') {
                props[propName] = config[propName];
            }
        }

        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
            props.children = Array.isArray(children) ? children : [children];
        } else if (childrenLength > 1) {
            var childrenArray = new Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
                childrenArray[i] = arguments[i + 2];
            }
            props.children = childrenArray;
        }
        return new ReactElement(type, key, props);
    },
    render: function (element, container) {
        var that = this;
        var instanceComponent = instantiateReactComponent(element);
        var makeup = instanceComponent.mountComponent(that.nextReactRootIndex++);
        $(container).html(makeup);
        $(document).trigger('mountReady');
    }
}




function hello() {
    console.log('hello world')
}

// var element = React.createElement('div', { id: 'test', onclick: hello }, 'click me')

// React.render(element, document.getElementById("root"))

var HelloMessage = React.createClass({
    getInitialState: function () {
        return { type: 'say:' };
    },
    componentWillMount: function () {
        console.log('我就要开始渲染了。。。')
    },
    componentDidMount: function () {
        console.log('我已经渲染好了。。。')
    },
    render: function () {
        return React.createElement("div", null, this.state.type, "Hello ", this.props.name);
    }
});


React.render(React.createElement(HelloMessage, { name: "John" }), document.getElementById("root"));