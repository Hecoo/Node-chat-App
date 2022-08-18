let expect = require("expect");
let { messageHandler, generateLocationMessage } = require("./message.js");

describe("generateMessage", () => {
  it("should generate the correct message object", (done) => {
    from = "Ahmed";
    text = "Hello welcome my friend this is me testing the func";
    let res = messageHandler(from, text);
    expect(res).toInclude({ from, text });
    expect(res.createdAt).toBeA("number");
    done();
  });
});

describe("generateLocationMessage", () => {
  it("should generate the correct location object", (done) => {
    from = "Mohamed";
    latitude = 123;
    longitude = 1214;
    let res = generateLocationMessage(from, latitude, longitude);
    expect(res).toInclude({
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    });
    expect(res.createdAt).toBeA("number");
    done();
  });
});
