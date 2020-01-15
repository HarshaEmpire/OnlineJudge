const IncomingForm = require('formidable').IncomingForm
const fs=require("fs")
const handleUpload=(req, res)=> {
  let aa;
  console.log("pppp");
  new IncomingForm().parse(req)
  .on('fileBegin',(name,file)=>{
    file.path=__dirname+`/${name}/`+file.name;
  })
  .on('file',(name,file)=>{
    console.log('uploaded file',name,file)
  })
  .on('aborted',()=>{
    console.error('request aborted')
  })
  .on('error',(err)=>{
    console.error('Error',err)
    
  })
  .on('end',(file)=>{
    // console.log("jjj",aa);
    // console.log(kk)
    res.end(file)
  })
  



  
}
  module.exports = {
    handleUpload:handleUpload
  };