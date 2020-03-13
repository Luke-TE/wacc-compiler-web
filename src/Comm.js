import React from 'react'
import axios from 'axios'

const SERVER_ADDR = "http://192.168.1.67:8080/"
const SERVER_ENDPOINT = ""

const testGraphData = [{
    name: "WACC Program", children: [{
      name: "BinOP", attributes: { operation: "Add" },
      children: [{ name: "Const", attributes: { value: "1" } }, { name: "VarIdent", attributes: { ident: "x" } }]
    }]
  }];
  

export function astMetaToGraphData(astMeta) {
    return testGraphData
}

export async function sendWaccCode(code) {
    let ADDR = SERVER_ADDR + SERVER_ENDPOINT
    // console.log(`Sending ${code} to ${ADDR}`)
    await axios.post(ADDR, {contents: code}, {headers:{'Content-Type': 'application/json'}})
        .then(res => {
          console.log(res.data)
          return res.data
            // console.log(res)
        })
        .catch(reason => {
            // console.log(reason)
            return
        })
}