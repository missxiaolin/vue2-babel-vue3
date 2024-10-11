function getVueName(scriptAst) {
  try {
    const match = scriptAst.find('import $_$1 from "vue"').match;
    let vueName = "Vue";
    if (
      match &&
      match[1] &&
      match[1].length > 0 &&
      match[1][0] &&
      match[1][0].value
    ) {
      vueName = match[1][0].value;
    }
    return vueName;
  } catch (error) {
    return "Vue";
  }
}


module.exports = {
    getVueName
}