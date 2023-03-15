export const Parser = function (allTokens) {
  const operators = ["=", "-", "+", "*", "/"];
  function walk(tokens) {
    if (tokens.length === 1) {
      if (tokens[0].type === "Number") {
        return {
          type: "NumberLiteral",
          value: tokens[0].value,
        };
      }
      if (tokens[0].type === "String") {
        return {
          type: "StringLiteral",
          value: tokens[0].value,
        };
      }
      if (tokens[0].type === "variable") {
        return {
          type: "VariableDeclaration",
          value: tokens[0].value,
        };
      }
    }
    let node = {};
    let current = 0;
    while (current < tokens.length) {
      if (operators.includes(tokens[current].value)) {
        const index = current;
        const leftTokens = tokens.slice(0, index);
        const rightTokens = tokens.slice(index + 1);
        node = {
          type: "CallExpression",
          value: tokens[current].value,
          left: walk(leftTokens),
          right: walk(rightTokens),
        };
        break;
      }

      current++;
    }
    return node;
  }
  const body = [];
  allTokens.forEach((tokens) => {
    body.push(walk(tokens));
  });
  const Program = {
    type: "program",
    body: body,
  };

  return Program;
};
