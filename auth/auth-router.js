const router = require("express").Router(); 
const bcrypt = require("bcryptjs"); 
const jwt = require('jsonwebtoken'); // ----> npm i jsonwebtoken

const Users = require("../users/users-model.js"); 

router.post("/login", (req, res) => {
    let { username, password } = req.body; 

    Users.findBy({ username })
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)){
                //produce a token
                const token = generateToken(user); 

                // send the token to the client
                res.status(200).json({ message: "Welcome!", token }); 
            } else {
                res.status(401).json({ message: 'You cannot pass!'})
            }
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message });
        })
    
    // hash the user password

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved); 
        })
        .catch(error => {
            console.log(error); 
            res.status(500).json({ errorMessage: error.message }); 
        })
})

function generateToken(user) {
    // the data
    const payload = {
        userId: user.id, 
        username: user.username
    }; 

    const secret = process.env.JWT_SECRET || 'keep it secret, keep it safe!'; 

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options); 
}


// router.get('/logout', (req, res) => {
//     if(req.session){

//     req.session.destroy(error => {
//         if(error){
//             res.status(500).json({ errorMessage: 'you can checkout any time you like...'})
//         } else {
//             res.status(204).end(); 
//         }
//     })
//     } else {
//         res.status(204).end(); 
//     }

// })

module.exports = router; 