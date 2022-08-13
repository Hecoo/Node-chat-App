let expect = require("expect");
let { messageHandler } = require("./message.js");

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
