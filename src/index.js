
function configToObjects(bracketsConfig){
  return bracketsConfig.map(config => {    
    return {
      open: config[0], 
      close: config[1]
    }
  });
}

function getConfig(configs, bracket){  
  for(let i = 0; i < configs.length; i++){
    let config = configs[i];
    if(config.close === bracket || config.open === bracket){
      return config;
    }
  }
  return undefined;
}

function getMap(configs, type){
  var map = new Map();
  configs.forEach(config => {
    map.set(config[type], 0);
  });
}

function isOpen(bracket, config){
  if(config.open === bracket){
    return true;
  }  
  return false;
}

function isClosed(bracket, config){
  if(config.close === bracket){
    return true;
  }
  return false;
}

function checkBrackets(opened, closed, configs){
  if(closed.length != opened.length){
    return false;
  } 
  for(let i = 0, j = opened.length - 1; i < opened.length; i++, j--){
    let open = opened[i];
    let close = closed[j];
    let config = getConfig(configs, open);
    if(config.open === open && config.close !== close){
      return false;
    }
  }
  return true;
}

module.exports = function check(str, bracketsConfig) {
  let configs = configToObjects(bracketsConfig);      
  var closed = [];
  var opened = [];
  for(let i = 0; i < str.length; i++){
    let bracket = str[i];
    let config = getConfig(configs, bracket);    
    if(config === undefined){
      return false;
    }
    if(isOpen(bracket, config)){
      opened.push(bracket);
    }
    if(isClosed(bracket, config)){
      closed.push(bracket);
    }    
  }      
  return checkBrackets(opened, closed, configs);  
}
