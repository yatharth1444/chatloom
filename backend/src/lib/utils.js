import  jwt  from "jsonwebtoken"
export const generateToken = (userId, res) =>{
    const {JWT_SECRET_KEY} = process.env
    if(!JWT_SECRET_KEY) throw new Error ("JWT SECRET KEY not configured")
    const token = jwt.sign({userId: userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    })
    res.cookie('jwt', token, {
        maxAge : 7*24*60*60*1000,
        httpOnly: true,
        someSite: "strict",
        secure: process.env.NODE_ENV === 'development' ? false :  true
    })
    return token
}