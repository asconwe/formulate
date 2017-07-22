import React from 'react'

// Components
import OutsiderTextareaElement from './outsiderElement-children/OutsiderTextareaElement'
import OutsiderInputTextElement from './outsiderElement-children/OutsiderInputTextElement'

const outsiderElementLibrary = {
    textarea: {
        getter: (props) => {
            return <OutsiderTextareaElement props={props} />
        },
        name: 'textarea'
    },
    text: {
        getter: (props) => {
            return <OutsiderInputTextElement props={props} />
        },
        name: 'text'
    }    
}

export default outsiderElementLibrary