import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import token from '../token.js';

const nowListSchema = new mongoose.Schema({
    user: {
        type: String
    },
    elementNow: String,
    date: {
        type: Date,
        default: Date.now
    }
});


let model = mongoose.model('NowList', nowListSchema);

export default class nowList {

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
                    });
                }
            });
    }

    update(req, res) {
      console.log('body', req.body);
        model.findByIdAndUpdate({
                _id: req.params.id
            }, req.body, (err, nowList) => {
                if (err || !nowList) {
                    res.status(500).send(err.message);
                } else {
                res.json({
                    success: true,
                    nowList: nowList,
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
