function Contact(firstName, lastName) {
  if (!firstName && !lastName) throw 'new Contact: firstName or lastName must be specified';
  this._id = this.getNewId();
  this.firstName = firstName;
  this.lastName = lastName;
}

Contact.prototype.getNewId = function() {
  const random = Math.floor((1 + Math.random()) * 0x10000).toString();
  const random2 = Math.random().toString().slice(-5);
  const time = ((new Date()).getTime().toString().slice(-4)).toString();
  return +(random + random2 + time);
};

export default Contact;
