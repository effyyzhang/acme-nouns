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
    unique: true,
    validate: {
      notEmpty: true
    }
  }
});

const Thing = conn.define('thing', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
});

const Place = conn.define('place', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
});

Thing.belongsTo(Person);
Person.belongsTo(Place);
// People.hasMany(Thing);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const places = [
    {name: 'NYC'},
    {name: 'Brooklyn'}
  ]
  const [nyc, brooklyn] = await Promise.all(places.map( place => Place.create(place)));
  const people = [
    { name: 'Charm', placeId: nyc.id },
    { name: 'Effy', placeId: brooklyn.id },
    { name: 'Key' }
  ];
  const[charm, effy, key] = await Promise.all(people.map( person => Person.create(person)));

  const things = [
    {name: 'Water Bottle', personId: charm.id},
    {name: 'Bike', personId: key.id},
    {name: 'Bag', personId: effy.id},
    {name: 'Pencil'},
    {name: 'Macbook',  personId: charm.id}
  ]


  await Promise.all(things.map( thing => Thing.create(thing)));
};

module.exports = {
  syncAndSeed,
  model: {
    Place,
    Person,
    Thing
  }
};
