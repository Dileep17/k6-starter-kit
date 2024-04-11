const { Router} =  require('express');
const router = Router();

const { getUsers, createUser } = require('../controllers/user.controller');
const { getSong, createSong } = require('../controllers/song.controller');
const { getFav, createFav } = require('../controllers/fav.controller');
const { getRandomFail, createRandomFail } = require('../controllers/randomFail.controller');

router.get('/user',getUsers);
router.post('/user',createUser);

router.get('/randomFail',getRandomFail);
router.post('/randomFail',createRandomFail);

router.get('/song',getSong);
router.post('/song',createSong);

router.get('/fav',getFav);
router.post('/fav',createFav);

module.exports = router;