import express from 'express';
import { addContact, getContact, getContacts, deleteContact } from './api/contacts';

import { validateContact } from './validations/contacts';

const router = express.Router();

router.route('/contacts')
  .post(validateContact, addContact)
  .get(getContacts)

router.route('/contacts/:id')
  .get(getContact)
  .delete(deleteContact)

export default router;
