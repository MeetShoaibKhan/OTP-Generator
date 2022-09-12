var request = require("supertest"),
  app = require("../index"),
  route = require("../routes/users");

describe("/", function () {
  it("hone page", function (done) {
    request(app)
      .get("/")
      .expect(200)
      .expect(/This is the home page!/, done);
  });
});

describe("POST /", function () {
  it("creates user and gives message that user is created", function (done) {
    request(app)
      .post("/users")
      .send({ name: "john", phoneNumber: "03219116660" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, function () {
        request(app)
          .post("/users")
          .send({ name: "john", phoneNumber: "03219116660" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(403, done);
      });
  });
});
