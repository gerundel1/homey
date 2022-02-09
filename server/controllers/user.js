const UserModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registrationSchema, loginSchema } = require('../helpers/validation');

const createUser = async (req, res) => {
    // server site validation
    try {
        const result = await registrationSchema.validateAsync(req.body);
    } catch (err) {
        //this returns an array of errors; ref -> https://joi.dev/api/?v=17.6.0#errors
        res.status(400).json({errorsArray: err.details});
    }

    // check if email is registered
    const foundUser = await UserModel.findOne({email: req.body.emai});
    if(foundUser) {
        res.status(406).json({message: "The user with that email is already exist"})
    } else {
        try {
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: password,
            type: req.body.type,
            phone: req.body.phone,
            address: req.body.address,
            cuisine: req.body?.cuisine
        });

        const token = jwt.sign(
            { user_id: newUser._id, email: req.body.email },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          newUser.token = token;
          res.status(201).json(newUser);
        } catch(error) {
            res.status(400).json(`Error occurred when create user in the database: ${ error }`);

        }
    }
}

const loginUser = async (req, res) =>{
    // validate input using schema
    // Please note that in case of failed validation it returns the array of errors: err.details
    // ref -> https://joi.dev/api/?v=17.6.0#errors
    try {
        await loginSchema.validateAsync(req.body);
    } catch (err) {
        res.status(400).json(err);
    }
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email: email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        res.status(400).json(`Error occurred when authenticating the user: ${ error }`);
      }
}


module.exports = {
    createUser,
    loginUser
}