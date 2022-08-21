let expect = require("expect");
const { isRealString } = require("./validation");

describe("Validation test", () => {
  it("should reject non-string Values", (done) => {
    str = 983;
    let res = isRealString(str);
    expect(res).toBe(false);
    done();
  });
  it("should reject string with only spaces", (done) => {
    str = "   ";
    let res = isRealString(str);
    expect(res).toBe(false);
    done();
  });
  it("should allow string with non-space characters", (done) => {
    str = "    Mohamed     ";
    let res = isRealString(str);
    expect(res).toBe(true);
    done();
  });
});
