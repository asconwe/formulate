import React from 'react'

// Components
import TextareaElement from './formElement-children/TextareaElement'
import InputTextElement from './formElement-children/InputTextElement'

const formElementLibrary = {
    textarea: {
        getter: (props) => {
            return <TextareaElement props={props} />
        },
        name: 'textarea'
    },
    text: {
        getter: (props) => {
            return <InputTextElement props={props} />
        },
        name: 'text'
    }    
}

export default formElementLibrary