import express from 'express';
import { addContact, getContact, getContacts, deleteContact } from './api/contacts';
import { sendMessage, getSentMessages, getInboxes } from './api/messages';

import { validateContact } from './validations/contacts';
import { validateMessage } from './validations/message';

const router = express.Router();

router.route('/contacts')
  .post(validateContact, addContact)
  .get(getContacts)

router.route('/contacts/:id')
  .get(getContact)
  .delete(deleteContact)

router.route('/sms')
  .post(validateMessage, sendMessage)

router.route('/sent/:id')
  .get(getSentMessages)

router.route('/inbox/:id')
  .get(getInboxes)

export default router;
