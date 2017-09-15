import React from 'react';
import Component2 from './Component2.jsx';
var myStyle = {
    fontSize: 20,
    color: '#FF0000'
};


class Component1 extends React.Component {

    constructor(props) {
        super(props);
        this.time();
        //this.hander = this.hander.bind(this);
        this.state = {
            number: 1
        }

    }



    componentWillMount() {
        console.log("页面渲染前调用");
    }

    componentDidMount() {
        console.log("第一次页面渲染后调用");

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('在组件完成更新后立即调用')
    }

    componentWillUpdate(prevProps, prevState) {
        console.log('在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用')
    }

    time() {
        var This = this;
        setInterval(function () {
            This.setState({number: This.state.number + 1});
        }, 1000)
    }

    hander() {
        this.setState({number: this.state.number + 1});
    }

    render() {
        var number = this.state.number
        return (
            <div className="main" ref="my" name={this.props.name} style={myStyle}>
                <Component2 number={number} name={this.props.name} updateStateProp={this.hander.bind(this)}/>
            </div>
        )

    }
}

//导出组件
export default Component1;
