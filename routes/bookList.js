const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { db } = require('../models/bookList');
const Book = require('../models/bookList')


//Read
router.get('/showBook', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const book = await Book.find()
                res.json(book)
            } catch (error) {
                res.send('Error ' + error)
            }
        }
    })
})
router.get('/showBook/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const book = await Book.findById(req.params.id)
                res.json(book)
            } catch (error) {
                res.send('Error ' + error)
            }
        }
    })
})

//Create
router.post('/addBook', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const book = new Book({
                name: req.body.name,
                image_url: req.body.image_url,
                author: req.body.author,
                pages: req.body.pages,
                price: req.body.price
            })
            try {
                const a1 = await book.save()
                res.json(a1)
            } catch (error) {
                res.send('Error ' + error)
            }
        }
    })
})

//Update
router.patch('/updateBook/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const id = req.params.id;
                const updates = req.body;
                const result = await Book.findByIdAndUpdate(id, updates)
                res.json(result)
            } catch (error) {
                res.send('Error ' + error)
            }
        }
    })
})

//Delete
router.delete('/deleteBook/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const book = await Book.findById(req.params.id)
                // book.name=req.body.name
                await book.remove()
                res.json('Item Deleted')
            } catch (error) {
                res.send('Error ' + error)
            }
        }
    })
})


//JWT 
//Generate Token
router.post('/user/login', (req, res) => {
    const user = {
        id: 1,
        username: 'user',
        email: 'user@gmail.com'
    }
    jwt.sign({ user}, 'secretkey', {expiresIn:'1d'},(err, token) => {
        res.json({
            token
        });
    });
});
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
    } else {
        res.sendStatus(403)
    }
}
module.exports = router