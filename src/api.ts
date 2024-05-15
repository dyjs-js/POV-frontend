import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getBooks = () =>
  instance.get(`books/`).then((response) => response.data);

export const getBook = ({ queryKey }: QueryFunctionContext) => {
  const [_, bookPk] = queryKey;
  return instance.get(`books/${bookPk}`).then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((reponse) => reponse.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `/users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IUploadBookVariables {
  review_title: string;
  title: string;
  author: string;
  publisher: string;
  content: string;
  summary: string;
  is_public: boolean;
  rating: number;
}
export const uploadBook = (variables: IUploadBookVariables) =>
  instance
    .post(`books/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const likeBook = async (bookPk: number) => {
  const response = await instance.post(`books/${bookPk}/liked`, null, {
    headers: {
      "X-CSRFToken": Cookie.get("csrftoken") || "",
    },
  });

  return response.data;
};

export const getUploadURL = () =>
  instance
    .post(`medias/photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUploadImageVariables {
  file: FileList;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    })
    .then((reponse) => reponse.data);
};

export interface ICreatePhotoVariables {
  description: string;
  file: string;
  bookPk: string;
}

export const createPhoto = ({
  description,
  file,
  bookPk,
}: ICreatePhotoVariables) =>
  instance
    .post(
      `books/${bookPk}/photos`,
      { description, file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const createGptPhoto = ({ file, bookPk }: ICreatePhotoVariables) =>
  instance
    .post(
      `books/${bookPk}/photos`,
      { file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IUploadGptImageVariables {
  file: string;
  uploadURL: string;
}

export const uploadGptImage = ({
  file,
  uploadURL,
}: IUploadGptImageVariables) => {
  const form = new FormData();
  form.append("url", file);
  return axios
    .post(uploadURL, form, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    })
    .then((reponse) => reponse.data);
};

export const getUploadGptURL = () =>
  instance
    .post(`gptcreate/gptphotos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const createGptURL = (bookPk: string) =>
  instance
    .post(`books/${bookPk}/gptphotos`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IEditBookVariables {
  review_title: string;
  title: string;
  author: string;
  publisher: string;
  content: string;
  summary: string;
  is_public: boolean;
  rating: number;
  bookPk: string;
}

export const editBook = (variables: IEditBookVariables) =>
  instance
    .put(`books/${variables.bookPk}`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const deleteBook = (bookPk: string) =>
  instance
    .delete(`books/${bookPk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
