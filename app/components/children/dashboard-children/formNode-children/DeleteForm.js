import React from 'react';

import axios from 'axios';

class DeleteForm extends React.Component {
    constructor() {
        super();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() { 
        axios.delete(`api/delete/${this.props._id}`).then((response) => {
            this.props.getUserForms();
        }).catch((err) => {
            console.log(err);
        });
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