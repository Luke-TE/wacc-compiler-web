import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

class CodeEditor extends React.Component {
    heading() {
        if (this.props.heading !== undefined) {
            return <h1>{this.props.heading}</h1>
        }
    }

    onChange(newValue) {
        console.log("change", newValue);
    }

    // Render editor
    render() {
        return (
            <div>
                {this.heading()}

                <AceEditor
                    mode="java"
                    theme="github"
                    onChange={this.onChange}
                    name={this.props.name}
                    className="aceeditor"
                    editorProps={{ $blockScrolling: true }}
                />
            </div>
        )
    };
}

export default CodeEditor