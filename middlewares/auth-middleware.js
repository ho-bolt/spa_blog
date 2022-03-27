const jwt = require("jsonwebtoken")
const { User } = require("../models/users")

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    console.log("미들웨어 들어옴")
    const [tokenType, tokenValue] = authorization.split(" ");
    console.log(tokenType)
    if (tokenType !== "Bearer") {
        res.status(401).send({
            success: false, msg: "로그인 후 사용하세요!;"
        });
        return;
    }
    //토큰 검증 
    //복호화 되면 유효한 토큰
    console.log("토큰 검증")
    try {
        const { userId } = jwt.verify(tokenValue, "my-key");
        console.log(userId)
        //db에서 해당 userId와 맞는 유저 찾아서 그 유저를 locals에 넣어준다.
        User.findById(userId).exec().then((user) => {
            console.log(user)
            res.locals.user = user;
            next();
        });

    } catch {
        res.send({
            success: false, msg: "로그인 후 !;"
        });
        return;
    }

};