const express = require('express');
const router = express.Router();

//? Require middleware
const { auth: Private } = require('../middleware/authentication');
const { uploadFile } = require('../middleware/upload');

//* Require Controller
//? Auth
const { register, login } = require('../controllers/auth');

//? Check Auth
const { checkAuth } = require('../controllers/checkAuth');

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
const { addPhoto, getAllPhoto } = require('../controllers/photo');

//? Art
// const { addArt } = require('../controllers/art');

//? Hire
const {
  createHire,
  approvedHire,
  rejectedHire,
} = require('../controllers/hire');

//? Transaction
const { getAllOffers } = require('../controllers/transaction');

//? Project
const { addProject, getProjectById } = require('../controllers/project');

//* set endpoint

//? Auth
router.post('/login', login);
router.post('/register', register);

//? Check Auth
router.get('/check-auth', Private, checkAuth);

//? User
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.patch('/user/:id', Private, uploadFile('avatar', 'arts'), updateUser);
router.delete('/user/:id', deleteUser);

//? Post
router.get('/posts', Private, getAllPost);
router.get('/post/:id', Private, getPostById);
router.post('/post', Private, uploadFile('photos', null), addPost);
router.patch('/post/:id', Private, uploadFile('photos', null), updatePost);
router.delete('/post/:id', Private, deletePost);

//? Photo
// router.post('/photo', Private, uploadFile('image', null), addPhoto);
router.get('/photos', getAllPhoto);

//? Art
// router.post('/art', Private, addArt);

//? Hire
router.put('/hire/:id', Private, approvedHire);
router.delete('/hire/:id', Private, rejectedHire);
router.post('/hire/:id', Private, createHire);

//? Transaction
router.get('/transaction', Private, getAllOffers);

//? Add Project
router.post('/project/:id', Private, uploadFile('images', null), addProject);
router.get('/project/:id', Private, getProjectById);

module.exports = router;
