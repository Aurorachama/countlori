const express = require('express');
const { addPreset, updatePreset, deletePreset, getAllPresets } = require('../controllers/presetsController');
const { isAdmin } = require('../middlewares/authenticator');

const router = express.Router();

router.get('/get', AuthenticatorJWT, isAdmin, getAllPresets);
router.post('/add', AuthenticatorJWT, isAdmin, addPreset);
router.put('/update/:id', AuthenticatorJWT, isAdmin, updatePreset);
router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deletePreset);

module.exports = router;