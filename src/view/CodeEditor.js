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
            <div className="ace-editor">
                {this.heading()}
                <AceEditor
                    mode="java"
                    theme="github"
                    className="aceeditor"

                    onChange={(newValue) => {
                        if (this.props.onCodeChange !== undefined)
                            this.props.onCodeChange(newValue)
                    }}
                    value={this.props.value}
                    markers={this.props.markers}
                    readOnly={this.props.readOnly}

                    editorProps={{ $blockScrolling: true }} />
            </div>
        )
    };
}

export default CodeEditor