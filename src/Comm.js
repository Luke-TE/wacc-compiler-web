import React from 'react'
import axios from 'axios'

const SERVER_ADDR = "http://134.209.31.55:8080/";
const SERVER_ENDPOINT = "";

const testGraphData = [{
    name: "WACC Program", children: [{
        name: "BinOP", attributes: {operation: "Add"},
        children: [{name: "Const", attributes: {value: "1"}}, {name: "VarIdent", attributes: {ident: "x"}}]
    }]
}];




export function astMetaToGraphData(astMeta) {
    let firstNode = astMeta.nodes["0"];
    let graphData = createGraphNode(firstNode, astMeta);
    return graphData
}

function createGraphNode(node, astMeta){
    let name = node.name;
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
    // console.log(JSON.stringify(retObj))
    return {
        name: name,
        attributes: {value: value},
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
                var errors = error.response.data.errors;
                for (let entry of errors.keys()) {
                    console.log(errors[entry])
                }
            }
        });
    return data
}