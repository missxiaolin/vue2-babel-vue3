let scriptVue = `import {`;

function setScriptVue(v) {
  scriptVue = `${scriptVue} ${v} `;
}

function setImportVue(script) {
  if (scriptVue === "import {") return;
  script.before(`\r\n${scriptVue}\} from 'vue'`);
}

/**
 * 转换 props
 * @param {*} script
 */
function insertDefineProps(script) {
  const hasProps = script.has("defineProps");
  script.replace("props:{$$$},", "const props=defineProps({$$$})");
  if (!hasProps) {
    setScriptVue("defineProps");
  }
}

function insertDefineData(script) {}

/**
 * 方法转换
 * @param {*} script
 */
function insertDefineMethod(script) {
  script
    .find("methods:{}")
    .replace("async $_$($$$0){$$$1}", "const $_$=async($$$0)=>{$$$1}")
    .replace("$_$($$$0){$$$1}", "const $_$=($$$0)=>{$$$1}")
    .replace("async $_$(){$$$}", "const $_$=async()=>{$$$}")
    .replace("$_$(){$$$}", "const $_$=()=>{$$$}")
    .replace("methods:{$$$}", "$$$");
}

/**
 * @param {*} script
 */
function exposeSetup(script) {
  script.find("export default $_$1").each((item) => {
    // item.remove();
  });
}

module.exports = function (ast) {
  const script =
    ast.parseOptions && ast.parseOptions.language === "vue"
      ? ast.find("<script></script>")
      : ast;

  // 1. defineProps
  insertDefineProps(script);
  insertDefineMethod(script);
  exposeSetup(script);
  setImportVue(script);
  return ast;
};
