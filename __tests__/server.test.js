const supertest = require("supertest");
const app = require("../src/server");

const request = supertest(app);

describe("Server API tests", () => {
  let createdUser;

  it("should return welcome message", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual("Welcome to the server!");
  });

  it("should create a new user on signup", async () => {
    const user = {
      username: "testuser",
      password: "testpassword",
    };

    const response = await request.post("/signup").send(user);
    expect(response.status).toBe(201);
    expect(response.body.username).toBe(user.username);

    createdUser = response.body;
  });

  it("should return the user on signin", async () => {
    const credentials = {
      username: createdUser.username,
      password: "testpassword",
    };

    const response = await request.post("/signin").send(credentials);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(credentials.username);
  });

  it("should return all users", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

});
