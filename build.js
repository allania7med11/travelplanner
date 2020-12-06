var fs = require('fs');
var path = require('path');
require('dotenv').config()
let generateEnv =async () => {
  if(!process.env.server){
    let serverPath=path.join(process.cwd(),"src/server")
    let str=`\nserver=${serverPath}`
    str+=`\ndata=${serverPath}/data`
    await fs.appendFileSync('.env',str );
  }
}
generateEnv()