import React from 'react';

const modalStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    paddingTop: '100px'
}

const Modal = ({content, elements, closeModal}) => {
    return (
        <div style={modalStyle} onClick={closeModal}>
            <div style={{position: 'relative'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1 bordered rounded" style={{background: 'white', paddingBottom: '50px'}}>
                            <p style={{ textAlign: 'center', color: 'grey' }}><small>click anywhere to close</small></p>
                            <h2>{content.user}</h2>
                            {content.response.map((response, index) => {
                            return (
                                <span key={index}>
                                    <h3>{elements[index].elementTitle}
                                        <small>{elements[index].elementPrompt}</small>
                                    </h3>
                                    <p style={{borderLeft: 'solid 1px black', paddingLeft: '10px'}}>{response}</p>
                                </span>
                            )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;