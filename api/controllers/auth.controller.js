import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required")); //需要自己返回错误信息
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error); // 输出mongo的错误信息
  }
};

/**1. 判空
 * 2. 鉴别用户
 * 3. 生成token
 * 4. 响应客户端
 */
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  // 1. 判空
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    // 2. 鉴别用户
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    // 3. 生成token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // 4. 将token发送给客户端
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true, //只能浏览器拿取
      })
      .json(rest);
  } catch (error) {
    next(error); // mongo返回的错误
  }
};

/**修改图片的 url和 key */
export const updateImg = async (req, res, next) => {
  const { profilePicture, imgKey, email } = req.body;
  try {
    User.findOneAndUpdate(
      { email },
      {
        $set: {
          profilePicture: profilePicture,
          imgKey: imgKey,
        },
      }
    );
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
