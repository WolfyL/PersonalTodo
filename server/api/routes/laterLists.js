import express from 'express';
import LaterList from '../models/laterList.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var laterList = new LaterList();

    router.get('/', Auth.hasAuthorization, laterList.findAll);

    router.get('/:id', Auth.hasAuthorization, laterList.findById);

    router.post('/', laterList.create);

    router.put('/:id', Auth.hasAuthorization, laterList.update);

    router.delete('/:id', Auth.hasAuthorization, laterList.delete);

    app.use('/later', router);

};
