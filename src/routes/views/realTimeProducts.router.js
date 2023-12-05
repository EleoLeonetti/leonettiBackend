const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    res.render('realTimeProducts', {
      title: 'Programación Backend',
    })
  });


module.exports = router;