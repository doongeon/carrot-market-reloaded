export function getLoginFormError({
  email = [],
  password = [],
}: {
  email?: string[];
  password?: string[];
} = {}) {
  return {
    fieldErrors: {
      email,
      password,
    },
  };
}