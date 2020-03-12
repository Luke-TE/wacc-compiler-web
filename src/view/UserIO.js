import React from 'react'

class UserIO extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            programOutput: "",
            programInput: ""
        }
    }

    onInputChange = (evt) => {
        this.setState({programInput: evt.target.value})
    }

    onSubmitClick = (evt) => {
        this.setState((state, props) => ({
            programOutput: state.programInput
        }))
    }

    render() {
        return (
            <div className="userIO">
                <textarea value={this.state.programOutput} />

                <div className="userIO-input">
                    <input value={this.state.programInput} onChange={this.onInputChange}></input>
                    <button type="submit">submit</button>
                </div>
            </div>
        )
    }
}

export default UserIO;