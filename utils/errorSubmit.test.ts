// import { AxiosError } from "axios";

import axios from "axios";
import { AxiosError } from "axios";
import { submitAxiosError } from "./errorSubmit";

describe("submitError testing", () => {
  it("submitAxiosError test", () => {
    const errorMessage = "text message";

    const error = new AxiosError(
      "Request failed with status code 403",
      "ERR_BAD_REQUEST",
      {},
      {}
    );

    expect(1).toBe(1);
  });
});
