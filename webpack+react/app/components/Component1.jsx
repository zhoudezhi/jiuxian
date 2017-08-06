import React from 'react';
import Component2 from './Component2.jsx';
var myStyle = {
    fontSize: 20,
    color: '#FF0000'
};

var Component1 = React.createClass({
    getDefaultProps: function() {
        return {
            name: 'Runoob'
        };
    },
    componentWillMount:function () {
        console.log("页面渲染前调用");
    },

    componentDidMount:function () {
        console.log("第一次页面渲染后调用");

    },
    componentDidUpdate:function(prevProps, prevState) {
        console.log('在组件完成更新后立即调用')
    },
    componentWillUpdate:function(prevProps, prevState) {
        console.log('在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用')
    },
    getInitialState:function () {
        this.time();
        return {
            number:1
        }
    },

    time:function () {
        var This = this;
        setInterval(function () {
            This.setState({number:This.state.number + 1});
        },1000)
    },

    hander:function () {
        this.setState({number:this.state.number + 1});
    },
    render: function () {
        var number = this.state.number
        return (
            <div className="main" ref="my" style={myStyle} >
                <Component2   number = {number}   updateStateProp = {this.hander}/>
            </div>
        )

    }
})

//导出组件
export default Component1;
