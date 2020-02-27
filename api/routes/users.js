const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
      message: 'Handling Get requests to /users'
    });
});

router.post('/',(req,res,next) => {
    const user = {
        name: req.body.name,
        age: req.body.age
    };
    res.status(200).json({
      message: 'Handling Post requests to /users',
      createdUser: user
    });
});

router.get('/:userId',(req,res,next) => {
    const id = req.params.userId;
    if ( id == 'special'){
        res.status(200).json({
            message: 'you discovered the special id',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'you passed an id',
            id: id
        });
    }
});
module.exports = router;