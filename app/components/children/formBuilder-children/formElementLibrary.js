import React from 'react'

// Components
import TextareaElement from './elementLibrary/TextareaElement'
import Spacer from './formElement-children/formElementContent-children/Spacer'
import NumberElement from './formElement-children/formElementContent-children/Number'

const formElementLibrary = {
    textarea: {
        getter: (props) => {
            return <TextareaElement props={props} />
        },
        name: 'textarea',
        nickName: "Big Text",
        size: "6"
    },
    spacer: {
        getter: (props) => {
            return <Spacer props={props} />
        },
        name: 'spacer',
        nickName: "Spacer",
        size: "2"
    },
    number: {
        getter: (props) => {
            return <Spacer props={props} />
        },
        name: 'number',
        nickName: "Number",
        size: "2"
    }, 
}

export default formElementLibrary