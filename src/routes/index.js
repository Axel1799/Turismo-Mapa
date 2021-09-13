const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html', { title: 'First Website'});
    
});

router.get('/mapa', (req, res) => {
    res.render('mapa.html');
    
});

module.exports = router;