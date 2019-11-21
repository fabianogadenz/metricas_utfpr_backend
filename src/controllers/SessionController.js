const User = require('../models/User');


module.exports= {
    async store(req, res){ 
        const email = req.body.email; 
        const name = req.body.name

        let user = await User.findOne({email: email});

        if(!user){
            user = await User.create({email, name});
        }

        return res.json(user);
    }
};