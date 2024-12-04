
import { response } from 'express';
import Contact from '../models/contact-model.js';
import User from '../models/user-model.js'

// FOR USERS

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users) {
            console.log(users)
            return res.status(404).json({ message: 'users not found' });
        }
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

// FOR CONTACTS

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts)
        if (!contacts) {
            return res.status(404).json({ message: 'No Contact Found' })
        }
        return res.status(200).json(contacts)
    } catch (error) {
        next(error);
    }
};

// for user delete

export const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: 'user delete successfully' })
    } catch (error) {
        next(error)
    }
};

// for single User

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error)
    }
};

//  for User Update

export const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = await req.body;
        const updateData = await User.updateOne({ _id: id }, { $set: updatedUserData });

        return res.status(200).json(updateData);
    } catch (error) {
        next(error)
    }
}