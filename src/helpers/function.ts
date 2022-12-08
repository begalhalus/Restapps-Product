import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

class Function {
  public static passwordHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  public static passwordCompare = async (
    text: string,
    encryptedText: string
  ): Promise<boolean> => {
    let result = await bcrypt.compare(text, encryptedText);
    return result;
  };

  public static generateToken = (
    user_id: number,
    name: string,
    username: string,
    email: string
  ): string => {
    const secretKey: string = process.env.TOKEN_SECRET || "secret";

    const token: string = jwt.sign(
      { user_id, name, username, email },
      secretKey,
      {
        expiresIn: "23h",
      }
    );
    return token;
  };
}

export default Function;
