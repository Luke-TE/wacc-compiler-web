import React from 'react'
import axios from 'axios'
import {array} from "prop-types";

const SERVER_ADDR = "http://192.168.1.67:8080/"
const SERVER_ENDPOINT = ""

const testGraphData = [{
    name: "WACC Program", children: [{
        name: "BinOP", attributes: {operation: "Add"},
        children: [{name: "Const", attributes: {value: "1"}}, {name: "VarIdent", attributes: {ident: "x"}}]
    }]
}];




export function astMetaToGraphData(astMeta) {
    let firstNode = astMeta.nodes["0"]
    let graphData = createGraphNode(firstNode.name, firstNode.value, firstNode.children, astMeta)
    return graphData
}

function createGraphNode(name, value, childrenIDs, astMeta){
    var children = [];
    if(typeof childrenIDs !== "undefined") {
        for (var i = 0; i < childrenIDs.length; i++) {
            var childID = childrenIDs[i]
            var child = astMeta.nodes[childID];
            children.push(createGraphNode(child.name, child.value, child.children, astMeta))
        }
    }
    let retObj = {
        name: name,
        attributes: { value: value },
        children: children
    }
    // console.log(JSON.stringify(retObj))
    return retObj

}

export async function sendWaccCode(code) {
    let ADDR = SERVER_ADDR + SERVER_ENDPOINT;
    var data = {isError: true};
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