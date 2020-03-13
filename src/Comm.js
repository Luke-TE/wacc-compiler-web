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

export function sendWaccCode(code) {
    let ADDR = SERVER_ADDR + SERVER_ENDPOINT
    console.log(`Sending ${code} to ${ADDR}`)
    axios.post(ADDR, {contents: code}, {headers:{'Content-Type': 'application/json'}})
        .then(res => {
            console.log(res)
        })
        .catch(reason => {
            console.log(reason)
            return
        })

    return {
        "armCode": ".data\n\nmsg_0:\n\t\t.word 50\n\t\t.ascii \"NullReferenceError: dereference a null reference\\n\\0\"\nmsg_1:\n\t\t.word 5\n\t\t.ascii \"%.*s\\0\"\nmsg_2:\n\t\t.word 3\n\t\t.ascii \"%d\\0\"\n\n\t\t.text\n\t\t\n\t\t.global main\n\t\tmain:\n\t\tPUSH {lr}\n\t\tSUB sp, sp, #12\n\t\tLDR r0, =8\n\t\tBL malloc\n\t\tMOV r4, r0\n\t\tLDR r5, =2\n\t\tLDR r0, =4\n\t\tBL malloc\n\t\tSTR r0, [r4]\n\t\tSTR r5, [r0]\n\t\tLDR r5, =3\n\t\tLDR r0, =4\n\t\tBL malloc\n\t\tSTR r0, [r4, #4]\n\t\tSTR r5, [r0]\n\t\tSTR r4, [sp, #8]\n\t\tLDR r0, =8\n\t\tBL malloc\n\t\tMOV r4, r0\n\t\tLDR r5, =1\n\t\tLDR r0, =4\n\t\tBL malloc\n\t\tSTR r0, [r4]\n\t\tSTR r5, [r0]\n\t\tLDR r5, [sp, #8]\n\t\tLDR r0, =4\n\t\tBL malloc\n\t\tSTR r0, [r4, #4]\n\t\tSTR r5, [r0]\n\t\tSTR r4, [sp, #4]\n\t\tLDR r0, =16\n\t\tBL malloc\n\t\tMOV r4, r0\n\t\tLDR r5, =3\n\t\tSTR r5, [r0]\n\t\tLDR r5, =1\n\t\tSTR r5, [r4, #4]\n\t\tLDR r5, =2\n\t\tSTR r5, [r4, #8]\n\t\tLDR r5, =3\n\t\tSTR r5, [r4, #12]\n\t\tSTR r4, [sp]\n\t\tLDR r4, [sp, #4]\n\t\tMOV r0, r4\n\t\tBL p_check_null_pointer\n\t\tLDR r4, [r4]\n\t\tMOV r0, r4\n\t\tBL p_read_int\n\t\tADD sp, sp, #12\n\t\tLDR r0, =0\n\t\tPOP {pc}\n\t\t.ltorg\n\t\tp_check_null_pointer:\n\t\tPUSH {lr}\n\t\tCMP r0, #0\n\t\tLDREQ r0, =msg_0\n\t\tBLEQ p_throw_runtime_error\n\t\tPOP {pc}\n\t\tp_throw_runtime_error:\n\t\tBL p_print_string\n\t\tMOV r0, #-1\n\t\tBL exit\n\t\tp_print_string:\n\t\tPUSH {lr}\n\t\tLDR r1, [r0]\n\t\tADD r2, r0, #4\n\t\tLDR r0, =msg_1\n\t\tADD r0, r0, #4\n\t\tBL printf\n\t\tMOV r0, #0\n\t\tBL fflush\n\t\tPOP {pc}\n\t\tp_read_int:\n\t\tPUSH {lr}\n\t\tMOV r1, r0\n\t\tLDR r0, =msg_2\n\t\tADD r0, r0, #4\n\t\tBL scanf\n\t\tPOP {pc}\n",
        "jsCode": "var p = { \"fst\": 2, \"snd\": 3 };\nvar q = { \"fst\": 1, \"snd\": p };\nvar a = [1, 2, 3, \b\b];\nq[\"fst\"] = window.prompt(\"\");\n",
        "astMeta": {
          "nodes": {
            "3": {
              "name": "Variable: p",
              "children": [],
              "waccStart": {
                "lineNum": 2,
                "charNum": 17
              },
              "waccEnd": {
                "lineNum": 2,
                "charNum": 18
              },
              "armLineNums": []
            },
            "4": {
              "name": "INT constant: 2",
              "children": [],
              "waccStart": {
                "lineNum": 2,
                "charNum": 29
              },
              "waccEnd": {
                "lineNum": 2,
                "charNum": 30
              },
              "armLineNums": [
                22
              ]
            },
            "5": {
              "name": "INT constant: 3",
              "children": [],
              "waccStart": {
                "lineNum": 2,
                "charNum": 32
              },
              "waccEnd": {
                "lineNum": 2,
                "charNum": 33
              },
              "armLineNums": [
                27
              ]
            },
            "6": {
              "name": "New pair",
              "children": [
                4,
                5
              ],
              "waccStart": {
                "lineNum": 2,
                "charNum": 21
              },
              "waccEnd": {
                "lineNum": 2,
                "charNum": 34
              },
              "armLineNums": [
                19,
                20,
                21,
                23,
                24,
                25,
                26,
                28,
                29,
                30,
                31
              ]
            },
            "7": {
              "name": "Declare pair(INT, INT)",
              "children": [
                3,
                6
              ],
              "waccStart": {
                "lineNum": 2,
                "charNum": 2
              },
              "waccEnd": {
                "lineNum": 2,
                "charNum": 34
              },
              "armLineNums": [
                32
              ],
              "jsStart": {
                "lineNum": 1,
                "charNum": 1
              },
              "jsEnd": {
                "lineNum": 1,
                "charNum": 33
              }
            },
            "9": {
              "name": "Variable: q",
              "children": [],
              "waccStart": {
                "lineNum": 3,
                "charNum": 18
              },
              "waccEnd": {
                "lineNum": 3,
                "charNum": 19
              },
              "armLineNums": []
            },
            "10": {
              "name": "INT constant: 1",
              "children": [],
              "waccStart": {
                "lineNum": 3,
                "charNum": 30
              },
              "waccEnd": {
                "lineNum": 3,
                "charNum": 31
              },
              "armLineNums": [
                36
              ]
            },
            "11": {
              "name": "Variable: p",
              "children": [],
              "waccStart": {
                "lineNum": 3,
                "charNum": 33
              },
              "waccEnd": {
                "lineNum": 3,
                "charNum": 34
              },
              "armLineNums": [
                41
              ]
            },
            "12": {
              "name": "New pair",
              "children": [
                10,
                11
              ],
              "waccStart": {
                "lineNum": 3,
                "charNum": 22
              },
              "waccEnd": {
                "lineNum": 3,
                "charNum": 35
              },
              "armLineNums": [
                33,
                34,
                35,
                37,
                38,
                39,
                40,
                42,
                43,
                44,
                45
              ]
            },
            "13": {
              "name": "Declare pair(INT, pair)",
              "children": [
                9,
                12
              ],
              "waccStart": {
                "lineNum": 3,
                "charNum": 2
              },
              "waccEnd": {
                "lineNum": 3,
                "charNum": 35
              },
              "armLineNums": [
                46
              ],
              "jsStart": {
                "lineNum": 2,
                "charNum": 1
              },
              "jsEnd": {
                "lineNum": 2,
                "charNum": 33
              }
            },
            "15": {
              "name": "Variable: a",
              "children": [],
              "waccStart": {
                "lineNum": 4,
                "charNum": 8
              },
              "waccEnd": {
                "lineNum": 4,
                "charNum": 9
              },
              "armLineNums": []
            },
            "16": {
              "name": "INT constant: 1",
              "children": [],
              "waccStart": {
                "lineNum": 4,
                "charNum": 13
              },
              "waccEnd": {
                "lineNum": 4,
                "charNum": 14
              },
              "armLineNums": [
                52
              ]
            },
            "17": {
              "name": "INT constant: 2",
              "children": [],
              "waccStart": {
                "lineNum": 4,
                "charNum": 16
              },
              "waccEnd": {
                "lineNum": 4,
                "charNum": 17
              },
              "armLineNums": [
                54
              ]
            },
            "18": {
              "name": "INT constant: 3",
              "children": [],
              "waccStart": {
                "lineNum": 4,
                "charNum": 19
              },
              "waccEnd": {
                "lineNum": 4,
                "charNum": 20
              },
              "armLineNums": [
                56
              ]
            },
            "19": {
              "name": "Array",
              "children": [
                16,
                17,
                18
              ],
              "waccStart": {
                "lineNum": 4,
                "charNum": 12
              },
              "waccEnd": {
                "lineNum": 4,
                "charNum": 21
              },
              "armLineNums": [
                47,
                48,
                49,
                50,
                51,
                53,
                55,
                57
              ]
            },
            "20": {
              "name": "Declare INT[0]",
              "children": [
                15,
                19
              ],
              "waccStart": {
                "lineNum": 4,
                "charNum": 2
              },
              "waccEnd": {
                "lineNum": 4,
                "charNum": 21
              },
              "armLineNums": [
                58
              ],
              "jsStart": {
                "lineNum": 3,
                "charNum": 1
              },
              "jsEnd": {
                "lineNum": 3,
                "charNum": 24
              }
            },
            "22": {
              "name": "Variable: q",
              "children": [],
              "waccStart": {
                "lineNum": 5,
                "charNum": 11
              },
              "waccEnd": {
                "lineNum": 5,
                "charNum": 12
              },
              "armLineNums": [
                59
              ]
            },
            "23": {
              "name": "First pair elem",
              "children": [
                22
              ],
              "waccStart": {
                "lineNum": 5,
                "charNum": 7
              },
              "waccEnd": {
                "lineNum": 5,
                "charNum": 12
              },
              "armLineNums": [
                60,
                61,
                62
              ]
            },
            "24": {
              "name": "Read INT",
              "children": [
                23
              ],
              "waccStart": {
                "lineNum": 5,
                "charNum": 2
              },
              "waccEnd": {
                "lineNum": 5,
                "charNum": 12
              },
              "armLineNums": [
                63,
                64
              ],
              "jsStart": {
                "lineNum": 4,
                "charNum": 1
              },
              "jsEnd": {
                "lineNum": 4,
                "charNum": 31
              }
            },
            "0": {
              "name": "Block",
              "children": [
                7,
                13,
                20,
                24
              ],
              "waccStart": {
                "lineNum": 2,
                "charNum": 2
              },
              "waccEnd": {
                "lineNum": 5,
                "charNum": 12
              },
              "armLineNums": []
            },
            "26": {
              "name": "Function: #main",
              "children": [
                0
              ],
              "waccStart": {
                "lineNum": 2,
                "charNum": 2
              },
              "waccEnd": {
                "lineNum": 5,
                "charNum": 12
              },
              "armLineNums": [
                17,
                66,
                67
              ],
              "jsStart": {
                "lineNum": 1,
                "charNum": 1
              },
              "jsEnd": {
                "lineNum": 5,
                "charNum": 1
              }
            }
          }
        }
      }
}