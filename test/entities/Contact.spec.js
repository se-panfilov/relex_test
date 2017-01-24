import { expect } from 'chai';
import Contact from '../../src/entities/Contact';


describe('contact reducer:', () => {

  const firstName = 'John';
  const lastName = 'Smith';

  it('check is instance of Contact', () => {
    const contact = new Contact(firstName, lastName);

    expect(contact).to.be.an('object');
    expect(contact instanceof Contact).to.be.true;
  });

  it('can create contact with data', () => {
    const contact = new Contact(firstName, lastName);

    expect(contact.firstName).to.equal(firstName);
    expect(contact.lastName).to.equal(lastName);
    expect(contact._id).to.be.a('number');
  });

  it('can create contact with different Id', () => {
    const contact1 = new Contact(firstName, lastName);
    const contact2 = new Contact(firstName, lastName);

    expect(contact1._id).to.be.a('number');
    expect(contact2._id).to.be.a('number');
    expect(contact1._id).to.not.equal(contact2._id)
  });

  it('can create contact first name only', () => {
    const contact = new Contact(firstName);

    expect(contact.firstName).to.equal(firstName);
    expect(contact.lastName).to.be.undefined;
    expect(contact._id).to.be.a('number');
  });

  it('can create contact last name only', () => {
    const contact = new Contact(null, lastName);

    expect(contact.firstName).to.be.null;
    expect(contact.lastName).to.equal(lastName);
    expect(contact._id).to.be.a('number');
  });

  it('can\'t create contact without data', () => {
    expect(() => new Contact()).to.throw('new Contact: firstName or lastName must be specified');
  });

  it('check getId produce number', () => {
    const contact = new Contact(null, lastName);

    expect(contact.getNewId()).to.be.a('number');
  });

  it('can produce uniq ids', () => {
    const contact = new Contact(null, lastName);

    const arr = [];
    for (let i = 0; i < 10000; i++) {
      arr.push(contact.getNewId())
    }

    function count(arr) {
      return arr.reduce((a, b) =>
        Object.assign(a, { [b]: (a[b] || 0) + 1 }), {})
    }

    function getDuplicates(arr) {
      return Object.keys(arr).filter((a) => arr[a] > 1)
    }

    expect(getDuplicates(count(arr)).length).to.equal(0)
  });


});
