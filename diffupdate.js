ReactClass.prototype.setState = function(newState){
    this._reactInternalInstance.receiveComponent(null,newState);
}


ReactCompositeComponent.prototype.receiveComponent = function(nextElement,newState){
    this._currentElement = nextElement || this._currentElement;
    var inst = this._instance;
    var nextState = $.extend(inst.state,newState);
    var nextProps = this._currentElement.props;
    inst.state = newState;
    if(inst.shouldComponentUpdate&&(inst.shouldComponentUpdate(nextProps,nextState)===false)){
        return;
    }
    if(inst.componentWillUpdate){
        inst.componentWillUpdate(nextProps,nextState);
    }

    var prevComponentInstance = this._renderedComponent;
    var prevRenderedElement = prevComponentInstance._currentElement;
    var nextRenderedElement = this._instance.render();
    if(_shouldUpdateReactComponent(prevComponentElement,nextComponentElement)){
        prevComponentInstance.receiveComponent(nextRenderedElement);
        inst.componentDidUpdate && inst.componentDidUpdate();
    }else {
        var thisID = this._rootNodeID;
        this._renderedComponent = this.instantiateReactComponent(nextRenderedElement);
        var nextMarkup = _renderedComponent.mountComponent(thisID);
        $('[data-reactid="'+this._rootNodeID+'"]').replaceWith(nextMarkup);
    }
}


function _shouldUpdateReactComponent(prevElement,nextElement){
    if(prevElement!=null&&nextElement!=null){
        var prevType = typeof prevElement;
        var nextType = typeof nextElement;
        if(prevType==='string'||prevType==='number'){
            return nextType === 'string' || nextType==='number';
        }else {
            return nextType === 'object'&& prevElement.type === nextElement.type&&prevElement.key === nextElement.key;
        }
    }

    return false;
}


ReactDOMTextComponent.prototype.receiveComponent = function(nextText){
    var nextStringText = '' + nextText;
    if(nextStringText !== this._currentElement){
        this._currentElement = nextStringText;
        $('[data-reactid="'+ this._rootNodeID +'"]').html(this._currentElement);
    }
}


ReactDOMComponent.prototype.receiveComponent = function(nextElement){
    var lastProps = this._currentElement.props;
    var nextProps = nextElement.props;
    this._currentElement = nextElement;
    this._updateDOMProperties(lastProps,nextProps);
    this._updateDOMChildren(nextElement.props.children);

}

ReactDOMComponent.prototype._updateDOMProperties = function(lastProps,nextProps){
    for(var propKey in lastProps){
        if(nextProps.hasOwnproperty(propKey) || !lastProps.hasOwnproperty(propKey)){
            continue;
        }

        if(/^on[A-Za-z]/.test(propKey)){
            var eventType = propKey.replace('on','');
            $(document).undelegate('[data-reactid="'+this._rootNodeID+'"]',eventType,lastProps[propsKey]);
            continue;
        }

        $('[data-reactid="'+this._rootNodeID+'"]').removeAttr(propKey);
    }


    for(var propKey in nextProps){
        if(/^on[A-Za-z]/.test(propKey)){
            var eventType = propKey.replace('on','');
            lastProps[propKey] && $(document).undelegate('[data-reactid="'+this._rootNodeID+'"]',eventType,lastProps[propsKey]);

            $(document).delegate('[data-reactid="'+this._rootNodeID+'"]',eventType+'.'+this._rootNodeID,nextProps[propKey]);
            continue;

        }

        if(propKey == 'children'){
            continue;
        }

        $('[data-reactid="'+this._rootNodeID+'"]').prop(propKey,nextProps[propKey]);
    }
}





/* var HelloMessage = React.createClass({
    getInitialState: function () {
        return { type: 'say:' };
    },
    componentWillMount: function () {
        console.log('我就要开始渲染了。。。')
    },
    changeType:function(){
        this.setState({type:'shout'})
    },
    componentDidMount: function () {
        console.log('我已经渲染好了。。。')
    },
    render: function () {
        return React.createElement("div", {onClick=this.changeType}, this.state.type, "Hello ", this.props.name);
    }
});


React.render(React.createElement(HelloMessage, { name: "John" }), document.getElementById("root")); */