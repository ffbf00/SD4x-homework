class FontChooser extends React.Component {

    constructor(props) {
        super(props);
        
        var min = (parseInt(this.props.min) > 0) ? parseInt(this.props.min) : 1;
        var max = (parseInt(this.props.max) > min) ? parseInt(this.props.max) : min;
        var size = parseInt(this.props.size);
        if (size < min) { size = min; }
        if (size > max) { size = max; }
        
        this.state = {hidden: true, bold: this.props.bold == 'true', size: size, min: min, max: max};
        
    }
    
    toggleDisplay() {
        this.setState({hidden: !this.state.hidden});
    }
    
    setBold() {
        this.setState({bold: !this.state.bold});
    }
    
    decreaseSize() {
        if (this.state.size > this.state.min) {
            this.setState({size: this.state.size-1});
        }
    }
    
    increaseSize() {
        if (this.state.size < this.state.max) {
            this.setState({size: this.state.size+1});
        }
    }
    
    defaultSize() {
        this.setState({size: parseInt(this.props.size)});
    }

    render() {
        var weight = this.state.bold ? 'bold' : 'normal';
        var colour = (this.state.size == this.state.max || this.state.size == this.state.min) ? 'red' : 'black';
        
        return(
            <div>
            <input type="checkbox" id="boldCheckbox" hidden={this.state.hidden} defaultChecked={this.state.bold} onChange={this.setBold.bind(this)} />
            <button id="decreaseButton" hidden={this.state.hidden} onClick={this.decreaseSize.bind(this)}>-</button>
            <span id="fontSizeSpan" hidden={this.state.hidden} style={{color: colour}} onDoubleClick={this.defaultSize.bind(this)}>{this.state.size}</span>
            <button id="increaseButton" hidden={this.state.hidden} onClick={this.increaseSize.bind(this)}>+</button>
            <span id="textSpan" style={{fontWeight: weight, fontSize: this.state.size}} onClick={this.toggleDisplay.bind(this)}>{this.props.text}</span>
            </div>
        );
    }
}

