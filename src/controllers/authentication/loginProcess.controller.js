module.exports = (req, res) => { //

   //Ingresar como usuario con session y recordar la session
const {userName, name, email, province, locality, postal, street, streetNumber, floor, betweenSt1, betweenSt2, phoneNumber, indications, userPicture} = userFind;
req.session.userLogin ={
   userName,
   name,
   email,
   password,
   province,
   locality,
   postal,
   street,
   streetNumber,
   floor,
   betweenSt1,
   betweenSt2,
   phoneNumber,
   indications,
   userPicture
}

if(remenber){ //remenber es una variable creada para representar un valor boleano.
   res.cookie("userLogin",req.session.userLogin, {maxAge: 3600 })
}

res.redirect("/")
};