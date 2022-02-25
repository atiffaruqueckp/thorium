const express = require("express");
const router = express.Router();
let players = [
    {
        "name": "atif",
        "dob": "1/1/1996",
        "gender": "male",
        "city": "ckp",
        "sports": ["cricket"],
        "booking": [{
            "bookingNumber": "1",
            "sportId": "1",
            "centerId": "1",
            "type": "private",
            "slot": "3258867545600",
            "bookedOn": "15/07/2021",
            "bookedFor": "16/08/2021"
        }]
    },
    {

        "name": "danish",
        "dob": "1/1/1986",
        "gender": "male",
        "city": "tata",
        "sports": ["cricket"],
        "booking": [{
            "bookingNumber": "1",
            "sportId": "1",
            "centerId": "1",
            "type": "private",
            "slot": "3258867545600",
            "bookedOn": "15/07/2021",
            "bookedFor": "16/08/2021"
        }]
    },
    {
        "name": "ajay",
        "dob": "1/3/1999",
        "gender": "male",
        "city": "gurgaon",
        "sports": ["cricket"],
        "booking": [{
            "bookingNumber": "1",
            "sportId": "1",
            "centerId": "1",
            "type": "private",
            "slot": "3258867545600",
            "bookedOn": "15/07/2021",
            "bookedFor": "16/08/2021"
        }]
    },
    {

        "name": "ram",
        "dob": "9/3/1996",
        "gender": "male",
        "city": "mumbai",
        "sports": ["chess"],
        "booking": [{
            "bookingNumber": "1",
            "sportId": "1",
            "centerId": "1",
            "type": "private",
            "slot": "3258867545600",
            "bookedOn": "15/07/2021",
            "bookedFor": "16/08/2021"
        }]

    },
    {

        "name": "rahul",
        "dob": "1/8/1996",
        "gender": "male",
        "city": "delhi",
        "sports": ["football"],
        "booking": [{
            "bookingNumber": "1",
            "sportId": "1",
            "centerId": "1",
            "type": "private",
            "slot": "3258867545600",
            "bookedOn": "15/06/2021",
            "bookedFor": "16/07/2021"
        }]
    }


]

router.post("/players", function (req, res) {

    let value = req.body.name
    let flag = true
    for (let i = 0; i < players.length; i++) {
        if (players[i].name === value) {
            flag = false
            res.send("Error player name already exist");
        }
    }

    if (flag === true) {
        players.push(req.body);
        res.send(players);
    }

})


router.post("/:playerName/bookings/:bookingid", function (req, res) {
    let name = req.params.playerName
    let id = req.params.bookingId
    let value = req.body
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == name) {
            let arr = players[i].bookings
            if (arr[j].bookingNumber != id) {
                arr.push(value)
                res.send(players)
            } else {
                res.send("booking ID already exists")
            }
        }
}
res.send("name does not exist")
}

),

module.exports = router;