import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/index";
import Tracks from "./index";
import Create from "./create";
import TrackList from "../../components/TrackList";
import { ITrack } from "../../types/tracks";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
    };
  },
}));

const tracks: ITrack[] = [
  {
    _id: "23921389",
    name: "Du hast",
    artist: "Rammstein",
    text: "Du! Du Hast! Du Hast Mich!",
    listens: 5,
    picture: "test/pic",
    audio: "test/audio",
    comments: [],
  },
  {
    _id: "239213f9",
    name: "Wind of change",
    artist: "Scorpions",
    text: "I follow the Moskva \n Down to Gorky Park \n Listening to the wind of change",
    listens: 5,
    picture: "test/pic",
    audio: "test/audio",
    comments: [],
  },
];

describe("Render Trsacks", () => {
  it("Tracks", () => {
    render(
      <Provider store={store}>
        <Tracks />
      </Provider>
    );

    expect(screen.queryByTestId("tracks")).toMatchSnapshot();
    screen.debug;
  });
  it("Create", () => {
    render(
      <Provider store={store}>
        <Create />
      </Provider>
    );

    expect(screen.queryByTestId("create")).toMatchSnapshot();
    screen.debug;
  });

  it("render TrackList", () => {
    render(
      <Provider store={store}>
        <TrackList tracks={tracks} />
      </Provider>
    );
    expect(screen.getAllByTestId("trackItem")).toMatchSnapshot();
    expect(screen.getByTestId("trackList")).toMatchSnapshot();
    // screen.debug
  });
});
