import jwt from "jsonwebtoken";
import HttpError from "../util/http-error";
const checkAuth = (req, res, next) => {
try {
const token = req.headers.authorization.split(' ')[1]; 
if (!token) {
throw new Error('Authentication failed!');
}
const decodedToken = jwt.verify(token, 'cleSuperSecrete!');
req.userData = { userId: decodedToken.userId };
next();
} catch (err) {
const error = new HttpError('Authentication failed!', 401);
return next(error);
}
};
export default checkAuth