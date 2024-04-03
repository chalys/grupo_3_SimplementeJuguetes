module.exports = (req, res) => { //

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

res.redirect("/")
};