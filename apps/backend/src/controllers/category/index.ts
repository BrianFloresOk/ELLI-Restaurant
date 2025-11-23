import { viewCategoriesUseCase } from "domain-elli";
import { CategoryRepository } from "../../repositories/categoryRepository";
import { errorResponse, successResponse } from "../../utils/apiResponse";
import { Request, Response } from "express";

export const viewAllCategories = async (req: Request, res: Response) => {
    try {

        const dataInput = {
            dependencies: {
                categoryService: CategoryRepository,
            }
        }

        const categories = await viewCategoriesUseCase(dataInput.dependencies);

        return successResponse({
            res,
            message: "Categories fetched successfully",
            data: categories,
            statusCode: 200,
        });

    } catch (error) {
        errorResponse({
            res,
            message: "Error fetching categories",
            statusCode: 500,
        });
    }
}