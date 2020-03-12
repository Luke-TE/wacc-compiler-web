import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

class CodeEditor extends React.Component {
    constructor(props) {
        super(props)
    }

    heading = () => {
        if (this.props.heading !== undefined) {
            return <h1>{this.props.heading}</h1>
        }
    }

    // Render editor
    render() {
        return (
            <div>
                {this.heading()}
                <AceEditor
                    mode="java"
                    theme="github"
                    className="aceeditor"

                    onChange={(newValue) => {
                        this.props.onCodeChange(newValue)
                    }}
                    value={this.props.value}
                    markers={this.props.markers}

                    editorProps={{ $blockScrolling: true }} />
            </div>
        )
    };
}

export default CodeEditor