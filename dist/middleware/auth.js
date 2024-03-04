"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
//enviroment variables
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET || "secret"; //secret key for jwt token it has a default value of "secret"
const currentTimestamp = Math.floor(Date.now() / 1000); //current timestamp in seconds for checking if token is expired
// const used for checking if the request is authorized by checking the token at authorization header
// if the token is valid it will proceed to the next middleware
// if the token is invalid it will return an error
// if the token is expired it will refresh the token and proceed to the next middleware
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }
        if (isTokenExpired(token)) {
            console.log("token expired, refreshing.....");
            token = refreshToken(token);
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.body.loggedUser = decoded;
        console.log("decoded token ", req.body.loggedUser);
        next();
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// const used for generating a new token with the user's email and role as payload
// the token will expire in 24 hours by deafult or any value set in the .env file
// if the there is an error in generating the token it will throw an error
const generateToken = (user) => {
    console.log("generating  new token");
    try {
        const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, secretKey, {
            expiresIn: process.env.JWT_EXPIRATION_TIME || "24h",
        });
        return token;
    }
    catch (error) {
        throw error;
    }
};
// const used for checking if the user has any of the required roles for accessing a resource
// if the user has any of the required roles it will proceed to the next middleware
// if the user does not have any of the required roles it will return an error
// or if the user is not logged in it will return an error
const hasAnyRole = (...requiredRoles) => (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Not logged in" });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: err.message });
        }
        if (!isJwtPayload(decoded) || !requiredRoles.includes(decoded.role)) {
            return res.status(403).json({
                message: "You do not have the authorization and permissions to access this resource.",
            });
        }
        next();
    });
};
//Auxilar functions
// axuilar function for checking if the decoded token is a jwt payload 
// it will return true if the decoded token has a role property
// it is used at the hasyAnyRole function
function isJwtPayload(decoded) {
    return decoded && typeof decoded === "object" && "role" in decoded;
}
// auxilar function for checking if the token is expired
// it will return true if the token is expired or false if it is not
// it is used at the auth function
function isTokenExpired(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log("current expiration time ", decoded.exp);
        return decoded.exp < currentTimestamp;
    }
    catch (error) {
        return true;
    }
}
// axuilar function for refreshing the token
// it will return a new token with the same email and role as payload
// it is used at the auth function
function refreshToken(token) {
    console.log("refreshing token....");
    const tokenPayload = jsonwebtoken_1.default.decode(token);
    return generateToken({
        email: tokenPayload.email,
        role: tokenPayload.role,
    });
}
// const used for exporting the functions in order to be used in other files
const authServices = {
    auth,
    generateToken,
    hasAnyRole,
};
exports.default = authServices;
