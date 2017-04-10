import express from 'express';
import NowList from '../models/nowList.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var nowList = new NowList();

    router.get('/', Auth.hasAuthorization, nowList.findAll);

    router.get('/:id', Auth.hasAuthorization, nowList.findById);

    router.post('/', nowList.create);

    router.put('/:id', Auth.hasAuthorization, nowList.update);

    router.delete('/:id', Auth.hasAuthorization, nowList.delete);

    app.use('/now', router);

};
