import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";
import PasswordReset from "./passwordReset";

import { store } from "../../store/index";

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

global.Audio = jest.fn().mockImplementation(() => ({
  pause: jest.fn(),
  play: jest.fn(),
}));

describe("Render", () => {
  it("should render SignIn screen", () => {
    render(
      <Provider store={store}>
        <SignIn onChangeReg={() => {}} />
      </Provider>
    );
    expect(screen.getByTestId("signIn")).toMatchSnapshot();
    //   screen.debug;
  });

  it("should render SignUp screen", () => {
    render(
      <Provider store={store}>
        <SignUp onChangeReg={() => {}} />
      </Provider>
    );
    expect(screen.getByTestId("signUp")).toMatchSnapshot();
    //   screen.debug;
  });

  it("should render PasswordReset screen", () => {
    render(
      <Provider store={store}>
        <PasswordReset />
      </Provider>
    );
    expect(screen.getByTestId("password-reset")).toMatchSnapshot();
    //   screen.debug;
  });
});
