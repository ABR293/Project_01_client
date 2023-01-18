import { AxiosResponse } from "axios";
import { CreateComment, IComment, ITrack } from "../types/tracks";
import { IUser } from "../types/users";
import _api from "./apiConfig";

class Api {
  static registration = async (data: FormData): Promise<string> =>
    await _api.post("auth/registration", data).then((res) => res.data);

  static login = async (data: FormData): Promise<string> =>
    await _api.post("auth/login", data).then((res) => res.data);

  static logout = async (id: string): Promise<void> =>
    await _api.get(`auth/logout/${id}`);

  static fogotPassword = async (login: string): Promise<AxiosResponse> =>
    await _api.get(`auth/fogotPassword/${login}`);

  static resetPassword = async (data: FormData): Promise<AxiosResponse> =>
    await _api.post(`auth/resetPassword`, data);

  // TRACKS
  static getAllTracks = async (): Promise<ITrack[]> =>
    await _api.get("tracks").then((res) => res.data);

  static searchTracks = async (query: string): Promise<ITrack[]> =>
    await _api.get(`tracks/search?query=` + query).then((res) => res.data);

  static getTrack = async (id: any): Promise<AxiosResponse<ITrack>> =>
    await _api.get("tracks/" + (id + ""));

  static createTrack = async (
    formData: FormData
  ): Promise<AxiosResponse<ITrack>> => await _api.post("tracks", formData);

  static addComment = async (
    data: CreateComment
  ): Promise<AxiosResponse<IComment>> =>
    await _api.post("tracks/comment", data);

  // USERS

  static getUser = async (id: string | number): Promise<IUser> =>
    await _api.get("users/" + (id + "")).then((res) => res.data);

  static searchUsers = async (query: string): Promise<ITrack[]> =>
    await _api.get(`tracks/search?query=` + query).then((res) => res.data);

  static getUsers = async (): Promise<IUser[]> =>
    await _api.get("users/").then((res) => res.data);
}

export default Api;
