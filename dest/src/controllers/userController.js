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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const userValidation_1 = require("../validations/userValidation");
class UserController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstname, lastname, username, email, password, role } = req.body;
                const userData = yield (0, userValidation_1.validateUser)({ firstname, lastname, username, email, password, role });
                if ('validationErrors' in userData) {
                    const { validationErrors } = userData;
                    return res.status(400).json({ status: 'fail', validationErrors });
                }
                const user = yield user_1.User.create(userData);
                return res.status(201).json({ status: 'Success', data: user });
            }
            catch (error) {
                console.error('Error during signup:', error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
    static getAllUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.User.find().select('-password');
                return res.status(200).json({ status: 'success', data: users });
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const { firstname, lastname, username, email, password, role } = req.body;
                // Validate user input
                const updatedUserData = yield (0, userValidation_1.validateupdatedUser)({ firstname, lastname, username, email, password, role });
                if ('validationErrors' in updatedUserData) {
                    const { validationErrors } = updatedUserData;
                    return res.status(400).json({ status: "fail", validationErrors });
                }
                const updatedUser = yield user_1.User.findByIdAndUpdate(userId, updatedUserData, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({ status: 'fail', error: 'User not found' });
                }
                return res.status(200).json({ status: 'Success', data: updatedUser });
            }
            catch (error) {
                console.error('Error updating user:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                // Delete the user
                const deletedUser = yield user_1.User.findByIdAndDelete(userId);
                if (!deletedUser) {
                    return res.status(404).json({ status: "fail", error: 'User not found' });
                }
                return res.status(200).json({ status: 'Success', message: 'User successfully deleted' });
            }
            catch (error) {
                console.error('Error deleting user and associated comments:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = UserController;
