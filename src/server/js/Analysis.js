const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs").promises;
let { data } = process.env;
class Analysis {
  constructor() {
    this.inputs = {};
    this.results = {};
    this.fields=["score_tag", "subjectivity", "confidence" ]
  }
  async getAnalysis() {
    this.inputs = await fs.readFile(data + "/inputs.json");
    this.results = await fs.readFile(data + "/results.json");
    let obj=this.fields.reduce((acc,cv) => {
      acc[cv] = this.results[cv]
      return acc
    },{})
    return { ...obj, ...this.inputs };
  }
  async update(inputs,results) {
    try{
      if(!inputs || !results){
        throw "data err"
      }
      let test = JSON.stringify(inputs)
      await fs.writeFile(data + "/inputs.json", test);
      await fs.writeFile(data + "/results.json", JSON.stringify(results));
      console.log("run")
      return true
    }catch(err){
      console.log(err)
      return false
    }
    
    
  }
}
let analysis = new Analysis();
// console.log(analysis.update(analysis.inputs,analysis.results))
module.exports = { analysis };
// let test = async () => {
//   let rtn = await analysis.getAnalysis()
//   console.log({rtn})
// }
// test()