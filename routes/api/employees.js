const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');

router
  .route('/')
  .get((req, res) => {
    res.status(200).json(data.employees);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });

router.route('/:id').get((req, res) => {
  const { id } = req.params;
  const person = data.employees.find((e) => e.id === Number(id));

  res.json(person);
});

module.exports = router;
