import React from 'react';

import Tree from 'react-d3-tree';

// Custom components
import ButtonStrip from './view/ButonStrip'
import CodeEditor from './view/CodeEditor'
import Terminal from 'terminal-in-react';

import Card from "./components/Card/Card.js";
import CardBody from "./components/Card/CardBody.js";
import {sendWaccCode, astMetaToGraphData} from './Comm'
import GridItem from "./components/Grid/GridItem";
import GridContainer from "./components/Grid/GridContainer";

import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            wacc: {code: "", markers: [],},
            js: {code: "", markers: [],},
            arm: {code: "", markers: [],},
            graphData: [{}],
            consoleReset: 0
        }
    }

    onWaccCodeChange = (newCode) => {
        this.setState({
            wacc: {code: newCode, markers: []},
            js: {code: "", markers: []},
            arm: {code: "", markers: []},
            graphData: [{}],
        })
    }

    onNodeOver = (nodeData, evt) => {
      let hl = nodeData.highlighting;

      this.setState((state, props) => {
          state.wacc.markers = hl.wacc;
          state.js.markers = hl.js;
          state.arm.markers = hl.arm;

          return state
      })
    }

    onNodeOut = (nodeData, evt) => {
    }

    readInputCallBack = (codeToEval) => {
        eval(codeToEval);
        window.EMULATOR_CONSOLE_READ = () => { return window.prompt()};
    };

    clearConsole = () => {
        this.setState({consoleReset: this.state.consoleReset + 1})
    }

    processWaccCode = async (code) => {
        eval("waccPrintingBuffer = ''")

        let rsp = await sendWaccCode(code);
        let graph = this.state.graphData;
        if (typeof rsp.isError !== "undefined") {

        } else {
            graph = astMetaToGraphData(rsp.astMeta);
            this.setState({
                arm: {code: rsp.armCode},
                js: {code: rsp.jsCode},
                graphData: graph
            })
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-code-editors">
                    <GridContainer>
                        <GridItem lg={12}>
                            <Card>
                                <CardBody>
                                    <ButtonStrip
                                        onCompileClick={(e) => {
                                            this.processWaccCode(this.state.wacc.code)
                                            this.clearConsole()
                                        }}
                                        onExecuteClick={(e) => {
                                            eval(this.state.js.code)
                                            eval("waccPrintFinished()")
                                        }}
                                        onStepWaccClick={(e) => {
                                            this.readInputCallBack(e)
                                        }}
                                    />
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                                <CardBody>
                                    <CodeEditor
                                        heading='WACC Code'
                                        onCodeChange={this.onWaccCodeChange}
                                        value={this.state.wacc.code}
                                        markers={this.state.wacc.markers}/>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>

                            <Card>
                                <CardBody>
                                    <CodeEditor
                                        heading='JavaScript'
                                        value={this.state.js.code}
                                        markers={this.state.js.markers}
                                        readOnly={true}/>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                                <CardBody>
                                    <CodeEditor
                                        heading='ARM Assembly'
                                        value={this.state.arm.code}
                                        markers={this.state.arm.markers}
                                        readOnly={true}/>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                            <Card>
                                <CardBody>
                                    <div style={{height: '50em'}}>
                                        <Tree
                                            collapsible={false}
                                            data={this.state.graphData}
                                            onMouseOver={this.onNodeOver}
                                            onMouseOut={this.onNodeOut}
                                            orientation="vertical"/>
                                    </div>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card>
                                <CardBody>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "50em"
                                        }}
                                    >
                                        <Terminal commandPassThrough={cmd => {
                                            window.EMULATOR_CONSOLE_READ = () => {return cmd[0]};
                                            window.EMULATOR_IS_INPUT = true;
                                        }} watchConsoleLogging hideTopBar allowTabs={false} key={this.state.consoleReset}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </GridItem>

                    </GridContainer>
                </div>
            </div>
        )
    }
}

export default App;
