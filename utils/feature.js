import jwt from "jsonwebtoken";

export const sendCookies = (res, statusCode = 200, message, user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode) // Change 404 to 201 to indicate successful user creation
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true
    })
    .json({
      success: true,
      message
    });
};
