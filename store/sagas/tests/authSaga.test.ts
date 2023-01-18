//
import { call, put } from "redux-saga/effects";
import Api from "../../../api/index";
import { workerLogin, workerLogout, workerRegistration } from "../authSaga";
import { authActions } from "../../slicers/authSlicer";
import { Tokens } from "../../../types/auth";
import { store } from "../../index";
import { submitAxiosError } from "../../../utils/errorSubmit";

describe(" auth saga tests", () => {
  const testUserData = {
    _id: "65abeba37cc9f7c56ff0b7e6",
    login: "test622@rambler.com",
    isActivated: false,
    exp: 1672935655,
    iat: 1672935055,
  };
  const testAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFiZWJhMzdjYzlmN2M1NmZmMGI3ZTYiLCJsb2dpbiI6InRlc3Q2MjJAcmFtYmxlci5jb20iLCJpc0FjdGl2YXRlZCI6ZmFsc2UsImlhdCI6MTY3MjkzNTA1NSwiZXhwIjoxNjcyOTM1NjU1fQ.adbeSHvWy5a8luqJn8LUARrsy60sEHrfYFveq-_CfGs";

  beforeAll(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    localStorage.clear();
  });
  afterAll(() => {
    localStorage.clear();
  });

  const testError = "ErrorForTesting!";

  it(" workerRegistration test without error", () => {
    const action = {
      type: "REG_USER",
      payload: new FormData(),
    };
    Api.registration = jest.fn().mockReturnValue(testAccessToken);

    const g = workerRegistration(action);

    expect(g.next().value).toEqual(
      put({
        type: authActions.setLoading.type,
        payload: true,
      })
    );
    expect(g.next().value).toEqual(call(Api.registration, action.payload));
    expect(g.next(testAccessToken).value).toEqual(
      put({
        type: authActions.setUserData.type,
        payload: testUserData,
      })
    );
    expect(localStorage.getItem(Tokens.Access)).toEqual(testAccessToken);
    expect(g.next().done).toBeTruthy();
  });

  it(" workerRegistration test with error", () => {
    const action = {
      type: "REG_USER",
      payload: new FormData(),
    };

    Api.registration = jest.fn().mockRejectedValue(testError);

    const g = workerRegistration(action);

    expect(g.next().value).toEqual(
      put({
        type: authActions.setLoading.type,
        payload: true,
      })
    );
    expect(g.next().value).toEqual(call(Api.registration, action.payload));
    expect(g.throw(testError).value).toEqual(
      put({
        type: authActions.setError.type,
        payload: submitAxiosError(testError),
      })
    );
    expect(localStorage.getItem(Tokens.Access)).toBeNull();
    expect(g.next().done).toBeTruthy();
  });

  it(" workerLogin test without error", () => {
    const action = {
      type: "LOGIN_USER",
      payload: new FormData(),
    };

    Api.login = jest.fn().mockReturnValue(testAccessToken);
    const g = workerLogin(action);

    expect(g.next().value).toEqual(
      put({
        type: authActions.setLoading.type,
        payload: true,
      })
    );
    expect(g.next().value).toEqual(call(Api.login, action.payload));
    expect(g.next(testAccessToken).value).toEqual(
      put({
        type: authActions.setUserData.type,
        payload: testUserData,
      })
    );
    expect(localStorage.getItem(Tokens.Access)).toEqual(testAccessToken);
    expect(g.next().done).toBeTruthy();
  });

  it(" workerLogin test with error", () => {
    const action = {
      type: "LOGIN_USER",
      payload: new FormData(),
    };
    Api.login = jest.fn().mockRejectedValue(testError);
    // localStorage.setItem(Tokens.Access, "test");

    const g = workerLogin(action);

    expect(g.next().value).toEqual(
      put({
        type: authActions.setLoading.type,
        payload: true,
      })
    );

    expect(g.next().value).toEqual(call(Api.login, action.payload));
    expect(g.throw(testError).value).toEqual(
      put({
        type: authActions.setError.type,
        payload: submitAxiosError(testError),
      })
    );
    expect(localStorage.getItem(Tokens.Access)).toBeNull();
    expect(g.next().done).toBeTruthy();
  });

  it(" workerLogout test without Err", () => {
    const { _id } = testUserData;

    store.getState = jest.fn().mockReturnValue({ auth: { userId: _id } });
    Api.logout = jest.fn().mockReturnValue({});

    const g = workerLogout();

    expect(g.next(_id).value).toEqual(call(Api.logout, _id));
    expect(g.next().value).toEqual(
      put({
        type: authActions.logoutUser.type,
      })
    );
    expect(localStorage.getItem(Tokens.Access)).toBeNull();
    expect(g.next().done).toBeTruthy();
  });

  it(" workerLogout test with Err", () => {
    const { _id } = testUserData;

    store.getState = jest.fn().mockReturnValue({ auth: { userId: _id } });
    Api.logout = jest.fn().mockRejectedValue({});
    localStorage.setItem(Tokens.Access, "test");

    const g = workerLogout();

    expect(g.next(_id).value).toEqual(call(Api.logout, _id));
    expect(g.next().value).toEqual(
      put({
        type: authActions.logoutUser.type,
      })
    );
    expect(localStorage.getItem(Tokens.Access)).toBeNull();
    expect(g.next().done).toBeTruthy();
  });
});
