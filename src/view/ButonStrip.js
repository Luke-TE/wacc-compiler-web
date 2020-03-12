import React from 'react';

class ButtonStrip extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button onClick={this.props.onCompileClick}>▶</button>
                <button onClick={this.props.onStepJsClick}>STEP JS LINE</button>
                <button onClick={this.props.onStepIntoAstClick}>STEP INTO AST NODE</button>
                <button onClick={this.props.onStepOverAstClick}>STEP OVER AST NODE</button>
            </div>
        )
    }
}

export default ButtonStrip