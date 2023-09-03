const he = require("he");
function decodeHtmlEntities(input) {
  return he.decode(input);
}

export { decodeHtmlEntities };
