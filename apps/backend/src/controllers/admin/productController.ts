import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { ProductRepository } from "../../repositories/productRepository";
import { CreateProductDto } from "../../utils/dtos/createProductDto";
import { createProductUseCase, ProductType } from "domain-elli";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const payloadBody: CreateProductDto = req.body;

        const type = payloadBody.type = payloadBody.type.toUpperCase() as ProductType;

        const dataCreateProduct = {
            dependencies: { productService: ProductRepository },
            payload: {
                name: payloadBody.name,
                description: payloadBody.description,
                price: payloadBody.price,
                type,
                categoryId: payloadBody.categoryId,
                stock: payloadBody.stock,
            }
        }
        
        await createProductUseCase(dataCreateProduct);
        
        return successResponse({
            res,
            message: "Product created successfully",
            data: {},
            statusCode: 201,
        });
    } catch (error) {
        errorResponse({
            res,
            message: "Error creating product",
            statusCode: 500,
        });
    }
}