import React from 'react'

import OptionsButtons from './newElementButton-children/OptionsButtons'

const activeStyle = {
    float: "left",
    height: "17px",
    width: "30px",
    background: "#fef",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "0",
    margin: "1px",
    padding: "13px 0 0 0",
    border: "solid 1px #eef",
    fontWeight: "bold",
    cursor: "pointer"
}
const clickedActive = Object.assign({}, activeStyle, { transform: "rotate(45deg)" });
const inactiveStyle = Object.assign({}, activeStyle, { background: "#fff" });
const clickedInactive = Object.assign({}, inactiveStyle, { transform: "rotate(45deg)" })

class NewElementButton extends React.Component {
    constructor() {
        super()
        this.state = {
            currentStyle: inactiveStyle,
            clicked: false
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleMouseEnter() {
        if (!this.state.clicked) {
            this.setState({
                currentStyle: activeStyle
            })
        } else {
            this.setState({ currentStyle: clickedActive });
        }
    }

    handleMouseLeave() {
        if (!this.state.clicked) {
            this.setState({
                currentStyle: inactiveStyle
            })
        } else {
            this.setState({ currentStyle: clickedInactive });
        }
    }

    handleClick() {
        if (this.state.clicked) {
            this.setState({ clicked: false })
        } else {
            this.setState({
                clicked: (
                    <div><OptionsButtons
                        index={this.props.index}
                        newElementInPlace={this.props.newElementInPlace}
                        handleClose={this.handleClick}
                    /></div>),
                currentStyle: clickedInactive
            })
        }
    }

    render() {
        return (
            <div className="col-sm-12 col-md-6">
                <div style={this.state.currentStyle}
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}>+</div>
                {this.state.clicked || <div></div>}
            </div>
        )
    }
}

export default NewElementButton