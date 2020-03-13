import React from 'react';

import Tree from 'react-d3-tree';

// Custom components
import ButtonStrip from './view/ButonStrip'
import CodeEditor from './view/CodeEditor'
import UserIO from './view/UserIO'
import Terminal from 'terminal-in-react';
import {makeStyles} from "@material-ui/core/styles";

import Card from "./components/Card/Card.js";
import CardBody from "./components/Card/CardBody.js";
import {sendWaccCode, astMetaToGraphData} from './Comm'
import GridItem from "./components/Grid/GridItem";
import GridContainer from "./components/Grid/GridContainer";

const cardImagesStyles = {
    cardImgTop: {
        width: "100%",
        borderTopLeftRadius: "calc(.25rem - 1px)",
        borderTopRightRadius: "calc(.25rem - 1px)"
    },
    cardImgBottom: {
        width: "100%",
        borderBottomRightRadius: "calc(.25rem - 1px)",
        borderBottomLeftRadius: "calc(.25rem - 1px)"
    },
    cardImgOverlay: {
        position: "absolute",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        padding: "1.25rem"
    },
    cardImg: {
        width: "100%",
        borderRadius: "calc(.25rem - 1px)"
    }
};
const useStyles = makeStyles(cardImagesStyles);

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
            wacc: {
                code: newCode,
                markers: [{startRow: 0, startCol: 2, endRow: 0, endCol: 20, className: 'warning-highlight', type: 'text'}]
            },
            graphData: [{}],
        })
    }

    onNodeOver = (nodeData, evt) => {
      let hl = nodeData.highlighting;

      this.setState((state, props) => {
          let armMarkers = state.arm.markers;
          hl.arm.array.forEach(element => armMarkers.append(element))

          return {
            wacc: {markers: state.wacc.markers.append(hl.wacc)},
            js: {markers: state.js.markers.append(hl.js)},
            arm: {markers: armMarkers}
          }
      })
    }

    onNodeOut = (nodeData, evt) => {
      let hl = nodeData.highlighting;

      this.setState((state, props) => {
          let waccMarkerIdx = state.wacc.markers.indexOf(hl.wacc);
          let jsMarkerIdx = state.js.markers.indexOf(hl.js)

          let armMarkers = [];

          return {
            wacc: {markers: state.wacc.markers.splice(waccMarkerIdx, 1)},
            js: {markers: state.js.markers.splice(jsMarkerIdx, 1)},
            arm: {markers: armMarkers}
          }
      })
    }

    readInputCallBack = (codeToEval) => {
        console.log(test);
        // if (!window.EMULATOR_IS_INPUT) {
        //     window.EMULATOR_CONSOLE_READ = window.prompt()
        // }
        eval(codeToEval);
        window.EMULATOR_CONSOLE_READ = () => { return window.prompt()};
    };

    clearConsole = () => {
        this.setState({consoleReset: this.state.consoleReset + 1})
    }
    processWaccCode = async (code) => {
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
                                        onStepJsClick={(e) => {
                                            this.setState({js: {code: "Hello World!"}})
                                        }}
                                        onStepOverAstClick={(e) => {
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
