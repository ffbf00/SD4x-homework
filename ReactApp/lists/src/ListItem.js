import React, { Component } from 'react';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = { color: 'black' };
    }

    handleClick() {
        let color = (this.state.color === 'black') ? 'gray' : 'black';
        this.setState({color: color});
    }

  render() {
    var item = this.props.item;
    var name = item.name;

    return (
	    <span onClick={this.handleClick.bind(this)} style={{color: this.state.color}}>
        <strong>{name}</strong>
        </span>
    );

  }

}
export default ListItem;

