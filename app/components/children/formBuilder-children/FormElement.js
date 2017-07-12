import React, { Component } from 'react';

const horizontal = {
    width: "100%",
    height: "15px",
    margin: 0,
    padding: 0,
    display: "flex",
    xJustifyFontent: "space-around",
    xAlignItems: "stretch",
    maxWidth: "1200px"
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
}

const content = {
    flexGrow: 1
}

const middle = {
    width: "100%",
    display: "flex",
    xJustifyFontent: "space-around",
    xAlignItems: "stretch",
    maxWidth: "1200px",
    background: "#edecff",
}

const container = Object.assign({}, middle, { marginBottom: "10px" });

const activeStyle = {
    background: "grey"
}

const inactiveStyle = {
    background: "none"
}

class FormElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            size: "6",
            top: inactiveStyle,
            right: inactiveStyle,
            bottom: inactiveStyle,
            left: inactiveStyle,
            dragStart: undefined
        }
        this.hoverIn = this.hoverIn.bind(this);
        this.hoverOut = this.hoverOut.bind(this);
        this.enter = this.enter.bind(this);
        this.exit = this.exit.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
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
        console.log(event.target.dataset.position)
        const newState = {};
        newState[event.target.dataset.position] = activeStyle;
        this.setState( newState );
    }

    exit(event) {
        const newState = {};
        newState[event.target.dataset.position] = inactiveStyle;
        this.setState( newState );
    }
    
    handleDrag(event) {
        const oneTwelfth = window.innerWidth * 10 / 12 / 12
        const currentSize = parseInt(this.state.size);
        if (event.target.dataset.position === "right") {
            if (event.type === "drag") {
                const difference = event.pageX - this.state.dragStart;
                if (difference > oneTwelfth) {
                    this.setState({ size: currentSize - 1 })
                }
            } else if (event.type === "dragstart") {
                this.setState({ dragStart: event.pageX})
            }
        }   
    }

  

    render() {
        return (
                <div className={`col-sm-12 col-md-${this.state.size}`} onMouseEnter={this.hoverIn} onMouseLeave={this.hoverOut}>
                    <div style={container} className="row">
                        <div data-position="top" style={Object.assign({}, horizontal, edge, this.state.top)} onMouseEnter={this.enter} onMouseLeave={this.exit} className="col-sm-12">
                            <div data-position="top" style={Object.assign({}, vertical, edge, this.state.left)}></div>
                            <div data-position="top" style={content}></div>
                            <div data-position="top" style={Object.assign({}, vertical, edge, this.state.right)}></div>
                        </div>
                        <div style={middle}>
                            <div data-position="left" style={Object.assign({}, vertical, edge, this.state.left)} onMouseEnter={this.enter} onMouseLeave={this.exit}></div>
                            <div style={content}>content</div>
                            <div data-position="right" style={Object.assign({}, vertical, edge, this.state.right)} onMouseEnter={this.enter} onMouseLeave={this.exit} draggable="true" onDrag={this.handleDrag} onDragStart={this.handleDrag}></div>
                        </div>
                        <div data-position="bottom" style={Object.assign({}, horizontal, edge, this.state.bottom)} onMouseEnter={this.enter} onMouseLeave={this.exit} className="col-sm-12">
                            <div data-position="bottom" style={Object.assign({}, vertical, edge, this.state.left)}></div>
                            <div data-position="bottom" style={content}></div>
                            <div data-position="bottom" style={Object.assign({}, vertical, edge, this.state.right)}></div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default FormElement;