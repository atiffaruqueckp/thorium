const headerValidation = function (req, res, next) 
{    let data = req.headers
    if (data.hasOwnProperty("isfreeappuser")=== false){
        res.send("Request is missing")
    } else { 
        next()
        
    }

}

module.exports.headerValidation = headerValidation