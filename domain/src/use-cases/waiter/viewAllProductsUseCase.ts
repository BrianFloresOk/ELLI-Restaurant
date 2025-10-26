import { ProductService } from "../../services/product/ProductService";

interface Dependencies {
    productService: ProductService
}

interface ViewAllProductsInput {
    dependencies: Dependencies
}

export async function viewAllProductsUseCase({ dependencies }: ViewAllProductsInput) {
    const { productService } = dependencies;
    return productService.findAll();
}