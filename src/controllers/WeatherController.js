let axios  = require("axios")
// [
//     { city: "London", temp: 280 },
//     { city: "Moscow", temp: 290 },
//     { city: "Bangalore", temp: 301.2 },
//     .......
//     ]

let getSortedCities = async function (req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray = []
        for (i = 0; i < cities.length; i++) {
            let obj = { city: cities[i] }
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=d407e13c56def28dc9acb2d359a91fa7`)
            console.log(resp.data.main.temp)

            obj.temp = resp.data.main.temp       //{temp= tempreature}
            cityObjArray.push(obj)

        }
        let sorted = cityObjArray.sort(function (a, b) { return a.temp - b.temp }) //for assending tempreature

         console.log(sorted)
        res.status(200).send({ status: true, data: sorted })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "server error" })
    }
}
let memeHandler = async function (req, res){

try{
    let options = {
        method: "post",
        url: "https://api.imgflip.com/caption_image?template_id=216951317&text0=PLEASE NO WAR&username=chewie12345&password=meme@123"
    }
    let result = await axios(options)
    res.send ({data: result.data})
    } catch (error) {
        console.log(error)
        res.status(500).send({status: false, msg: "server error"})
    }
}

module.exports.getSortedCities = getSortedCities
module.exports.memeHandler = memeHandler
    