import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

class CodeEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: "", markers: []}
    }

    heading() {
        if (this.props.heading !== undefined) {
            return <h1>{this.props.heading}</h1>
        }
    }

    onChange = (newValue) => {
        console.log("change", newValue);
        this.setState({
            value: newValue,
            markers: [{ startRow: 0, startCol: 2, endRow: 0, endCol: 20, className: 'warning', type: 'text' }]
        })
    }

    // Render editor
    render() {
        return (
            <div>
                {this.heading()}
                <AceEditor
                    mode="java"
                    theme="github"
                    value={this.state.value}
                    onChange={this.onChange}
                    name={this.props.name}
                    className="aceeditor"
                    markers={this.state.markers}
                    editorProps={{ $blockScrolling: true }} />
            </div>
        )
    };
}

export default CodeEditor