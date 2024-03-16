'use strict'


const ValidateSignup = (userData) => {

    console.dir(userData)

    if (userData.password != userData.password_confirm) { return false }

    const today = new Date();
    const DoB = new Date(userData.DoB);
    const age = new Date(today - DoB).getFullYear() - 1970
    if (age < 18) { return false }

    return true;
    
}



module.exports = { ValidateSignup }