import { User } from "./types";

export function findUser(users: User[], userId: number) {
  return users.find((user) => user.id === userId)!;
}
