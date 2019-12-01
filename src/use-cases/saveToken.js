import crypto from "crypto";

export default function makeSaveToken({ editUser }) {
  return async function({ id }) {
    const token = crypto.randomBytes(3).toString("hex");
    const user = await editUser({
      id,
      verify_token: token,
      verify_token_created: new Date()
    });

    if (!user) {
      return null;
    }

    return token;
  };
}
