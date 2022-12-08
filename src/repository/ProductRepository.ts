import { EntityRepository, EntityManager } from "typeorm";
import { Product } from "../entity/Product";

@EntityRepository(Product)
class ProductRepository {
  manage: EntityManager;

  constructor(manage: EntityManager) {
    this.manage = manage;
  }

  async productList(sort: string, dir: string, search: string) {
    var query = `select a.prod_id as id, 
    a.prod_name as nama, 
    a.prod_sku as sku, 
    a.prod_amount as harga, 
    to_char(a.prod_register, 'Day, DD Month yyyy') as  created_at, 
    to_char(a.prod_updated, 'Day, DD Month yyyy') as  updated_at, 
    to_char(a.prod_deleted, 'Day, DD Month yyyy') as  deleted_at 
    FROM product a `;

    if (!sort) {
      sort = ` a.prod_id`;
    }

    if (!dir) {
      dir = ` ASC`;
    }

    if (search) {
      query += ` WHERE a.prod_name ILIKE '%${search}%' OR a.prod_sku ILIKE '%${search}%' `;
    }

    query += ` order by ${sort} ${dir} `;

    let data = this.manage.query(query);

    return data;
  }
}

export default ProductRepository;
