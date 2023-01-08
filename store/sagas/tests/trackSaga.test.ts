//
import { call, put } from "redux-saga/effects";
import Api from "../../../api/index";
import { fetchTracksError, workerFetchTracs } from "../tracksSaga";
import { tracksActions } from "../../slicers/tracksSlicer";
import { ITrack } from "../../../types/tracks";
import { runSaga, Saga } from "redux-saga";
import { Action } from "@reduxjs/toolkit";

describe("fetchTracksSaga test", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("push tracks without search to store if no errors", async () => {
    const tracks = [] as ITrack[];
    Api.getAllTracks = jest.fn().mockReturnValue(tracks);
    const action = { type: "", payload: "" } as Action;
    let dispatched = [] as Action[];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action as Action),
        getState: () => ({ state: test }),
      },
      workerFetchTracs as Saga<any[]>,
      action
    ).toPromise();
    expect(Api.getAllTracks).toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: tracksActions.fetchTracksSuccess.type,
        payload: [],
      },
    ]);
  });

  it("push tracks with search to store if no errors", async () => {
    const tracks = [] as ITrack[];
    Api.searchTracks = jest.fn().mockReturnValue(tracks);
    const action = { type: "", payload: "some-query" } as Action;
    let dispatched = [] as Action[];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action as Action),
        getState: () => ({ state: test }),
      },
      workerFetchTracs as Saga<any[]>,
      action
    ).toPromise();
    expect(Api.searchTracks).toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: tracksActions.fetchTracksSuccess.type,
        payload: [],
      },
    ]);
  });

  it("push tracks without search to store if was an error", async () => {
    const tracks = [] as ITrack[];
    fetchTracksError;
    const action = {} as Action;
    let dispatched = [] as Action[];
    Api.getAllTracks = jest.fn().mockRejectedValue({});
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action as Action),
        getState: () => ({ state: test }),
      },
      workerFetchTracs as Saga<any[]>,
      action
    ).toPromise();
    // expect(Api.getAllTracks).toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: tracksActions.fetchTracksError.type,
        payload: fetchTracksError,
      },
    ]);
  });

  it("push tracks with search to store if was an error", async () => {
    const tracks = [] as ITrack[];
    fetchTracksError;
    const action = { type: "", payload: "some-query" } as Action;
    let dispatched = [] as Action[];
    Api.searchTracks = jest.fn().mockRejectedValue({});

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action as Action),
        getState: () => ({ state: test }),
      },
      workerFetchTracs as Saga<any[]>,
      action
    ).toPromise();
    // expect(Api.getAllTracks).toHaveBeenCalled();
    expect(dispatched).toEqual([
      {
        type: tracksActions.fetchTracksError.type,
        payload: fetchTracksError,
      },
    ]);
  });
});

// describe("fetch tracks test 2", () => {
//   const action = { payload: "" };
//   const tracks = [] as ITrack[];

//   Api.getAllTracks = jest.fn().mockReturnValue(tracks);
//   Api.searchTracks = jest.fn().mockReturnValue(tracks);
//   const g = cloneableGenerator(workerFetchTracs)(action);

//   it("put tracks in store when it`s work without errors", () => {
//     const gClone = g.clone();
//     expect(gClone.next().value).toEqual(call(Api.getAllTracks));
//     expect(Api.getAllTracks).toHaveBeenCalled();

//     expect(gClone.next(tracks).value).toEqual(
//       put({
//         type: tracksActions.fetchTracksSuccess.type,
//         payload: tracks,
//       })
//     );
//     expect(gClone.next().done).toBeTruthy();
//   });

//   it("put errors in store when it`s work with errors", () => {
//     const gClone = g.clone();
//     gClone.next(); // call
//     expect(gClone && gClone.throw({}).value).toEqual(
//       put({
//         type: tracksActions.fetchTracksError.type,
//         payload: "Произошла ошибка при загрузке треков",
//       })
//     );
//     expect(gClone.next().done).toBeTruthy();
//   });
// });

// describe("fetch tracks", () => {
//   it("fetch tracks", () => {
//     const action = {
//       payload: "",
//     };

//     const tracks = [] as ITrack[];
//     Api.getAllTracks = jest.fn().mockReturnValue(tracks);
//     Api.searchTracks = jest.fn().mockReturnValue(tracks);

//     const g = workerFetchTracs(action);
//     expect(g.next().value).toEqual(call(Api.getAllTracks));
//     expect(g.next(tracks).value).toEqual(
//       put({
//         type: tracksActions.fetchTracksSuccess.type,
//         payload: tracks,
//       })
//     );

//     expect(g.next().done).toBeTruthy();
//   });
// });
