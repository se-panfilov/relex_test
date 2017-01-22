function Contact (firstName, lastName, contactsArr) {
  if (!firstName && !lastName) throw 'new Contact: firstName or lastName must be specified';
  this._id = this.getNewId(contactsArr);
  this.firstName = firstName;
  this.lastName = lastName;
}

Contact.prototype.getNewId = function (arr) {
  if (arr.length === 0) return 0;

  // TODO (S.Panfilov) This would be sucks in case of async, but ok for test task
  const latestId = arr.sort((a, b) => b._id - a._id)[0]._id;
  const time = +((new Date()).getTime().toString().slice(-4));
  return +latestId + time;
};

export default Contact
