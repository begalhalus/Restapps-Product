import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {
  static product = async (req: Request, res: Response): Promise<any> => {
    const service: ProductService = new ProductService(req, res);

    try {
      await service.getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  static store = async (req: Request, res: Response): Promise<any> => {
    const service: ProductService = new ProductService(req, res);

    try {
      await service.postProduct();
    } catch (error) {
      console.log(error);
    }
  };

  static edit = async (req: Request, res: Response): Promise<any> => {
    const service: ProductService = new ProductService(req, res);

    try {
      await service.putProduct();
    } catch (error) {
      console.log(error);
    }
  };

  static detail = async (req: Request, res: Response): Promise<any> => {
    const service: ProductService = new ProductService(req, res);

    try {
      await service.getDetail();
    } catch (error) {
      console.log(error);
    }
  };

  static delete = async (req: Request, res: Response): Promise<any> => {
    const service: ProductService = new ProductService(req, res);

    try {
      await service.deleteProduct();
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProductController;
