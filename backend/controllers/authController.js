const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




           //auth for Signup

exports.signup = async (req, res) => {
        try{
            const {
                name,
                email,
                password,
                role,
            }  = req.body;

            // Validation/ check all  fieds 
      if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'All fields are required' });
    }

    if(password.length <6){
        return res.status(400).json({
            error:'Passsword must be al least 6 characters'
        });
    }

    //check if user exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            error:'User already exists with this Email'
        });
    }


    //hash the password id user does not esistists alresdy
    const hashPassword = await bcrypt.hash(password, 10);

    // now Create the User 
    const user  =  new User({
             name,
             email,
             password:hashPassword,
             role: role || 'user'
    });

    //Generate token

    const token = jwt.sign({
        id:user_id
    },
     process.env.JWT_SECRET,{
    expiresIn: '30d'
});
     
res.status(201).json({
    token,
    user :{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    },
});

        }catch(error){
            console.log("Error in signing up",error);
            res.status(500).json({
                error:"Server error during signing up"
            })
        };
}



             //Auth for Login 

exports.login = async (req, res) => {

    try{
        const  {email, password} = req.body;

        //Validate the user
        if(!email || !password) {
            return res.status(400).json({
                error:"email and password are required "
            });
        }

                // FInd the uer 
        const user  = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                error: "Invlalid Email or Password"
            });
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                error: 'Invalid Password'
            })
        }

        //Generate Token

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });



    }
    catch(error){
        return  res.staus(500).json({
                  error:"Server Error"
        });
    }

}



      //auth for get me

      exports.getMe = async (req, res) => {
        try{
            const user =  await User.findOne(req.userId).select('-password');
            res.json(user);
        }catch(error){
            return res.status(500)({error: 'server error'})
        }
      }   