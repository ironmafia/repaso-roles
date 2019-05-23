const express = require('express');
const router  = express.Router();

const isRole = (user,role) => user && user.role === role

router.get('/', (req, res, next) => {
  res.render('index', {artist: isRole(req.user,"Artist"),
                      backliner: isRole(req.user,"Backliner"),
                      fan: isRole(req.user, "Fan")
                      });
});

module.exports = router;
