module.exports= (req,res) => {
    const products =require("../../dataBase/products.json")
const { id }= req.params
const {name,price,description,line,
    characterVersion,stock,maker,
    character,articulated,
    collectable,includesAccessories
} = req.body

const productfind = products.find(p=> p.id===+id)
 const productseEdit ={
    ...productfind,
    name: name.trim(),
    price:+price,
    description:description.trim(),
    line:line.trim(),
    characterVersion:characterVersion.trim(),
    stock:+stock,
    maker:maker.trim(),
    character:character.trim(),
   /*articulated:,
    collectable:,
    includesAccessories:*/

 }
}
