// export const { Traverser } = require("./Traverser");
import { Traverser } from "./Traverser.js";
let tempRegisters = [
  "$s9",
  "$s8",
  "$s7",
  "$s6",
  "$s5",
  "$s4",
  "$s3",
  "$s2",
  "$s1",
  "$s0",
  "$t9",
  "$t8",
  "$t7",
  "$t6",
  "$t5",
  "$t4",
  "$t3",
  "$t2",
  "$t1",
  "$t0",
];
let usedTempRegisters = [];

function assignRegister() {
  let temp;
  if (tempRegisters.length === 0) {
    tempRegisters = [...usedTempRegisters];
    usedTempRegisters = [];
  }

  temp = tempRegisters.pop();
  usedTempRegisters.push(temp);
  return temp;
}
const typeChecker = function (child) {
  if (child.left.dataTypes !== child.right.dataTypes) {
    throw new SyntaxError(
      `Unexpected dataType:${child.right.dataTypes} , expected :${child.left.dataTypes}`
    );
  }
};

const symbolTable = [];

export const Transform = function (ast) {
  const visitors = {
    program: {
      enter(child, parent) {},
    },
    CallExpression: {
      exit(child, parent) {
        const registor1 = child.left.registor;
        const registor2 = child.right.registor;
        const temp = assignRegister();
        child.dataTypes = child.left.dataTypes;
        // console.log(child.dataTypes);
        function loadmakeOP(child, op) {
          if (child.left.varName && !child.right.varName) {
            const temp1 = assignRegister();
            const load = `lw ${temp1}, 0(${registor1})`;
            const opration = `${op}  ${child.registor} , ${temp}, ${registor2}`;
            child.mipsText = load + "\n" + opration;
          }

          if (child.right.varName && !child.left.varName) {
            const temp1 = assignRegister();
            const load = `lw ${temp1}, 0(${registor2})`;
            const opration = `${op}  ${child.registor} , ${registor1}, ${temp}`;
            child.mipsText = load + "\n" + opration;
          }

          if (child.right.varName && child.left.varName) {
            const temp1 = assignRegister();
            const temp2 = assignRegister();
            const load1 = `lw ${temp1}, 0(${registor1})`;
            const load2 = `lw ${temp2}, 0(${registor2})`;
            const opration = `${op}  ${child.registor} , ${temp1}, ${temp2}`;
            child.mipsText = load1 + "\n" + load2 + "\n" + opration;
          }

          if (!child.right.varName && !child.left.varName) {
            child.mipsText = `${op}  ${child.registor} , ${registor1}, ${registor2}`;
          }
        }
        child.registor = `${temp}`;
        if (child.value === "+") {
          typeChecker(child);
          loadmakeOP(child, "add");
        }

        if (child.value === "=") {
          console.log(child.left.dataTypes);
          typeChecker(child);
          const mips = `sw ${registor2}, 0(${registor1})`;

          child.mipsText = mips;
        }

        if (child.value === "-") {
          typeChecker(child);
          loadmakeOP(child, "sub");
        }

        if (child.value === "*") {
          typeChecker(child);
          loadmakeOP(child, "mul");
        }

        if (child.value === "/") {
          typeChecker(child);
          loadmakeOP(child, "div");
        }
      },
    },
    NumberLiteral: {
      enter(child, parent) {
        const temp = assignRegister();
        child.registor = `${temp}`;
        const mips = `li ${child.registor}, ${child.value}`;
        child.mipsText = mips;
        if (child.value.includes(".")) {
          child.dataTypes = "float";
        } else {
          child.dataTypes = "int";
        }
      },
    },
    VariableDeclaration: {
      enter(child, parent) {
        let variable = "";
        let varDataType = "";
        let dataType = "";
        if (child.value.includes(" ")) {
          const arr = child.value.split(" ");
          [varDataType, variable] = arr;
          if (varDataType === "string") {
            dataType = ".asciiz";
            child.dataTypes = "string";
          }

          if (varDataType === "int") {
            dataType = ".word";
            child.dataTypes = "int";
          }
          if (varDataType === "float") {
            dataType = ".float";
            child.dataTypes = "float";
          }
        }

        if (!child.value.includes(" ")) {
          variable = child.value;
        }

        const onSymbolTabel = symbolTable.some((obj) => obj.name === variable);

        if (!onSymbolTabel) {
          const temp = assignRegister();
          child.registor = `${temp}`;
          const obj = {
            name: variable,
            registor: child.registor,
            dataType: varDataType,
          };
          symbolTable.push(obj);
        }

        if (onSymbolTabel) {
          const obj = symbolTable.find((obj) => obj.name === variable);
          child.registor = obj.registor;
          varDataType = obj.dataType;
          child.dataTypes = varDataType;
          console.log(varDataType, "see");
        }
        child.varName = `${variable}`;
      },
    },
    StringLiteral: {
      enter(child, parent) {
        const temp = assignRegister();
        child.registor = `${temp}`;
        child.label = `str${temp.slice(1)}`;
        child.dataTypes = "string";
        child.mipsData = `${child.label}: .asciiz "${child.value}"`;
        child.mipsText = `la ${child.registor}, ${child.label}`;
      },
    },
  };

  Traverser(ast, visitors);

  return ast;
};

// module.exports = { Transform };
