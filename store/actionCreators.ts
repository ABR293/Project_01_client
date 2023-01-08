import { playerActions } from "./slicers/playerSlicer";
import { tracksActions } from "./slicers/tracksSlicer";
import { authActions } from "./slicers/authSlicer";

type PropertyType<T> = T extends { [key: string]: infer U } ? U : never;
type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type SagaActionType = ReturnType<PropertyType<typeof sagaActions>>;
export type TypeOfSagaActyonType = PropType<SagaActionType, "type">;

export const sagaActions = {
  getTracks: (query: string = "") =>
    ({ type: "GET_TRACKS", payload: query } as const),
  getUsers: (id: string) => ({ type: "GET_USERS", payload: id } as const),
  loginUser: (data: FormData) =>
    ({ type: "LOGIN_USER", payload: data } as const),
  registrationUser: (data: FormData) =>
    ({
      type: "REG_USER",
      payload: data,
    } as const),
  fogotPassport: (data: FormData) =>
    ({ type: "FOGOT_PASS", payload: data } as const),
  hello: () => ({ type: "HELLO" } as const), // test
  logout: () => ({ type: "LOGUOT" } as const),
};

const actionCreators = {
  ...playerActions,
  ...tracksActions,
  ...authActions,
  ...sagaActions,
};

export default actionCreators;
