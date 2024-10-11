const $ = require("gogocode");
const path = require("path");
const prettier = require("prettier");
const fs = require("fs");

function transform(fileInfo, api, options) {
  const $ = api.gogocode;
  const source = fileInfo.source;
  const ast = $(source, { parseOptions: { language: "vue" } });
  const template = ast.find("<template></template>");
  const script = ast.find("<script></script>");

  template
    .replace(
      '<abc-page ref="layout" $$$0>$$$1</abc-page>',
      '<ABCPAGE ref="layoutRef" $$$0>$$$1</ABCPAGE>'
    )
    .find("<ABCPAGE></ABCPAGE>")
    .replace(
      '<$_$ slot="filter" $$$0>$$$1</$_$>',
      "<template #filter><$_$ $$$0>$$$1</$_$></template>"
    )
    .replace(
      '<$_$ slot="buttonBar" $$$0>$$$1</$_$>',
      "<template #buttonBar><$_$ $$$0>$$$1</$_$></template>"
    )
    .replace(
      '<$_$ slot="table" $$$0>$$$1</$_$>',
      "<template #table><$_$ $$$0>$$$1</$_$></template>"
    )
    .replace(
      '<$_$ slot="dialogIcon" $$$0>$$$1</$_$>',
      "<template #dialogIcon><$_$ $$$0>$$$1</$_$></template>"
    )
    .replace(
      '<$_$ slot="dialog" $$$0>$$$1</$_$>',
      "<template #dialog><$_$ $$$0>$$$1</$_$></template>"
    );
  template.replace(
    '<div slot="empty"></div>',
    "<template #empty><NoTableData /></template>"
  );
  template.replace(
    '<el-button type="text" $$$0>$$$1</el-button>',
    '<el-button type="primary" link $$$0>$$$1</el-button>'
  );
  template.replace(
    '<el-dropdown-menu slot="dropdown" $$$0>$$$1</el-dropdown-menu>',
    "<template #dropdown><el-dropdown-menu $$$0>$$$1</el-dropdown-menu></template>"
  );

  script.find("return {}").replace("$_$:$_$", "let $_$ = $ref($_$)");
  script
    .find("methods:{}")
    .replace("async $_$($$$0){$$$1}", "const $_$=async($$$0)=>{$$$1}")
    .replace("$_$($$$0){$$$1}", "const $_$=($$$0)=>{$$$1}")
    .replace("async $_$(){$$$}", "const $_$=async()=>{$$$}")
    .replace("$_$(){$$$}", "const $_$=()=>{$$$}");
  script
    .find("filters:{}")
    .replace("$_$:function($_$){$$$}", "const $_$=computed(($_$)=>{$$$})")
    .replace("$_$($_$){$$$}", "const $_$=computed(($_$)=>{$$$})");
  script
    .find("watch:{}")
    .replace("$_$:{handler($_$){$$$}}", "watch(()=>$_$,($_$)=>{$$$})")
    .replace("$_$:{handler(){$$$}}", "watch(()=>$_$,()=>{$$$})")
    .replace(
      "'$_$':{handler($_$){$$$},deep:true}",
      "watch(()=>$_$,($_$)=>{$$$},{deep:true})"
    )
    .replace("'$_$':{handler($_$){$$$}}", "watch(()=>$_$,($_$)=>{$$$})")
    .replace("$_$($_$){$$$}", "watch(()=>$_$,($_$)=>{$$$})")
    .replace("$_$(){$$$}", "watch(()=>$_$,()=>{$$$})");
  script
    .find("computed:{}")
    .replace("$_$(){$$$}", "const $_$ = computed(()=>{$$$})");

  script
    .replace("components:{}", "")
    .replace("mixins:[]", "")
    .replace("props:{$$$}", "const props =  defineProps({$$$})")
    .replace("data(){return{$$$}}", "$$$")
    .replace("created(){$$$}", "onBeforeMount(()=>{$$$})")
    .replace("mounted(){$$$}", "onMounted(()=>{$$$})")
    .replace("beforeUnmount(){$$$}", "onBeforeUnmount(()=>{$$$})")
    .replace("unmounted(){$$$}", "onUnmounted(()=>{$$$})")
    .replace("beforeDestroy(){$$$}", "onBeforeUnmount(()=>{$$$})")
    .replace("destoryed(){$$$}", "onUnmounted(()=>{$$$})")
    .replace("methods:{$$$}", "$$$")
    .replace("filters:{$$$}", "$$$")
    .replace("watch:{$$$}", "$$$")
    .replace("computed:{$$$}", "$$$")
    .replace("export default {$$$}", "$$$");

  return ast.generate();
}



function run() {
    const inputPath = path.resolve(__dirname, `../src/comments/test.vue`);
    fs.readFile(inputPath, "utf-8", function read(err, code) {
        const api = { gogocode: $ };
        let fileInfo = {
            source: code.toString()
        }
       console.log(transform(fileInfo, api))
    })
    
}

run()