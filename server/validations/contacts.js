export const validateContact = (req, res, next) => {
  const { name, phone_num } = req.body;
  const errors = {};

  if (!name) {
    errors.name = 'Name is required';
  } else {
    if (!/^[a-zA-Z ]+$/.test(name)) {
      errors.name = "Name can only contain letters";
    }
  }
  if (!phone_num) {
    errors.phone_num = "Phone number is required"
  } else {
    if (!/^[0-9 ]+$/.test(phone_num)) {
      errors.phone_num = "Phone can only contain number";
    }
  }

  const isValid = Object.values(errors).length === 0;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  next();
}