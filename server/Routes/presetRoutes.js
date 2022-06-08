const express = require('express');
const { addPreset, updatePreset, deletePreset, getAllPresets } = require('../controllers/presetsController');
const { AuthenticatorJWT } = require('../middlewares/authenticator');
const router = express.Router();

router.get('/get', AuthenticatorJWT, getAllPresets);
router.post('/add', AuthenticatorJWT, addPreset);
router.put('/update/:id', AuthenticatorJWT, updatePreset);
router.delete('/delete/:id', AuthenticatorJWT, deletePreset);

module.exports = router;