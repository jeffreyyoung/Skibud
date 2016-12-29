class Message {
}
Message.schema = {
	name: 'Message',
	primaryKey: '_id',
	properties: {
		to: 'string',
		from: 'string',
		text: 'string',
		_id: 'string',
		createdAt: 'string'
	}
};

export default Message;


/*/ Define your models and their properties
class Car {}
Car.schema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: 'int',
  }
};
class Person {}
Person.schema = {
  name: 'Person',
  properties: {
    name:    {type: 'string'},
    cars:    {type: 'list', objectType: 'Car'},
    picture: {type: 'data', optional: true}, // optional property
  }
};

// Get the default Realm with support for our objects
let realm = new Realm({schema: [Car, Person]});

// Create Realm objects and write to local storage
realm.write(() => {
  let myCar = realm.create('Car', {
    make: 'Honda',
    model: 'Civic',
    miles: 1000,
  });
  myCar.miles += 20; // Update a property value
});

// Query Realm for all cars with a high mileage
let cars = realm.objects('Car').filtered('miles > 1000');

// Will return a Results object with our 1 car
cars.length // => 1

// Add another car
realm.write(() => {
  let myCar = realm.create('Car', {
    make: 'Ford',
    model: 'Focus',
    miles: 2000,
  });

// Query results are updated in realtime
cars.length // => 2

*/