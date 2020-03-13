import axios from 'axios'

const SERVER_ADDR = "http://134.209.31.55:8080/";
const SERVER_ENDPOINT = "";

export function astMetaToGraphData(astMeta) {
    let firstNode = astMeta.nodes["0"];
    let graphData = createGraphNode(firstNode, astMeta);
    return graphData
}

function generateMarkerObject(start, end, off = 0, style="ast-node-highlight") {
    return {
      startRow: start.lineNum - 1,
      startCol: start.charNum,
      endRow: end.lineNum - 1,
      endCol: end.charNum,
      className: style,
      type: "text"
    }
}

function generateArmMarkers(lineNums, style = "ast-node-highlight") {
    return lineNums.map(ln => ({startRow: ln - 1, className: style, type: "background"}))
}

export function highlightNode(node, style = "ast-node-highlight") {
    return {
        wacc: [generateMarkerObject(node.waccStart, node.waccEnd, style)],
        js:   typeof node.jsStart === "undefined" ? [{}] : [generateMarkerObject(node.jsStart, node.jsEnd, -1, style)],
        arm:  generateArmMarkers(node.armLineNums, style)
    }
}

function createGraphNode(node, astMeta){
    let name = node.name.replace("AST", "");
    let value = node.value;
    let childrenIDs = node.children;
    let children = [];

    if(typeof childrenIDs !== "undefined") {
        for (let i = 0; i < childrenIDs.length; i++) {
            let childID = childrenIDs[i];
            let child = astMeta.nodes[childID];
            children.push(createGraphNode(child, astMeta))
        }
    }

    return {
        name: name,
        attributes: {value: value},
        highlighting: highlightNode(node),
        children: children
    }

}

export async function sendWaccCode(code) {
    let ADDR = SERVER_ADDR + SERVER_ENDPOINT;
    let data = {isError: true};
    await axios.post(ADDR, {contents: code}, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
            data = res.data
        })
        .catch(error => {
            if (typeof error.response.data.errors !== "undefined") {
                let errors = error.response.data.errors;
                for (let entry of errors.keys()) {
                    console.log(errors[entry])
                }
            }
        });
    return data
}