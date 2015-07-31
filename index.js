module.exports = SIFJS = (function() {
    
    //private methods
    
    var nodes = {}, links = {}, delimiter = '\t';
    
    var _getNode = function(id){
        if(!nodes[id]) nodes[id] = {id:id};
        return nodes[id];
    }
    
    var _parse = function(line, i){
        line = line.split(delimiter);
        
        if(line.length < 3){
            console.warn('SIFJS cannot parse line ' + i);
            return;
        }
        
        var source = _getNode(line[0]), intType = line[1], j, length;
        for (j = 2, length = line.length; j < length; j++) {
            var target = _getNode(line[j]);
            
            if(source < target){
                links[source + target + intType] = {target: target, source: source, intType: intType};
            }else{
                links[target + source + intType] = {target: target, source: source, intType: intType};
            }
        }
        
    }
    
    
    //public
    function SIFJS() {}
    
    SIFJS.parse = function(text){
        
        delimiter = (text.indexOf(delimiter) > -1) ? delimiter : ' ';
        
        var lines = text.split('\n'), i, length;
        for (i = 0, length = lines.length; i < length; i++) {
            _parse(lines[i], i);
        }
    };

});