import React, { Component } from 'react';

const horizontal = {
    width: "100%",
    height: "15px"
}

const vertical = {
    width: "15px",
    height: "100%",
    flex: "0 0 15px",
    margin: 0,
    padding: 0
}

const edge = {
    boxSizing: "border-box",
    border: "solid 1px grey"
}

const content = {
    flexGrow: 1
}

const container = {
    width: "100%",
    display: "flex",
    xJustifyFontent: "space-around",
    xAlignItems: "stretch",
    maxWidth: "1200px"
}

class FormElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            size: "6"
        }
        this.hoverIn = this.hoverIn.bind(this);
        this.hoverOut = this.hoverOut.bind(this);
        this.enter = this.enter.bind(this);
        this.exit = this.exit.bind(this);
    }

    componentDidMount() {
        this.setState({
            size: this.props.size
        })
    }


    hoverIn() {
        console.log("in")
        this.setState({
            active: true
        })
    }

    hoverOut() {
        this.setState({
            active: false
        })
    }

    enter(event) {
        if (this.state.active) {
            console.log(event.target);
        }
    }

    exit() {

    }

    handleDrag(event) {
        console.log(event.pageX)
    }

    render() {
        return (
                <div className={`col-sm-12 col-md-${this.state.size}`} onMouseEnter={this.hoverIn} onMouseLeave={this.hoverOut}>
                    <div style={container} className="row">
                        <div draggable="true" data-position="top" style={Object.assign({}, horizontal, edge)} onDrag={this.handleDrag} onMouseEnter={this.enter} onMouseLeave={this.exit} className="col-sm-12"></div>
                        <div style={container} onMouseEnter={this.enter} onMouseLeave={this.exit}>
                            <div data-position="left" style={Object.assign({}, vertical, edge)} onDrag={this.handleDrag} ></div>
                            <div style={content}>content</div>
                            <div data-position="right" style={Object.assign({}, vertical, edge)} onDrag={this.handleDrag} ></div>
                        </div>
                        <div data-position="bottom" style={Object.assign({}, horizontal, edge)} onDrag={this.handleDrag}  onMouseEnter={this.enter} onMouseLeave={this.exit} className="col-sm-12"></div>
                    </div>
                </div>
        );
    }
}

export default FormElement;