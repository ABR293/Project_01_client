import { ITrack } from "../../../types/tracks";
import playerSlicer, { initialState } from "../playerSlicer";
import { playerActions } from "../playerSlicer";

describe("player slicer test ", () => {
  it("return init state when no actions", () => {
    const result = playerSlicer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("changing of volume by setVolume", () => {
    const Num = 50;
    const action = playerActions.setVolume(Num);
    expect(action).toEqual({
      type: playerActions.setVolume.type,
      payload: Num,
    });
    const result = playerSlicer(initialState, action);
    expect(result.volume).toBe(Num);
  });

  it("changing of duration by setDuration", () => {
    const Num = 50;
    const action = playerActions.setDuration(Num);
    expect(action).toEqual({
      type: playerActions.setDuration.type,
      payload: Num,
    });
    const result = playerSlicer(initialState, action);
    expect(result.duration).toBe(Num);
  });

  it("changing of currentTime by setCurrentTime", () => {
    const Num = 50;
    const action = playerActions.setCurrentTime(Num);
    expect(action).toEqual({
      type: playerActions.setCurrentTime.type,
      payload: Num,
    });
    const result = playerSlicer(initialState, action);
    expect(result.currentTime).toBe(Num);
  });

  it("changing of pause by playTrack", () => {
    const action = playerActions.playTrack();
    expect(action).toEqual({ type: playerActions.playTrack.type });
    const result = playerSlicer(initialState, action);
    expect(result.pause).toBeFalsy();
  });

  it("changing of pause by pauseTarack", () => {
    const action = playerActions.pauseTarack();
    expect(action).toEqual({ type: playerActions.pauseTarack.type });
    const result = playerSlicer(initialState, action);
    expect(result.pause).toBeTruthy();
  });

  it("changing of pause by toggleSound/true", () => {
    const action = playerActions.toggleSound(true);
    expect(action).toEqual({
      type: playerActions.toggleSound.type,
      payload: true,
    });
    const result = playerSlicer(initialState, action);
    expect(result.isSoundOn).toBeTruthy();
  });

  it("changing of pause by toggleSound/false", () => {
    const action = playerActions.toggleSound(false);
    expect(action).toEqual({
      type: playerActions.toggleSound.type,
      payload: false,
    });
    const result = playerSlicer(initialState, action);
    expect(result.isSoundOn).toBeFalsy();
  });

  it("changing setting of new track by setActiveTrack", () => {
    const testTrack: ITrack = {
      _id: "21321321",
      name: "Du Hast",
      artist: "Rammstein",
      text: "Du, du hast, Du hast mich!",
      listens: 0,
      picture: "link/picture/link",
      audio: "link/audio/link",
      comments: [],
    };
    const action = {
      type: playerActions.setActiveTrack.type,
      payload: testTrack,
    };
    const result = playerSlicer(initialState, action);
    expect(result.duration).toBe(0);
    expect(result.currentTime).toBe(0);
    expect(result.active).toBe(testTrack);
  });
});
