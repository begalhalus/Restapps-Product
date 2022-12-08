import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { getRepository, getManager } from "typeorm";
import response from "../helpers/response";
import ProductRepository from "../repository/ProductRepository";
import moment = require("moment");

class ProductService {
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
  getProduct = async () => {
    const ProductRepos = getManager().getCustomRepository(ProductRepository);
    const { sort, dir, search } = this.req.query;
    let product: any;

    try {
      product = await ProductRepos.productList(sort, dir, search);
    } catch (error) {
      console.log(error);
      return response.failed("", "Maaf Server sedang bermasalah !", this.res);
    }

    if (product.length) {
      return response.pagination(
        product,
        "Data Ditemukan !",
        this.res,
        this.req
      );
    }

    return response.failed("", "Data Tidak Ditemukan !", this.res);
  };

  postProduct = async () => {
    const ProductRepos = getRepository(Product);
    const { nama, harga } = this.body;
    let product: Product, params: any, store: any, result: any;

    if (!(nama && harga)) {
      return response.validation("", "Data tidak lengkap !", this.res);
    }

    try {
      product = await ProductRepos.findOne({ where: { prod_name: nama } });
    } catch (error) {
      console.log(error);
      return response.failed("", "Maaf Server sedang bermasalah !", this.res);
    }

    if (product) {
      return response.failed("", "Nama Product sudah terpakai !", this.res);
    }

    params = [
      {
        prod_name: nama,
        prod_sku: this.req.headers.authorization.split(" ")[1],
        prod_amount: Number(harga),
        prod_author: Number(this.credential.user_id),
      },
    ];

    store = await ProductRepos.save(params);

    if (store) {
      result = {
        id: store[0].prod_id,
        nama: store[0].prod_name,
        sku: store[0].prod_sku,
        harga: store[0].prod_amount,
        created_at: moment(store[0].prod_register).format("dddd, DD MMMM YYYY"),
      };

      return response.success(result, "Data berhasil ditambahkan !", this.res);
    }

    return response.failed("", "Data gagal ditambahkan !", this.res);
  };

  putProduct = async () => {
    const ProductRepos = getRepository(Product);
    const { id } = this.req.params;
    const { nama, harga } = this.body;
    let product: Product, update: any, result: any;

    if (!(id && nama && harga)) {
      return response.validation("", "Data tidak lengkap !", this.res);
    }

    try {
      product = await ProductRepos.findOne({ where: { prod_id: Number(id) } });
    } catch (error) {
      console.log(error);
      return response.failed("", "Maaf Server sedang bermasalah !", this.res);
    }

    if (product) {
      product.prod_name = nama;
      product.prod_sku = this.req.headers.authorization.split(" ")[1];
      product.prod_amount = Number(harga);

      update = await ProductRepos.save(product);

      result = {
        id: update.prod_id,
        nama: update.prod_name,
        sku: update.prod_sku,
        harga: update.prod_amount,
        created_at: moment(update.prod_register).format("dddd, DD MMMM YYYY"),
        updated_at: moment(update.prod_updated).format("dddd, DD MMMM YYYY"),
      };

      return response.success(result, "Data berhasil diperbarui !", this.res);
    }

    return response.failed("", "Data tidak ditemukan !", this.res);
  };

  getDetail = async () => {
    const ProductRepos = getRepository(Product);
    const { id } = this.req.params;
    let product: Product, result: any;

    try {
      product = await ProductRepos.findOne({ where: { prod_id: Number(id) } });
    } catch (error) {
      console.log(error);
      return response.failed("", "Maaf Server sedang bermasalah !", this.res);
    }

    if (product) {
      result = {
        id: product.prod_id,
        nama: product.prod_name,
        sku: product.prod_sku,
        harga: product.prod_amount,
        created_at: moment(product.prod_register).format("dddd, DD MMMM YYYY"),
        updated_at: moment(product.prod_updated).format("dddd, DD MMMM YYYY"),
      };

      return response.success(result, "Data berhasil diperbarui !", this.res);
    }

    return response.failed("", "Data tidak ditemukan !", this.res);
  };

  deleteProduct = async () => {
    const ProductRepos = getRepository(Product);
    const { id } = this.req.params;
    let product: Product, result: any, deleted: any;

    if (!id) {
      return response.validation("", "Data tidak lengkap !", this.res);
    }

    try {
      product = await ProductRepos.findOne({ where: { prod_id: Number(id) } });
    } catch (error) {
      console.log(error);
      return response.failed("", "Maaf Server sedang bermasalah !", this.res);
    }

    if (product) {
      deleted = await ProductRepos.softDelete({
        prod_id: Number(id),
      });

      result = {
        id: product.prod_id,
        nama: product.prod_name,
        sku: product.prod_sku,
        harga: product.prod_amount,
        deleted_at: moment(deleted.prod_deleted).format("dddd, DD MMMM YYYY"),
      };

      return response.success(result, "Data berhasil dihapus !", this.res);
    }

    return response.failed("", "Data tidak ditemukan !", this.res);
  };
}

export default ProductService;
