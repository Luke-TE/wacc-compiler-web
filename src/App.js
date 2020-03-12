import React from 'react';

import Tree from 'react-d3-tree';

// Custom components
import ButtonStrip from './view/ButonStrip'
import CodeEditor from './view/CodeEditor'
import UserIO from './view/UserIO'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      wacc: {
        code: "",
        markers: [],
      },
      js: {
        code: "",
        markers: [],
      },
      arm: {
        code: "",
        markers: [],
      }
    }
  }

  onWaccCodeChange = (newCode) => {
    this.setState({
      wacc: {
        code: newCode,
        markers: [{ startRow: 0, startCol: 2, endRow: 0, endCol: 20, className: 'warning', type: 'text' }]
      }
    })
  }

  render() {
    return (
      <div className="App">
        <ButtonStrip
          onCompileClick={(e) => { alert("Compiling wacc\n\"" + this.state.wacc.code + "\"") }}
          onStepJsClick={(e) => { this.setState({js: {code: "Hello World!"}}) }} />

        <div className="App-code-editors">
          <CodeEditor
            heading='WACC Code'
            onCodeChange={this.onWaccCodeChange}
            value={this.state.wacc.code}
            markers={this.state.wacc.markers} />
          <CodeEditor
            heading='JavaScript'
            value={this.state.js.code}
            markers={this.state.js.markers} />
          <CodeEditor
            heading='ARM Assembly'
            value={this.state.arm.code}
            markers={this.state.arm.markers} />
        </div>

        <div id="treeWrapper" style={{ width: '50em', height: '20em', background: 'white' }}>
          <Tree
            data={testGraphData}
            orientation="vertical" />
        </div>

        <UserIO />
      </div>
    )
  }
}

const testGraphData = [{
  name: "WACC Program", children: [{
    name: "BinOP", attributes: { operation: "Add" },
    children: [{ name: "Const", attributes: { value: "1" } }, { name: "VarIdent", attributes: { ident: "x" } }]
  }]
}];


export default App;
