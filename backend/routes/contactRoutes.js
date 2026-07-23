const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const { contactValidationRules, validate } = require('../middleware/validateContact');

router.route('/')
  .get(getContacts)
  .post(contactValidationRules, validate, createContact);

router.route('/:id')
  .get(getContact)
  .put(contactValidationRules, validate, updateContact)
  .delete(deleteContact);

module.exports = router;
