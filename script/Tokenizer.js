export const Tokenizer = function (string) {
  const Alltokens = [];
  const strings = string.split(";");
  if (strings[strings.length - 1].length === 1) {
    strings.pop();
  }
  function Tokenize(string) {
    let current = 0;
    const str = string.trim();
    let newstring = "";
    let tokens = [];
    if (Number.isNaN(Number(str[0]))) {
      newstring = str.replace(" ", "_");
    } else {
      const newstring = str;
    }

    while (current < newstring.length) {
      if (newstring[current] === '"') {
        let str = "";
        current++;
        while (newstring[current] !== '"') {
          str += newstring[current];
          current++;
        }
        tokens.push({
          type: "String",
          value: str,
        });
        current++;
        continue;
      }

      let words = /^[A-Za-z_]+$/;
      if (words.test(newstring[current])) {
        let variable = "";
        while (words.test(newstring[current]) && current < newstring.length) {
          variable += newstring[current];
          current++;
        }
        variable = variable.replace("_", " ");
        tokens.push({
          type: "variable",
          value: variable,
        });
        continue;
      }

      let space = /\s/;
      if (space.test(newstring[current])) {
        current++;
        continue;
      }

      const operators = ["=", "-", "+", "*", "/", "(", ")"];
      if (operators.includes(newstring[current])) {
        let operator = newstring[current];
        tokens.push({
          type: "operator",
          value: operator,
        });

        current++;
      }

      if (newstring[current] === ";") {
        let expressionEnd = newstring[current];
        tokens.push({
          type: "expressionEnd",
          value: expressionEnd,
        });

        current++;
      }

      let numbers = /[0-9.]/;
      if (numbers.test(newstring[current])) {
        // console.log(newstring[current]);
        let number = "";
        while (numbers.test(newstring[current])) {
          number += newstring[current];
          current++;
        }
        tokens.push({
          type: "Number",
          value: number,
        });
      }
    }
    Alltokens.push(tokens);
  }

  strings.forEach((string) => {
    Tokenize(string);
  });

  return Alltokens;
};
