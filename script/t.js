const $ = require("gogocode");
const path = require("path");
const prettier = require("prettier");
const fs = require("fs");

const globalApiTreeshaking = require("../src/global-api-treeshaking");
const globalApi = require("../src/global-api");

const apiRules = [require("../src/slots-unification"), require("../src/setup")];

function execRule(fileName) {
  if (!fileName) {
    return;
  }
  const inputPath = path.resolve(__dirname, `../src/comments/${fileName}.vue`);
  const outputPath = path.resolve(
    __dirname,
    `../src/vue3Comments/${fileName}-out.vue`
  );
  fs.readFile(inputPath, "utf-8", function read(err, code) {
    if (err) {
      throw err;
    }

    const sourceCode = code.toString();
    const ast = $(sourceCode, { parseOptions: { language: 'vue' } });

    const rules = [globalApi, globalApiTreeshaking].concat(apiRules);

    const api = { gogocode: $ };

    const outAst = rules.reduce(
      (ast, rule) =>
        rule(ast, api, {
          filePath: inputPath,
          rootPath: path.resolve(
            __dirname,
            `../src/comments`
          ),
          outFilePath: inputPath,
          outRootPath: path.resolve(
            __dirname,
            `../src/vue3Comments`
          ),
        }),
      ast
    );
    let outputCode = outAst.root().generate();
    outputCode = outputCode.replace('<script>', '<script setup>')
    console.log('outputCode', outputCode)

    // const prettierOutPut = prettier.format(outputCode, {
    //     trailingComma: 'es5',
    //     tabWidth: 2,
    //     semi: false,
    //     singleQuote: true,
    //     printWidth: 80,
    //     parser: 'vue',
    // });
    // console.log(prettierOutPut);
  });
}

function run() {
  process.argv.slice(2).forEach((fileName) => {
    execRule(fileName);
  });
}

run();
