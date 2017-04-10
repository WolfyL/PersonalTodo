import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import token from '../token.js';

const laterListSchema = new mongoose.Schema({
    user: {
        type: String
    },
    elementLater: String,
    date: {
        type: Date,
        default: Date.now
    }
});


let model = mongoose.model('LaterList', laterListSchema);

export default class laterList {

    findAll(req, res) {
        model.find({}, {
            password: 0
        }, (err, laterLists) => {
            if (err || !laterLists) {
                res.sendStatus(403);
            } else {
                res.json(laterLists);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, laterList) => {
            if (err || !laterList) {
                res.sendStatus(403);
            } else {
                res.json(laterList);
            }
        });
    }

    create(req, res) {
        if (req.body.password) {
            var salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        model.create(req.body,
            (err, laterList) => {
                if (err || !laterList) {
                    if (err.code === 11000 || err.code === 11001) {
                        err.message = "Email " + req.body.email + " already exist";
                    }
                    res.status(500).send(err.message);
                } else {
                    let tk = jsonwebtoken.sign(laterList, token, {
                        expiresIn: "24h"
                    });
                    res.json({
                        success: true,
                        laterList: laterList,
                        token: tk
                    });
                }
            });
    }

    update(req, res) {
        model.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, laterList) => {
            if (err || !laterList) {
                res.status(500).send(err.message);
            } else {
                res.json({
                    success: true,
                    laterList: laterList
                });
            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
