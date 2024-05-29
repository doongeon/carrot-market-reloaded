import { getSession } from "@/libs/getSession";

export class LoginFormError {
  fieldErrors: {
    email: string[] | [];
    password: string[] | [];
  };

  constructor({
    email = [],
    password = [],
  }: {
    email?: string[] | [];
    password?: string[] | [];
  } = {}) {
    this.fieldErrors = {
      email,
      password,
    };
  }
}

export async function saveUserOnSession(userId: number) {
  const session = await getSession();
  session.id = userId;
  await session.save();
}
