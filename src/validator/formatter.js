//Module 3

function trim() {
    let name = '  Atif Faruue    '
    console.log('Trimmed name is: ',name.trim())
}

function changetoLowerCase() {
    let name = 'atiF faRuque'
    console.log('Name in lowercase is: ',name.toLowerCase())
}

function changeToUpperCase() {
    let name = 'atif faruque'
    console.log('Name in uppercase is: ',name.toUpperCase())
}

module.exports.trim = trim
module.exports.changetoLowerCase = changetoLowerCase
module.exports.changeToUpperCase = changeToUpperCase