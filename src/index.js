
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

module.exports = function check(str, bracketsConfig) {
  str = str.split('');
  let configs = configToObjects(bracketsConfig);      
  let length = str.length;  
  let symbol = '*';
  while(length-- >= 0){
    for(let i = 0; i < str.length - 1; i++){
      let bracket = str[i];
      if(bracket === symbol){
        continue;
      }
      let config = getConfig(configs, bracket);
      if(config === undefined){
        return false;
      }
      if(config.open === bracket){
        for(let j = i + 1; j < str.length; j++){
          let nextBracket = str[j];
          if(nextBracket === symbol){
            continue;
          }
          if(config.close === nextBracket){
            if((j - i) % 2 !== 0){              
              for(let k = 0; k < str.length; k++){
                if(k === i || k === j){
                  str[k] = symbol;
                }
              } 
              break;                         
            }
          }
        }
      }      
    }    
  }
  return str.filter(x => x !== symbol).length === 0 
}
