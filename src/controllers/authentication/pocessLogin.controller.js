const { loadData } = require("../../data");

module.exports=(req,res)=>{
    const {nombre,contrasenia}= req.body;
    const users=loadData ("users");
  const usersfind=  users.find((u)=>u.nombre=== nombre && (u) => u.contrasenia ===contrasenia)
}