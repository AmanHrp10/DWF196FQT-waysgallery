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
  getMyProfile,
  deleteUser,
  updateUser,
} = require('../controllers/user');

//? Follow
const {
  addFollow,
  deleteFollow,
  getFollowId,
  getFollowingPost,
} = require('../controllers/follow');

//? Post
const {
  addPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostById,
  getPostToday,
  searchPost,
} = require('../controllers/post');

//? Photo
const { addPhoto, getAllPhoto } = require('../controllers/photo');

//? Art
const { addArt } = require('../controllers/art');

//? Hire
const {
  getHireById,
  createHire,
  approvedHire,
  rejectedHire,
  confirmProject,
} = require('../controllers/hire');

//? Transaction
const {
  getAllOffers,
  getOffer,
  getOrder,
} = require('../controllers/transaction');

//? Project
const {
  addProject,
  getProjectById,
  download,
} = require('../controllers/project');

//* set endpoint

//? Auth
router.post('/login', login);
router.post('/register', register);

//? Check Auth
router.get('/check-auth', Private, checkAuth);

//? User
router.get('/users', getAllUsers);
router.get('/user', Private, getMyProfile);
router.get('/user/:id', getUserById);
router.patch('/user', Private, uploadFile('avatar', null), updateUser);
router.delete('/user/:id', deleteUser);

//? Follow
router.get('/follow/:id', Private, getFollowId);
router.get('/follow', Private, getFollowingPost);
router.post('/follow/:id', Private, addFollow);
router.delete('/follow/:id', Private, deleteFollow);

//? Post
router.get('/posts', Private, getAllPost);
router.post('/search', searchPost);
router.get('/today', getPostToday);
router.get('/post/:id', Private, getPostById);
router.post('/post', Private, uploadFile('photos', null), addPost);
router.patch('/post/:id', Private, uploadFile('photos', null), updatePost);
router.delete('/post/:id', Private, deletePost);

//? Photo
// router.post('/photo', Private, uploadFile('image', null), addPhoto);
router.get('/photos', getAllPhoto);

//? Art
router.post('/art', Private, uploadFile('arts', null), addArt);

//? Hire
router.get('/hire/:id', Private, getHireById);
router.put('/hire/:id', Private, approvedHire);
router.delete('/hire/:id', Private, rejectedHire);
router.post('/hire/:id', Private, createHire);
router.put('/confirm-hire/:id', Private, confirmProject);

//? Transaction
router.get('/transaction', Private, getAllOffers);
router.get('/transaction/offer/:id', Private, getOffer);
router.get('/transaction/order/:id', Private, getOrder);

//? Add Project
router.post('/project/:id', Private, uploadFile('images', null), addProject);
router.get('/project/:id', Private, getProjectById);
router.get('/download/:id', Private, download);

module.exports = router;
