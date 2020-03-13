import React from 'react';
import Button from "../components/CustomButtons/Button";

class ButtonStrip extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Button onClick={this.props.onCompileClick}>▶</Button>
                <Button onClick={this.props.onStepJsClick}>STEP JS LINE</Button>
                <Button onClick={this.props.onStepIntoAstClick}>STEP INTO AST NODE</Button>
                <Button onClick={this.props.onStepOverAstClick}>STEP OVER AST NODE</Button>
            </div>
        )
    }
}

export default ButtonStrip