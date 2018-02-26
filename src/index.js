
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
  let configs = configToObjects(bracketsConfig);      
  let length = str.length;  
  let symbol = '*';
  while(length-- >= 0 && str.length > 0){
    let temp = "";
    let needUpdate = false;
    for(let i = 0; i < str.length - 1; i++){
      let bracket = str[i];
      let config = getConfig(configs, bracket);
      if(config === undefined){
        return false;
      }
      if(config.open === bracket){
        for(let j = i + 1; j < str.length; j++){
          let nextBracket = str[j];
          if(config.close === nextBracket){
            if((j - i) % 2 !== 0){
              needUpdate = true;
              for(let k = 0; k < str.length; k++){
                if(k !== i && k !== j){
                  temp += str[k];                  
                }else{
                  temp
                }                
              }  
              if(needUpdate){
                break;
              }            
            }
          }
        }
      }
      if(needUpdate){
        break;
      }
    }
    if(needUpdate){
      str = temp;    
    }    
  }
  return str.length === 0;  
}
