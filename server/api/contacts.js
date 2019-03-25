import People from '../lib/contacts';

const new_contact = new People();

export const addContact = async ({ body: { name, phone_num } }, res) => {
  const isContact = await People.findOne({ $or: [{ name }, { phone_num }] });

  if (!isContact) {
    new_contact.name = name;
    new_contact.phone_num = phone_num;
    new_contact.save((err, result) => {
      if (err) return res.status(500).send({ message: 'Sorry, user cannot be saved' })
      return res.status(201).send({
        message: 'Contact saved successfully',
        data: {
          name,
          phone_num,
        },
      });
    });
    return;
  }
  return res.status(409).send({
    message: 'Name or phone already exist. Please update your account instead!',
  });
}

export const getContacts = (req, res) => {
  People.find().then((result) => {
    return res.status(200).send({
      users: result,
    })
  }).catch((err) => {
    return res.status(500).send({
      message: err,
    })
  })
}

export const getContact = ({ params: { id } }, res) => {
  People.findOne({_id: id}).then((result) => {
    return res.status(200).send({
      contact: result,
    })
  }).catch((err) => {
    return res.status(500).send({
      message: err,
    })
  })
}

export const deleteContact = ({params: { id } }, res) => {
  People.findOneAndDelete({ _id: id }).then((result) => {
    return res.status(200).send({
      message: 'Contact Deleted!',
    });
  }).catch((err) => {
    return res.status(404).send({
      message: 'User not found',
    });
  });
};
