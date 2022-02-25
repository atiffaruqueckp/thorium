const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

// you will be given an array of persons ( i.e an array of objects )..each person will have a
//  {name: String , age: Number, votingStatus: true/false(Boolean)}
// take input in query param as votingAge..and for all the people above that age, change 
// votingStatus as true
// also return an array consisting of only the person that can vote
//  take this as sample for array of persons:
let persons= [
 {
 name: "atif",
 age: 10,
 votingStatus: false
},
{
 name: "ram",
 age: 20,
 votingStatus: false
},
{
 name: "mohan",
 age: 70,
 votingStatus: false
},
{
 name: "sita",
 age: 5,
 votingStatus: false
},
{
 name: "ha",
 age: 40,
 votingStatus: false
}
]

router.post("/post-query-3", function (req, res){
    let input = req.query.input;
    //if the age is above 18
    let finalArray = [];
    for(let i=0; i<persons.length; i++){
        if(persons[i].age >= input){
            persons[i].votingStatus = true
            finalArray.push(persons[i])
    }
    
    }
    if (finalArray.length>0){
        return res.send(finalArray)
    }

})
module.exports = router;