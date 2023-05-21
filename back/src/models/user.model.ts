import { BaseModel } from "./base.model";
import utilsHasPassword from "../utils/utils.has.password";

export class UserModel extends BaseModel {
  public async create(name: string, email: string, password: string) {
    try {
      const hasPassword = await utilsHasPassword(password);
      const user = await this.client.user.create({
        data: { email, name, password: hasPassword },
      });
      return { status: true, user: user };
    } catch (e) {
      return { status: false };
    }
  }

  public async find(email: string) {
    const user = await this.client.user.findFirst({
      where: { email: email },
    });
    return user;
  }
}
