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
  }

  render() {
    return (
      <div className="App">
        <ButtonStrip />

        <div className="App-code-editors">
          <CodeEditor
            heading='WACC Code'
            name='wacc_edit' />
          <CodeEditor
            heading='JavaScript'
            name='js_edit' />
          <CodeEditor
            heading='ARM Assembly'
            name='arm_edit'/>
        </div>

        <div id="treeWrapper" style={{width: '50em', height: '20em', background: 'white'}}>
          <Tree
            data={testGraphData}
            orientation="vertical" />
        </div>

        <UserIO />
      </div>
    )
  }
}

const testGraphData=[{name:"WACC Program",children:[{name:"BinOP",attributes:{operation:"Add"},
                      children:[{name:"Const",attributes:{value:"1"}},{name:"VarIdent",attributes:{ident:"x"}}]}]}];


export default App;
