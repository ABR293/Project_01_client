import axios from "axios";
import { validateEmail } from "../utils/formValidators";
import Api, { _api } from "./index";

class Users {
  static all() {
    return axios.get("/users.json").then((resp) => resp.data);
  }
}

jest.mock("axios");

describe("Api Tests", () => {
  let response;

  beforeEach(() => {});

  it("should fetch tracks", async () => {
    const tracks = [
      {
        track: {
          _id: "string",
          name: "string",
          artist: "string",
          text: "string",
          listens: 3,
          picture: "string",
          audio: "string",
        },
      },
    ];
    response = { data: tracks };

    // _api.get.mockReturnValue(response);

    // return Api.getAllTracks().then((data) => {
    //   expect(data).toEqual(tracks);
    // });
    // expect(Api.getAllTracks).toEqual(tracks);

    // return Users.all().then((data) => expect(data).toEqual(users));

    // const res = await Api.getAllTracks();
    // expect(res).toEqual(tracks);

    // test("", async () => {
    //   // axios.get.mockReturnValue(response);
    //   // let tracks = await Api.getTrack("345678");
    //   // expect(axios.get).toBeCalledTimes(1);
    //   axios.get.mockResolvedValue(1);
    //   let tracks = await Api.getAllTracks();
    //   expect(axios.get).toBeCalledTimes(1);
    // });
  });
});
