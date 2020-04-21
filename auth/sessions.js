

Router.post("/login", (req, res) => {
    let { username, password } = req.body; 

    Users.findBy({ username })
        .then(found => {
            if(found){
                // check that passwords match
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

router.get('/logout', (req, res) => {
    if(req.session){

    req.session.destroy(error => {
        if(error){
            res.status(500).json({ errorMessage: 'you can checkout any time you like...'})
        } else {
            res.status(204).end(); 
        }
    })
    } else {
        res.status(204).end(); 
    }

})

module.exports = router; 