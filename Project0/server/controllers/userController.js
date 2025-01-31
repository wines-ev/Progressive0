import { db } from '../dbConnect.js';
import { ObjectId } from 'mongodb';
import brcypt from 'bcrypt';

const collection = db.collection('users');

export const test = async (req, res) => {
    try { 
        const result = await collection.find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const user = req.body;
        user.password = await brcypt.hash(user.password, 10);
        const result = await collection.insertOne(user);
        res.status(201).json(result);
    } catch (error) {
        next({status: 500, message: error.message});
    }
}


export const getUserById = async (req, res, next) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        const result = await collection.findOne({ _id: id });

        if (!result) {
            return next({status: 404, message: error.message});
        } else {
            res.status(200).json(result);
        }
    }
    catch (error) {
        next({status: 500, message: error.message});
    }
};

export const getUsers = async (req, res) => {
    try {
        const result = await collection.find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {

        if (req.body.password) {
            req.body.password = await brcypt.hash(req.body.password, 10);
        }

        const id = ObjectId.createFromHexString(req.params.id);
        const user = {
            ...req.body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const result = await collection.updateOne({ _id: id }, { $set: user });

        if (result.modifiedCount === 0) {
            return next({status: 500, message: "Nothing to update"});
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        next({status: 500, message: error.message});
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        const result = await collection.deleteOne({ _id: id });      
        if (result.deletedCount === 0) {
            return next({status: 404, message: error.message});
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        next({status: 500, message: error.message});
    }
}