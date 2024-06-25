import { z } from "zod";
const baseUrl = "http://localhost:3000";


// Создаётся схема валидации данных пользователя с помощью zod. Эта схема описывает структуру данных, которая ожидается от API

const UserDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

// getUsers: Запрашивает всех пользователей с API. Полученные данные конвертируются в JSON и валидируются с использованием схемы UserDtoSchema в виде массива. Если данные валидны, они возвращаются.

export const api = {
  getUsers: () => {
    return fetch(`${baseUrl}/users`)
      .then((response) => response.json())
      .then((res) => {
        return UserDtoSchema.array().parse(res);
      });
  },

  getUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`)
      .then((response) => response.json())
      .then((res) => {
        return UserDtoSchema.parse(res);
      });
  },

  deleteUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },
};