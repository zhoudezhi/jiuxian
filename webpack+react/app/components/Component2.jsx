import React from 'react';

class Component2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="hello" onClick={this.props.updateStateProp}>
                Hello {this.props.name}!number={this.props.number}</div>
        )
    }

}
Component2.defaultProps = { name: 'Component2' };

//导出组件
export default Component2;
