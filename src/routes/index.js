const express = require('express');
const router = express.Router();

//? Require middleware
const { auth: Private } = require('../middleware/authentication');
const { uploadFile } = require('../middleware/upload');

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
const {
  addPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostById,
} = require('../controllers/post');

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
router.patch('/user/:id', uploadFile('avatar', null), updateUser);
router.delete('/user/:id', deleteUser);

//? Post
router.get('/posts', Private, getAllPost);
router.get('/post/:id', Private, getPostById);
router.post('/post', Private, uploadFile('photos', null), addPost);
router.patch('/post/:id', Private, uploadFile('photos', null), updatePost);
router.delete('/post/:id', Private, deletePost);

//? Photo
// router.post('/photo', Private, uploadFile('image', null), addPhoto);

//? Art
router.post('/art', Private, addArt);

module.exports = router;
