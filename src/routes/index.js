const express = require('express');
const router = express.Router();

//? Require middleware
const { auth: Private } = require('../middleware/authentication');
const { UploadFile } = require('../middleware/upload');

//* Require Controller
//? Auth
const { register, login } = require('../controllers/auth');

//? User

const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require('../controllers/user');

//? Post
const { addPost, getAllPost } = require('../controllers/post');

//? Photo
const { addPhoto } = require('../controllers/photo');

//? Art
const { addArt } = require('../controllers/art');

//* set endpoint

//? Auth
router.post('/login', login);
router.post('/register', register);

//? User
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.patch('/user/:id', UploadFile('avatar'), updateUser);
router.delete('/user/:id', deleteUser);

//? Post
router.post('/post', Private, addPost);
router.get('/posts', Private, getAllPost);

//? Photo
router.post('/photo', Private, UploadFile('image'), addPhoto);

//? Art
router.post('/art', Private, addArt);

module.exports = router;
