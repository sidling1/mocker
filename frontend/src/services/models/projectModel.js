import { ApiCore } from "../utilities/core";

const url = "project";

export const apiProject = new ApiCore({
  getAll: true,
  getSingle: true,
  getByParams: true,
  post: true,
  put: true,
  putById: true,
  patch: true,
  remove: true,
  url: url,
  //   plural: plural,
  //   single: single,
});
