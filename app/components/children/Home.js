import React from 'react'

import { Link } from 'react-router-dom'

// <div className="col-sm-6 col-md">
//     <h1>Formulate</h1>
                    
//     <h2 id="form-builder-response-manager">Form builder, response manager</h2>
            
//     <p>Formulate is a streamlined form-builder and response-manager, designed to make the process of sharing surveys or soliciting applications a breeze for everyone involved. Organizations can easily build custom forms and view, manage, and analyze responses, while, on the other end, users just fill out and click submit. Gone are the days of the emailed PDF that the user forgot to save before they sent back.</p>
               
//     <Link to='/login'><button className="home-button">Log in</button></Link>
//     <Link to='/signup'><button className="home-button">Sign up</button></Link>
// </div>   

class Home extends React.Component {
    constructor() {
        super();

    }

    componentWillMount() {
        //Check if logged in and redirect 
    }

    render() {
        return (
            <div>
                <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                    <div className="container">
                        <div style={{display: 'inline-block', width: '100%', background: "linear-gradient(45deg, #eef, #ecc)"}}>
                                <img src="/logosmall.svg" alt="Formulate logo" style={{postition: 'relative', zIndex: '999', float: 'left', maxWidth: '100px', padding: '12px', verticalAlign: 'middle'}}/>
                                <h1 style={{ background: "linear-gradient(-45deg, #eef, #ecc)", color: "linear-gradient(-45deg, #445, #332)", orderRadius: '3px', display: 'inline-block', fontSize: '50px', verticalAlign: 'middle',  textAlign: 'center' }}>Formulate</h1>
                                
                            
                        </div>
                        <div className="row">
                            <div className="col-sm-10 col-sm-offset-1" style={{ marginTop: '-20px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '3px', paddignTop: '30px'}}>
                                                    
                                    <h2 id="form-builder-response-manager">Form builder, response manager</h2>
                                            
                                    <p>Formulate is a streamlined form-builder and response-manager, designed to make the process of sharing surveys or soliciting applications a breeze for everyone involved. Organizations can easily build custom forms and view, manage, and analyze responses, while, on the other end, users just fill out and click submit. Gone are the days of the emailed PDF that the user forgot to save before they sent back.</p>
                                               
                                    <Link to='/login'><button className="home-button">Log in</button></Link>
                                    <Link to='/signup'><button className="home-button">Sign up</button></Link>
                                
                            </div>                   
                        </div>      
                    </div>
                </div>
            </div>
        );
    }
}

export default Home