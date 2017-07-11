import React from 'react'

import OptionsButtons from './newElementButton-children/OptionsButtons'

class NewElementButton extends React.Component {
    constructor() {
        super()
        this.state = {
            active: false
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() { 
        console.log(this.props.index)
        this.setState({
            active: <OptionsButtons
                newElementInPlace={this.props.newElementInPlace}
                index={this.props.index}
            />
        })
    }

    handleMouseLeave() {
        this.setState({
            active: false
        })
    }

    render() {
        return (
            <div className="col-sm-12 col-md-6" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                {this.state.active || <div><span style={{ lineHeight: "30px" }}>+</span></div>}
            </div>
        )
    }
}

export default NewElementButton