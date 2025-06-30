// ogical code lekham hai tw

/* 

REGISTER/SIGNUP

   - incoming data --> userName, email, password 
   - processing / checking --> email valid, required
   - db query  --> CRUD

LOGIN/SIGNIN
LOGOUT
FORGOT_PASSWORD
RESET_PASSWORD/OTP

*/

import { Request, response, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envConfig } from "../../../config/config";
// import { register } from "module";

// JSON data --> req.body()   //username, email, password
// FILES --> req.file/files

class AuthController {
  async registerUser(req: Request, res: Response) {
    console.log(req.body);
    if (req.body === undefined) {
      res.status(400).json({
        message: "No data was sent",
      });
      return;
    }
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        message: "Please provide the username, email, password",
      });
      return;
    }

    // const [data] = await User.findAll({
    //   where: {
    //     email
    //   }
    // })
    // if(data){

    // }

    // enter into user's table
    await User.create({
      username: username,
      password: bcrypt.hashSync(password, 12),
      email: email,
    });
    res.status(200).json({
      message: "User registered sucessfully",
    });
  }

  /* login flow:

email/username/password (basic)
---- email,password -- data accept --validaton -->
---- first check email exiat or not (Verification)
---- check password now -- registered/not_registered
---- if email verify --- yes  -- check passowrd now --- if milyo vaney --- token_generation(jsonwebtoken)
googlr,fb,github (open-auth)
email login (sso)

  */

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please prvide email and password",
      });                                                      
      return;
    }
    // check email exist or not
    const data = await User.findAll({
      //-> this will give you array
      where: {
        email,
        // select * from User where email = "samrat@gmail.com";
      },
    });
    if (data.length == 0) {
      res.status(404).json({
        message: "Email not registered, please register first",
      });
    } else {
      // check password   ---> password lai pahila hash ma lagney ----> ani dubai hash lai compare garney  (compareSync, compare)
      // compareSync(plain_password, registered hashed password)
      const isPasswordMatch = bcrypt.compareSync(password, data[0].password);
      const securityKey = envConfig.jwtSecret || "defaultSecretKey";
      

      if (isPasswordMatch) {
        //  login vayo, token generation
       const token =  jwt.sign({id: data[0].id}, securityKey,{expiresIn: "30Days"});
       console.log("Token generated: ", token);
        // send token to client
        res.json({
          token: token,
          message: "Login successful"
        })
        res.cookie("token", token)
      } else {
        res.status(401).json({
          message: "Invalid email or password",
        });
      }
    }
  }



  // const registerUser = async (req: Request, res: Response) => {
  //   console.log("I am consoling me !");
  //   const { username, email, password } = req.body;

  //   if (!username || !email || !password) {
  //     res.status(400).json({
  //       message: "Please provide the username, email, password",
  //     });
  //     return;
  //   }
  //   // enter into user's table
  //   await User.create({
  //     username: username,
  //     password: password,
  //     email: email,
  //   });
  //   res.status(200).json({
  //     message: "User registered sucessfully",
  //   });
  // };
}
const Authc = new AuthController();
export default Authc;

// const AuthC = new AuthController();
// export default AuthC;

// export default AuthController;
