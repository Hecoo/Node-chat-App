let expect = require("expect");

let { Users } = require("./users");

describe("Users", () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Mohsen",
        room: "Funkitkat",
      },
      {
        id: "2",
        name: "Mohamed",
        room: "Funkitkat",
      },
      {
        id: "3",
        name: "samir",
        room: "GroupRoom",
      },
    ];
  });

  it("should add new user", () => {
    let users = new Users();
    let user = {
      id: "124",
      name: "mohamed",
      room: "funchat",
    };
    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    let user = users.removeUser("1");
    expect(user.id).toBe("1");
    expect(users.users.length).toBe(2);
  });
  it("should not remove a user thats not part of the users", () => {
    let user = users.removeUser("5");
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
  it("should find user", () => {
    let user = users.getUser("2");
    expect(user.id).toBe("2");
  });
  it("should not find user ", () => {
    let user = users.getUser("4");
    expect(user).toNotExist();
  });

  it("should return names for Funkitkat", () => {
    var userList = users.getUserList("Funkitkat");
    expect(userList).toEqual(["Mohsen", "Mohamed"]);
  });

  it("should return names for GroupRoom", () => {
    var userList = users.getUserList("GroupRoom");
    expect(userList).toEqual(["samir"]);
  });
});
