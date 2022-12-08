import { Request, Response } from "express";
import { Com_user } from "../entity/Com_user";
import { getRepository } from "typeorm";
import helper from "../helpers/function";
import response from "../helpers/response";

class AuthService {
  credential: {
    user_id: string;
  };
  body: Request["body"];
  params: Request["params"];
  res: Response;
  req: any;

  constructor(req: any, res: Response) {
    this.credential = req.app.locals.credential;
    this.body = req.body;
    this.params = req.params;
    this.res = res;
    this.req = req;
  }

  // Service Api
  postLogin = async () => {
    const AuthRepos = getRepository(Com_user);
    const { email, password } = this.body;
    let users: Com_user, compare: any;

    if (!(email && password)) {
      return response.validation(
        "",
        "Email atau password tidak boleh kosong !",
        this.res
      );
    }

    try {
      users = await AuthRepos.findOne({
        where: [{ user_email: email }, { user_username: email }],
      });

      compare = await helper.passwordCompare(password, users.user_password);
    } catch (error) {
      return response.failed("", "Email atau password salah !", this.res);
    }

    if (compare) {
      let token = helper.generateToken(
        users.user_id,
        users.user_name,
        users.user_username,
        users.user_email
      );

      let data = {
        user_id: users.user_id,
        name: users.user_name,
        email: users.user_email,
        username: users.user_username,
        token: token,
      };

      return response.success(data, "Data Ditemukan !", this.res);
    }
    return response.failed("", "Email atau password salah !", this.res);
  };
}

export default AuthService;
