import React from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
         
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Dashboard</h1>
                        <Link to='/form-builder/new/form'><button>+ New Form</button></Link>
                    </div>  
                    
                        {this.props.forms.map((form, index) => (
                            <div className="col-sm-6 col-md-4 col-lg-3" >
                            <div className="bordered">
                                <Link to={`/form-builder/edit/${form._Id}`} key={index}>
                                        <h3>{form.formTitle}</h3>
                                    {console.log(form)}
                                </Link>
                            </div>
                            </div>
                            ))
                        }
                    
                </div>
            </div>
        )
    }
}

export default Dashboard