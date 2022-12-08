import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Com_user } from "../entity/Com_user";
import { Product } from "../entity/Product";

import helper from "../helpers/function";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = [
      {
        user: new Com_user(),
        user_id: 1,
        user_name: "rahmadz",
        user_email: "yaelahferr@gmail.com",
        user_username: "rahmadz",
        user_password: await helper.passwordHash("rahmadz"),
        user_token: "migrate",
      },
    ];
    const userRepository = getRepository(Com_user);
    await userRepository.save(user);

    let product = [
      {
        product: new Product(),
        prod_id: 1,
        prod_name: "Sony Xperia 5 Docomo",
        prod_sku: "migrate",
        prod_amount: Number(10000),
        prod_author: Number(1),
      },
      {
        product: new Product(),
        prod_id: 2,
        prod_name: "Sony Xperia 10 Docomo",
        prod_sku: "migrate",
        prod_amount: Number(20000),
        prod_author: Number(1),
      },
    ];
    const productRepository = getRepository(Product);
    await productRepository.save(product);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
