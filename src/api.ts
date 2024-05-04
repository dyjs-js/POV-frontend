import {
  QueryFunctionContext,
  QueryKeyHashFunction,
} from "@tanstack/react-query";
import axios from "axios";

const Instacne = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export async function getBooks() {
  const response = await Instacne.get(`books/`);
  return response.data;
}

export async function getBook({ queryKey }: QueryFunctionContext) {
  const [_, bookPk] = queryKey;
  const respnse = await Instacne.get(`books/${bookPk}`);
  return respnse.data;
}
