import authSlicer, { initialState } from "../authSlicer";
import { authActions } from "../authSlicer";

describe("auth slicer test ", () => {
  it("return init state when no actions", () => {
    const result = authSlicer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("start loading ", () => {
    const action = authActions.setLoading(false);
    expect(action).toEqual({
      type: authActions.setLoading.type,
      payload: false,
    });
    const result = authSlicer(initialState, action);
    expect(result.loading).toBeFalsy();
    expect(result.error).toBe("");
  });

  it("stop loading", () => {
    const action = authActions.setLoading(true);
    expect(action).toEqual({
      type: authActions.setLoading.type,
      payload: true,
    });
    const result = authSlicer(initialState, action);
    expect(result.loading).toBeTruthy();
    expect(result.error).toBe("");
  });

  it("set error", () => {
    const test = "test";
    const action = authActions.setError(test);
    expect(action).toEqual({ type: authActions.setError.type, payload: test });
    const result = authSlicer(initialState, action);
    expect(result.error).toBe(test);
    expect(result.loading).toBeFalsy();
  });

  it("logout user", () => {
    const action = authActions.logoutUser();
    expect(action).toEqual({ type: authActions.logoutUser.type });
    const result = authSlicer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it("set User data", () => {
    const user = {
      _id: "098765",
      login: "test@ro.ru",
      isActivated: true,
    };
    const res = {
      userId: user._id,
      login: user.login,
      isAuth: true,
      isActivated: true,
      loading: false,
      error: "",
    };
    const action = authActions.setUserData(user);
    expect(action).toEqual({
      type: authActions.setUserData.type,
      payload: user,
    });
    const result = authSlicer(initialState, action);
    expect(result).toEqual(res);
  });
});
