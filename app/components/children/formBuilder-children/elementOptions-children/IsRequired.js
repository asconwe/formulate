import React, { Component } from 'react';

class IsRequired extends Component {
    render() {
        return (
            <div>
                <div class="input-group">
                    <input type="checkbox" id="check1" tabindex="0" />
                    <label for="check1">Checkbox</label>
                </div>
            </div>
        );
    }
}

export default IsRequired;