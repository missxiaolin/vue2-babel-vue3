const scriptUtils = require("./utils/scriptUtils");

module.exports = function (ast, api, options) {
  const script =
    ast.parseOptions && ast.parseOptions.language === "vue"
      ? ast.find("<script></script>")
      : ast;

  // 判断是否引用 vue 的参数然后 replace做更改
  const vueName = scriptUtils.getVueName(script);

  // script.replace(`new ${vueName}($_$)`, `($_$)`);
  // script.replace(`new ${vueName}()`, `({})`);
  // script.replace(`${vueName}.extend($_$)`, `($_$)`);

  return ast;
};
