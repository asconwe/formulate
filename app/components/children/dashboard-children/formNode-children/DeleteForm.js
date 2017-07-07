import React from 'react'

import { HashRouter, Route, Link } from 'react-router-dom'

class DeleteForm extends React.Component {
    constructor() {
        super()

        this.handleCancel = this.handleCancel.bind(this);
    }



    handleClick() { 
        axios.delete('api/delete', { data: { _id: this.props._id } });
    }    

    handleCancel() { 
        this.props.cancelDelete();
    }

    render() {
        return (
            <div>
                <p>Are you sure you want to delete this form?</p>
                <div className="button-group">
                    <button onClick={this.handleClick}>
                        <span>Yes</span>
                    </button>
                    <button onClick={this.handleCancel}>
                        <span>Cancel</span>    
                    </button>
                </div>
            </div>
        )
    }
}

export default DeleteForm