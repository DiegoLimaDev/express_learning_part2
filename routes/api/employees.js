const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(employeesController.creteNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

router.route('/:id').get(employeesController.getEmployeeByID);

module.exports = router;
