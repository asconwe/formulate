import React from 'react';

const modalStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    background: 'rgba(50, 50, 50, 0.9)',
}

const fullHeight = {
    height: '100%'
};

const innerModal = {
    position: 'relative', 
    margin: '50px auto',
    background: 'white', 
    paddingBottom: '50px', 
    overflowY: 'auto'
}

const handleScroll = (event) => {
     console.log(event);
     event.stopPropagation();
}

const Modal = ({content, elements, closeModal}) => {
    return (
        <div style={modalStyle} onScroll={handleScroll} onClick={closeModal}>
            <div style={fullHeight}>
                <div style={fullHeight} className="container">
                    <div style={fullHeight} className="row">
                        <div className="col-sm-10 col-sm-offset-1 bordered rounded" style={innerModal}>
                            <p style={{ textAlign: 'center', color: 'grey' }}><small>click anywhere to close</small></p>
                            <h2>{content.user}</h2>
                            {content.response.content.map((response, index) => {
                            return (
                                <span key={index}>
                                    <h3>{elements[index].elementTitle}
                                        <small>{elements[index].elementPrompt}</small>
                                    </h3>
                                    <p style={{borderLeft: 'solid 1px black', paddingLeft: '10px', background: '#eef'}}>{response}</p>
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