const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;

const conn = new Sequelize('postgres://localhost/acme_noun_db');

const Person = conn.define('person', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const people = [
    { name: 'Charm' },
    { name: 'Effy' }
  ];
  await Promise.all(people.map( person => Person.create(person)));
};

syncAndSeed();