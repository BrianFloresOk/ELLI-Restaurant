import { Request, Response } from "express";
import { ProductRepository } from "../../repositories/productRepository";
import { viewAllProductsUseCase } from "domain-elli";
import { errorResponse, successResponse } from "../../utils/apiResponse";

export const viewAllProducts = async (req: Request, res: Response) => {
    try {
        const data = {
            dependencies: { productService: ProductRepository },
        };
        const products = await viewAllProductsUseCase(data);
        return successResponse({
            res,
            message: "Products fetched successfully",
            statusCode: 200,
            data: products,
        });
    } catch (error) {
        return errorResponse({
            res,
            message: "Error fetching products",
            statusCode: 500,
        });
    }
};