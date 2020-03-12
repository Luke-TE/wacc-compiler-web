import React from 'react';

import Tree from 'react-d3-tree';

// Custom components
import ButtonStrip from './view/ButonStrip'
import CodeEditor from './view/CodeEditor'
import UserIO from './view/UserIO'

import {sendWaccCode, astMetaToGraphData} from './Comm'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      wacc: {code: "", markers: [],},
      js:   {code: "", markers: [],},
      arm:  {code: "", markers: [],},
      graphData: [{}],
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

  processWaccCode = (code) => {
    let rsp = sendWaccCode(code)
    let graph = astMetaToGraphData(rsp.astMeta)

    this.setState({
      arm: {code: rsp.armCode},
      js: {code: rsp.jsCode},
      graphData: graph
    })
  }

  render() {
    return (
      <div className="App">
        <ButtonStrip
          onCompileClick={(e) => { this.processWaccCode(this.state.wacc.code) }}
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
            data={this.state.graphData}
            orientation="vertical" />
        </div>

        <UserIO />
      </div>
    )
  }
}

export default App;
