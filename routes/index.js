var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    router: [
      {
        name: 'rooms',
        list: 'http://localhost:3000/rooms',
        detail: 'http://localhost:3000/rooms/61670e983a0733ea003bed90',
        query: [
          'http://localhost:3000/rooms?price=-1',
          'http://localhost:3000/rooms?createAt=1',
          'http://localhost:3000/rooms?price=1&createAt=1'
        ]
      },
      {
        name: 'hotels',
        list: 'http://localhost:3000/hotels',
        detail: 'http://localhost:3000/hotels/61670e983a0733ea003bed90',
        query: [
          'http://localhost:3000/hotels?page=2&limit=10&location=somethinh&type=somethinh&rating=7',
        ]
      }
    ],
    sort: {
      asc: 1,
      desc: -1
    }
  })
});

module.exports = router;
