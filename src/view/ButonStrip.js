import React from 'react';
import Button from "../components/CustomButtons/Button";

class ButtonStrip extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Button onClick={this.props.onCompileClick}>COMPILE</Button>
                <Button onClick={this.props.onExecuteClick}>EXECUTE</Button>
                <Button onClick={this.props.onStepWaccClick}>STEP WACC LINE</Button>
            </div>
        )
    }
}

export default ButtonStrip