import React from 'react';

class ButtonStrip extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button>COMPILE</button>
                <button>COMPILE</button>
                <button>STEP JS LINE</button>
                <button>STEP INTO AST NODE</button>
                <button>STEP OVER AST NODE</button>
            </div>
        )
    }
}

export default ButtonStrip