const md5 = require("md5");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
// const OTPModel = require("../models/OTPModel");
const EmailSend = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");
const ObjectId = mongoose.Types.ObjectId;

//! User Service
const RegisterUserService = async (req) => {
  try {
    let reqBody = req.body;
    // reqBody.password = md5(req.body.password);
    let data = await UserModel.create(reqBody);
    if (!!data === true) {
      let innerReqBody = {
        userID: data._id,
      };
      let profile = await ProfileModel.create(innerReqBody);
      return { status: true, data: profile };
    } else {
      return { status: false, data: data };
    }
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

// const LoginUserService = async (req, res) => {
//   try {
//     let reqBody = req.body;
//     // reqBody.password = md5(req.body.password);
//     let data = await UserModel.aggregate([
//       { $match: reqBody },
//       { $project: { _id: 1, email: 1 } },
//     ]);

//     if (data.length > 0) {
//       let Token = EncodeToken(data[0]);

//       let options = {
//         maxAge: process.env.Cookie_Expire_Time,
//         httpOnly: true,
//         sameSite: 'none',
//         secure: true,
//       };

//       // Set cookie
//       res.cookie("Token", Token, options);
//       return { status: true, Token: Token, data: data[0] };
//     } else {
//       return { status: "unauthorized", data: data };
//     }
//   } catch (error) {
//     return { status: false, error: error.toString() };
//   }
// };

// const VerifyUserService = () => {
//   try {
//     return { status: true }

//   } catch (e) {
//     return { status: false, error: e.toString() };
//   }
// }

// const ProfileUpdateUserService = async (req) => {
//   let email = req.headers.email;
//   // let password = md5(req.body.password);
//   let password = req.body.password;

//   let reqBodyUser = {
//     password,
//   };

//   let reqBodyProfile = {
//     cus_add: req.body.cus_add,
//     cus_city: req.body.cus_city,
//     cus_country: req.body.cus_country,
//     cus_fax: req.body.cus_fax,
//     cus_name: req.body.cus_name,
//     cus_phone: req.body.cus_phone,
//     cus_postcode: req.body.cus_postcode,
//     cus_state: req.body.cus_state,
//     ship_add: req.body.ship_add,
//     ship_city: req.body.ship_city,
//     ship_country: req.body.ship_country,
//     ship_name: req.body.ship_name,
//     ship_phone: req.body.ship_phone,
//     ship_postcode: req.body.ship_postcode,
//     ship_state: req.body.ship_state,
//   };

//   try {
//     let dataUser = await UserModel.updateOne(
//       { email: email },
//       {
//         $set: reqBodyUser,
//       }
//     );

//     let findUser = await UserModel.aggregate([
//       { $match: { email: email } },
//       { $project: { _id: 1, email: 1 } },
//     ]);

//     let dataProfile = await ProfileModel.updateOne(
//       { userID: findUser[0]._id },
//       {
//         $set: reqBodyProfile,
//       }
//     );

//     return { status: true, dataUser, dataProfile };
//   } catch (error) {
//     return { status: false, error: error.toString() };
//   }
// };

// const ProfileReadUserService = async (req) => {
//   let email = req.headers.email;

//   try {
//     let MatchStage = {
//       $match: {
//         email,
//       },
//     };
//     let JoinWithProfileStage = {
//       $lookup: {
//         from: "profiles",
//         localField: "_id",
//         foreignField: "userID",
//         as: "profile",
//       },
//     };

//     let Project = {
//       $project: {
//         password: 0,
//       },
//     };
//     let data = await UserModel.aggregate([
//       MatchStage,
//       JoinWithProfileStage,
//       Project,
//     ]);
//     return { status: true, data: data };
//   } catch (error) {
//     return { status: false, error: error.toString() };
//   }
// };

// const LogoutUserService = async (req, res) => {

//   try {
//     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
//     res.setHeader('Surrogate-Control', 'no-store');
//     let options = {
//       httpOnly: true,
//       sameSite: 'none',
//       secure: true,
//       path: '/',
//     };
//     res.cookie('Token', '', { ...options, maxAge: 0 });
//     res.clearCookie('Token', options);
//     return { status: true };
//   } catch (error) {
//     return { status: false, error: e.toString() };
//   }
// };

// const EmailVerifyUserService = async () => {
//   try {
//     return { status: "success" };
//   } catch (e) {
//     return { status: false, error: e.toString() };
//   }
// };

// const RecoverVerifyEmailUserService = async (req) => {
//   let email = req.params.email;
//   let otp = Math.floor(100000 + Math.random() * 900000);

//   try {
//     // Email Account Query
//     let UserCount = await UserModel.aggregate([
//       { $match: { email: email } },
//       { $count: "total" },
//     ]);

//     if (UserCount.length > 0) {
//       //Create OTP
//       let CreateOTP = await OTPModel.updateOne(
//         { email: email },
//         {
//           otp,
//           status: 0,
//         },
//         { upsert: true, new: true }
//       );
//       // Send Email
//       let SendEmail = await EmailSend(
//         email,
//         "Your PIN Code is =" + otp,
//         "Task Manager PIN Verification"
//       );
//       return { status: true, data: SendEmail };
//     } else {
//       return { status: false, data: "No User Found" };
//     }
//   } catch (error) {
//     return { status: false, error: error.toString() };
//   }
// };

// const RecoverVerifyOTPUserService = async (req) => {
//   let email = req.params.email;
//   let otp = req.params.otp;
//   otp = parseInt(otp);
//   try {
//     let OTPCount = await OTPModel.aggregate([
//       { $match: { email, otp, status: 0 } },
//       { $count: "total" },
//     ]);

//     if (OTPCount.length > 0) {
//       let OTPUpdate = await OTPModel.updateOne(
//         {
//           email,
//           otp,
//           status: 0,
//         },
//         {
//           otp,
//           status: 1,
//         }
//       );
//       return { status: true, data: OTPUpdate };
//     } else {
//       return { status: false, data: "Invalid OTP Code" };
//     }
//   } catch (error) {
//     return { status: false, error: error.toString() };
//   }
// };

// const ResetPasswordUserService = async (req) => {
//   let email = req.params.email;
//   let otp = req.params.otp;
//   otp = parseInt(otp);
//   let reqBody = {
//     password: req.body.password, //! working .....
//   };
//   // reqBody.password = md5(req.body.password);
//   try {
//     let OTPUsedCount = await OTPModel.aggregate([
//       { $match: { email, otp, status: 1 } },
//       { $count: "total" },
//     ]);
//     if (OTPUsedCount.length > 0) {
//       let PassUpdate = await UserModel.updateOne(reqBody);
//       let OTPUpdate = await OTPModel.updateOne(
//         {
//           email,
//           otp,
//           status: 1,
//         },
//         {
//           otp: null,
//           status: 0,
//         }
//       );
//       return { status: true, data: PassUpdate };
//     } else {
//       return { status: false, data: "Something is Wrong!" };
//     }
//   } catch (error) {
//     return { status: false, error: error.toString() };
//   }
// };

module.exports = {
  RegisterUserService,
  // LoginUserService,
  // ProfileUpdateUserService,
  // ProfileReadUserService,
  // LogoutUserService,
  // EmailVerifyUserService,
  // RecoverVerifyEmailUserService,
  // RecoverVerifyOTPUserService,
  // ResetPasswordUserService, 
  // VerifyUserService
};
