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

                <div style={{ position: 'absolute', overflow: 'hidden', width: '100%', top: '47px', left: 0, background: 'linear-gradient(45deg, #ebc, #eef, #ebe)', display: 'block' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-10 col-md-offset-1">
                                <img src="logo.svg" alt="Formulate logo" style={{ margin: '66px 20px', width: '100px', display: 'inline', float: 'left' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container" style={{ marginTop: '300px'}}>
                    <div className="row">
                        <div className="col-sm-12 col-md-10 col-md-offset-1" style={{ background: 'white', height: 'auto', borderRadius: '3px',  paddingBottom: '30px'  }}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <br />
                                </div>
                                <div className="col-sm-6">
                                    <h2>Send better forms --> Get better answers</h2>
                                    <p>Formulate is a streamlined form-builder and response-manager, designed to make the process of sharing surveys or soliciting applications a breeze for everyone involved. Organizations can easily build custom forms and view, manage, and analyze responses, while, on the other end, users just fill out and click submit. Gone are the days of the emailed PDF that the user forgot to save before they sent back.</p>
                                    <h2>Get Started today! <button>Sign up</button></h2>
                                </div>
                                <div className="col-sm-6 col-md-4 col-md-offset-1" style={{borderLeft: 'solid 1px #ddf'}}>
                                    <h2>No more mail-merge<small>Let Formulate send forms for you</small></h2>
                                    <h2>Don't let your applicants work double<small>No last data with auto saving responses</small></h2>
                                    <h2>Dont worry about your image <small>Formulate forms are handsome and professional</small></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home