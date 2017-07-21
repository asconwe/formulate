import React from 'react';

class SectionPrompt extends React.Component {
    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleBlur(event) {
        const content = { [event.target.dataset.contentkey]: event.target.textContent }
        this.props.editElement(this.props.index, content);
    }

    clear(event) {
        this.props.editElement(this.props.index, { [this.props.contentKey]: "" })
    }

    focus(event) {
        if (event.target.children.length > 1) {
            event.target.children[0].focus();
        }
    }

    render() {
        const inherit = {
            fontSize: 'inherit',
        }
        const inheritOuter = Object.assign({}, inherit, { borderBottom: "solid 1px grey", cursor: 'text' })
        return (
            <span style={inheritOuter} onClick={this.focus} >
                <span contentEditable suppressContentEditableWarning style={inherit} data-contentKey={this.props.contentKey} onBlur={this.handleBlur}>
                    {this.props.value}
                </span><button className="close small" style={{
                    fontSize: "17px",
                    color: 'grey',
                    borderRadius: "50%",
                    lineHeight: 0,
                    width: '25px',
                    height: '25px',
                    verticalAlign: 'middle',
                    cursor: 'pointer',
                    marginRight: "-7px"
                }} onClick={this.clear} />
            </span>
        );
    }
}

export default SectionPrompt;