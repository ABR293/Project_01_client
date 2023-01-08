import actionCreators, { TypeOfSagaActyonType } from "./actionCreators";

describe("saga Actions test", () => {
  it("get tracks test", () => {
    const query = "test";
    expect(actionCreators.getTracks(query)).toEqual({
      type: "GET_TRACKS",
      payload: query,
    });
  });
  it("get users test", () => {
    const query = "test";
    expect(actionCreators.getUsers(query)).toEqual({
      type: "GET_USERS",
      payload: query,
    });
  });
  it("login user test", () => {
    const data = new FormData();
    expect(actionCreators.loginUser(data)).toEqual({
      type: "LOGIN_USER",
      payload: data,
    });
  });
  it("logout test", () => {
    expect(actionCreators.logout()).toEqual({
      type: "LOGUOT",
    });
  });
  it("getTracks test", () => {
    const data = new FormData();
    expect(actionCreators.registrationUser(data)).toEqual({
      type: "REG_USER",
      payload: data,
    });
  });
  it("fogot password test", () => {
    const data = new FormData();
    expect(actionCreators.fogotPassport(data)).toEqual({
      type: "FOGOT_PASS",
      payload: data,
    });
  });
});
