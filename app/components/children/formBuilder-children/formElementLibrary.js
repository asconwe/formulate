import React from 'react'

// Components
import TextareaElement from './elementLibrary/TextareaElement'
// import InputTextElement from './formElement-children/formElementContent-children/InputTextElement'

const formElementLibrary = {
    textarea: {
        getter: (props) => {
            return <TextareaElement props={props} />
        },
        name: 'textarea',
        nickName: "Big Text",
        size: "6"
    },
    // text: {
    //     getter: (props) => {
    //         return <InputTextElement props={props} />
    //     },
    //     name: 'text',
    //     nickName: "Small Text",
    //     size: "2"
    // }    
}

export default formElementLibrary