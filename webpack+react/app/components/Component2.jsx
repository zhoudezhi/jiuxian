import React from 'react';


var Component2 = React.createClass({
    getDefaultProps: function() {
        return {
            name: 'Runoob'
        };
    },
    render:function () {
        return (
            <div className="hello" onClick={this.props.updateStateProp} >Hello {this.props.name}!number={this.props.number}</div>
        )
    }
})

//导出组件
export default Component2;
