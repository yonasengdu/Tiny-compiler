// const { Traverser } = require("./Traverser");
import { Traverser } from "./Traverser.js";

export const codeGenerator = function (node) {
  let data = ".data\n";
  let text = ".text\n";

  const visitors = {
    program: {
      enter(child, parent) {},
    },
    CallExpression: {
      exit(child, parent) {
        if (child.mipsText) {
          text += child.mipsText + "\n";
        }
      },
    },
    VariableDeclaration: {
      enter(child, parent) {
        if (child.mipsText) {
          text += child.mipsText + "\n";
        }
        if (child.mipsData) {
          data += child.mipsData + "\n";
        }
      },
    },
    StringLiteral: {
      enter(child, parent) {
        if (child.mipsText) {
          text += child.mipsText + "\n";
        }
        if (child.mipsData) {
          data += child.mipsData + "\n";
        }
      },
    },
    NumberLiteral: {
      enter(child, parent) {
        if (child.mipsText) {
          text += child.mipsText + "\n";
        }
        if (child.mipsData) {
          console.log(child.mipsData);
          data += child.mipsData + "\n";
        }
      },
    },
  };

  Traverser(node, visitors);

  const mipsCode = data + "\n" + text;

  return mipsCode;
};

/* 
function generate(node) {
    switch (node.type) {
      case "program":
        generate(node.body);
        break;

      case "CallExpression":
        if (node.mispData) {
          data += node.mispData;
        }
        if (node.mipsText) {
          text += node.mipsText;
        }
        generate(node.left);
        generate(node.right);
        break;

      case "StringLiteral":
        if (node.mipsData) {
          data += node.mipsData;
        }
        if (node.mipsText) {
          text += node.mipsText;
        }
        break;

      case "NumberLiteral":
        if (node.mispData) {
          data += node.mispData;
        }
        if (node.mipsText) {
          text += node.mipsText;
        }
        break;

      case "VariableDeclaration":
        if (node.mispData) {
          data += node.mispData;
        }
        if (node.mipsText) {
          text += node.mipsText;
        }
        break;
    }
  }
*/
