const fs = require('fs');
var turf = require('@turf/turf');
const express = require('express');
const { body } = require('express-validator');
const { ServerError } = require('../errors/error');
const requestValidator = require('../middleware/request-validator');
const currentUser = require('../middleware/current-user');
const authentication = require('../middleware/authetication');
const router = express.Router();

const sampleLinesDB = JSON.parse(fs.readFileSync('./lines.json'));

router.post(
  '/',
  currentUser,
  authentication,
  [body('coordinates').isArray()],
  requestValidator,
  async (req, res, next) => {
    try {
      const out = [];
      const inputLine = turf.lineString(req.body.coordinates);

      sampleLinesDB.forEach((ele, index) => {
        const compareLine = turf.lineString(ele.line.coordinates);
        if (turf.booleanIntersects(inputLine, compareLine)) {
          out.push({
            id: index + 1,
            poi: turf.lineIntersect(inputLine, compareLine),
          });
        }
      });

      res.json(out);
    } catch (err) {
      next(new ServerError());
    }
  }
);

module.exports = router;
