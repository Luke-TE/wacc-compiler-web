import React from 'react';

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

        <UserIO />
      </div>
    )
  }
}

export default App;
