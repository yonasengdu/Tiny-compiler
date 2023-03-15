"user strict";
// const { Tokenizer } = require("./Tokenizer");
console.log("ok");
import { Tokenizer } from "./Tokenizer.js";
// const { Parser } = require("./Parser");
import { Parser } from "./Parser.js";

// const { Transform } = require("./Transformer");
import { Transform } from "./Transformer.js";

// const { codeGenerator } = require("./CodeGenerator");
import { codeGenerator } from "./CodeGenerator.js";

const inputTextarea = document.getElementById("input-box");
const output = document.querySelector(".output-box");
const btnGenerator = document.querySelector(".generate");
const btnrefresh = document.querySelector(".refresh");

btnGenerator.addEventListener("click", function () {
  const string = inputTextarea.value;
  if (string.includes("if")) {
  }

  if (string.includes("for")) {
  }
  const tokens = Tokenizer(string);
  console.log(tokens);
  console.log(JSON.stringify(tokens, null, 2));

  const ast = Parser(tokens);
  console.log(JSON.stringify(ast, null, 2));

  const newAst = Transform(ast);

  console.log(JSON.stringify(newAst, null, 2));

  const mipsCode = codeGenerator(newAst);
  output.classList.add("active");
  output.value = mipsCode;
});

btnrefresh.addEventListener("click", function () {
  location.reload();
});
