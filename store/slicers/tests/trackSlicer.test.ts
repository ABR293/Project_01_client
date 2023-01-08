import { ITrack } from "../../../types/tracks";
import tracksSlicer, { initialState } from "../tracksSlicer";
import { tracksActions } from "../tracksSlicer";

describe("tracks slicer test ", () => {
  it("return init state when no actions", () => {
    const result = tracksSlicer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("set loading", () => {
    const action = tracksActions.setLoading();
    expect(action).toEqual({ type: tracksActions.setLoading.type });
    const result = tracksSlicer(initialState, action);
    expect(result.loading).toBeTruthy();
  });

  it("set Tracks Succcess", () => {
    const tracks = [] as ITrack[];
    const action = tracksActions.fetchTracksSuccess(tracks);
    expect(action).toEqual({
      type: tracksActions.fetchTracksSuccess.type,
      payload: tracks,
    });
    const result = tracksSlicer(initialState, action);
    expect(result.tracks).toBe(tracks);
    expect(result.loading).toBeFalsy();
  });

  it("set Error", () => {
    const errorMessge = "test error message";
    const action = tracksActions.fetchTracksError(errorMessge);
    expect(action).toEqual({
      type: tracksActions.fetchTracksError.type,
      payload: errorMessge,
    });
    const result = tracksSlicer(initialState, action);
    expect(result.error).toBe(errorMessge);
    expect(result.loading).toBeFalsy();
  });
});
