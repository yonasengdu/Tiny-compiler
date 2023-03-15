export const Traverser = function (ast, visitor) {
  function traverseChild(node) {
    if (node.type === "program") {
      node.body.forEach((statement) => {
        traverseNode(statement, node);
      });
      traverseNode(node.body, node);
    }
    if (node.type === "CallExpression") {
      traverseNode(node.left, node);
      traverseNode(node.right, node);
    }
  }

  function traverseNode(child, parent) {
    const methods = visitor[child.type];

    if (methods && methods.enter) {
      methods.enter(child, parent);
    }
    switch (child.type) {
      case "program":
        traverseChild(child);
        break;

      case "CallExpression":
        traverseChild(child);
        break;

      case "VariableDeclaration":
      case "NumberLiteral":
      case "StringLiteral":
        break;
    }

    if (methods && methods.exit) {
      methods.exit(child, parent);
    }
  }

  traverseNode(ast, null);
};

// module.exports = { Traverser };
