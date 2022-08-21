[
  {
    id: "#4324kaswev355",
    name: "Mohamed",
    room: "Funlife",
  },
];

//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserlist(room)

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    let user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    let user = this.users.filter((user) => user.id === id)[0];
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    let user = this.users.filter((user) => user.id === id);
    return user[0];
  }
  getUserList(room) {
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }
}
module.exports = {
  Users,
};

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
// let me = new Person("Mohamed", 25);
// // console.log("this.name", me.name);
// // console.log("this.age", me.age);

// let funcRes = me.getUserDescription();
// console.log(funcRes);
