const express = require('express');
const { getAllCaloriesData, addCaloriesData, updateCaloriesData, deleteCaloriesData } = require('../controllers/caloriesController');
const { AuthenticatorJWT } = require('../middlewares/authenticator');

const router = express.Router();

router.get('/get', AuthenticatorJWT, getAllCaloriesData);
router.post('/add', AuthenticatorJWT, addCaloriesData);
router.put('/update/:id', AuthenticatorJWT, updateCaloriesData);
router.delete('/delete/:id', AuthenticatorJWT, deleteCaloriesData);

module.exports = router;