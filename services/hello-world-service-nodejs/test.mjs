import chai from "chai";
import chaiHttp from "chai-http";
import app from "./app.mjs";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Hello World API", () => {
  describe("GET /hello", () => {
    it("should return a hello world greeting", async () => {
      const request = chai.request(app);
      const res = await request.get("/hello");

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Hello, World!");
    });
  });
});
