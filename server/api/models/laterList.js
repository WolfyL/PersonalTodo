import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import token from '../token.js';

const hashCode = (s) => s.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    a & a;
}, 0);

const laterListSchema = new mongoose.Schema({
    laterListId: {
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
        }, (err, nowLists) => {
            if (err || !nowLists) {
                res.sendStatus(403);
            } else {
                res.json(nowLists);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, {
            password: 0
        }, (err, nowList) => {
            if (err || !nowList) {
                res.sendStatus(403);
            } else {
                res.json(nowList);
            }
        });
    }

    create(req, res) {
        if (req.body.password) {
            var salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        model.create(req.body,
            (err, nowList) => {
                if (err || !nowList) {
                    if (err.code === 11000 || err.code === 11001) {
                        err.message = "Email " + req.body.email + " already exist";
                    }
                    res.status(500).send(err.message);
                } else {
                    let tk = jsonwebtoken.sign(nowList, token, {
                        expiresIn: "24h"
                    });
                    res.json({
                        success: true,
                        nowList: nowList,
                        token: tk
                    });
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, req.body, (err, nowList) => {
            if (err || !nowList) {
                res.status(500).send(err.message);
            } else {
                let tk = jsonwebtoken.sign(nowList, token, {
                    expiresIn: "24h"
                });
                res.json({
                    success: true,
                    nowList: nowList,
                    token: tk
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
