# Tiny Compiler

Tiny Compiler is a simple compiler that takes C source code as input and generates MIPS assembly code as output. It aims to provide a basic understanding of the compilation process and demonstrate the transformation of high-level code to low-level assembly instructions.

## Features

- Translates C source code to MIPS assembly code.
- Supports a subset of the C programming language.
- Performs lexical analysis, parsing, and code generation.

## Prerequisites

To use the Tiny Compiler, you need to have the following installed on your system:

- node 16.xx and above

## Usage

1. Clone the repository or download the source code.

2. Open a terminal or command prompt and navigate to the directory containing the Tiny Compiler files.

3. Execute the following command to run the compiler:


Replace `input.c` with the path to your C source code file and `output.s` with the desired path for the generated MIPS assembly code.

4. The compiler will read the input C source code, perform lexical analysis, parsing, and generate the corresponding MIPS assembly code.

5. The generated MIPS assembly code will be saved to the specified output file (`output.s`).

## Supported C Language Subset

The Tiny Compiler supports a subset of the C programming language. It includes the following features:

- Variable declarations and assignments
- Arithmetic and logical expressions
- Conditional statements (if-else)
- Loops (while)
- Input/output operations (printf, scanf)

Please note that the compiler may not handle the complete syntax and semantics of the C language. It serves as a simplified example to demonstrate the compilation process.

## Example

Consider the following C source code:

```c
#include <stdio.h>

int main() {
 int a = 5;
 int b = 10;
 int sum = a + b;

 printf("The sum is: %d\n", sum);

 return 0;
}
    .data
prompt: .asciiz "The sum is: "
sum_val: .word 0

    .text
    .globl main

main:
    # Variable declarations
    li $t0, 5
    sw $t0, 0($sp)
    li $t0, 10
    sw $t0, -4($sp)
    addi $sp, $sp, -8

    # Arithmetic operation
    add $t0, $t0, $t1
    sw $t0, -8($sp)

    # Print statement
    la $a0, prompt
    lw $a1, -8($sp)
    li $v0, 4
    syscall

    # Exit program
    li $v0, 10
    syscall

You can copy and save this content as a Markdown file (e.g., `README.md`) for your project.

