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
        }
    }

    onWaccCodeChange = (newCode) => {
        this.setState({
            wacc: {
                code: newCode,
                markers: [{startRow: 0, startCol: 2, endRow: 0, endCol: 20, className: 'warning', type: 'text'}]
            },
            graphData: [{}]
        })
    }

    readInputCallBack = (input) => {

        console.log(test)
        test = "";
    }

    processWaccCode = (code) => {
        let rsp = sendWaccCode(code)
        console.log(rsp)
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


                <div className="App-code-editors">
                    <GridContainer>
                        <GridItem lg={12}>
                            <Card>
                                <CardBody>
                                    <ButtonStrip
                                        onCompileClick={(e) => {
                                            this.processWaccCode(this.state.wacc.code)
                                        }}
                                        onStepJsClick={(e) => {
                                            this.setState({js: {code: "Hello World!"}})
                                        }}
                                        onStepOverAstClick={(e) => {
                                            this.readInputCallBack(e)
                                        }}/>
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
                        <GridItem xs={12} sm={12} md={6}>
                            <Card>
                                <CardBody>
                                  <div style={{height: '50em'}}>
                                    <Tree
                                        data={this.state.graphData}
                                        orientation="vertical"/>
                                  </div>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Card>
                                <CardBody>
                                    <Terminal commandPassThrough={cmd => {
                                        test = cmd[0]
                                    }} watchConsoleLogging hideTopBar allowTabs={false}/>
                                </CardBody>
                            </Card>
                        </GridItem>

                    </GridContainer>
                </div>

                <div className="tree-wrapper">

                </div>

                <div id="inputoutput"></div>


            </div>
        )
    }
}

export default App;
