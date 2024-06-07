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
exports.userRouter = exports.verifyToken = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const errors_1 = require("../errors");
// ======================
// CREATE A NEW USER
// ======================
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        // const user = await UserModel.findOne({ username });
        const emailExists = yield user_1.UserModel.findOne({ email });
        // Check if the user already exists
        // if (user) {
        //   return res.status(400).json({ type: UserErrors.USER_ALREADY_EXISTS });
        // } else {
        if (emailExists) {
            return res.status(400).json({ type: errors_1.UserErrors.EMAIL_ALREADY_EXISTS });
        }
        // }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        res.json({ message: 'User created successfully' });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
}));
// ======================
// LOGIN A USER
// ======================
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({ email });
        // Check if the user exists
        if (!user) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
        // Check if the password is correct
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ type: errors_1.UserErrors.WRONG_CREDENTIALS });
        }
        // Generate a token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, 'secret');
        res.json({ token, UserID: user._id });
    }
    catch (err) {
        return res.status(500).json({ type: err });
    }
}));
//Verify the token
const verifyToken = (req, res, next) => {
    const authHeader = req.header('authorization');
    if (authHeader) {
        jsonwebtoken_1.default.verify(authHeader, 'secret', (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }
    else {
        return res.sendStatus(401);
    }
};
exports.verifyToken = verifyToken;
//  ======================
// GET USER AVAILABLE MONEY
// ======================
router.get('/available-money/:userID', exports.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    try {
        const user = yield user_1.UserModel.findById(userID);
        if (!user) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
        res.json({ availableMoney: user.availableMoney });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}));
//  ======================
// GET USER INFO
// ======================
router.get('/user-info/:userID', exports.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    try {
        const user = yield user_1.UserModel.findById(userID);
        if (!user) {
            return res.status(400).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}));
