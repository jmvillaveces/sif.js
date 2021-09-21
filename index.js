//private members
var nodes = {}, links = {};

var _getNode = function (id) {
  if (!nodes[id]) nodes[id] = { id: id };
  return nodes[id];
};

var _parse = function (line, i) {
  line = (line.split('\t').length > 1) ? line.split('\t') : line.split(' ');

  if (line.length < 1) {
    console.warn('SIFJS cannot parse line ' + i + ' "' + line + '"');
    return;
  } else if (line.length >= 3) {
    const source = _getNode(line[0], nodes);
    const intType = line[1];
    for (let j = 2; j < line.length; j++) {
      var target = _getNode(line[j], nodes);

      if (source < target) {
        links[source.id + target.id + intType] = { target: target.id, source: source.id, intType: intType };
      } else {
        links[target.id + source.id + intType] = { target: target.id, source: source.id, intType: intType };
      }
    }
  } else if (line.length == 1) {
    _getNode(line[0], nodes);
  }
};

var _toArr = function (obj) {
  var arr = [];
  for (var key in obj) {
    arr.push(obj[key]);
  }
  return arr;
};

//public
function SIFJS() { };

SIFJS.parse = function (text) {

  var lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    _parse(lines[i], i);
  }

  return { nodes: _toArr(nodes), links: _toArr(links) };
};

module.exports = SIFJS;