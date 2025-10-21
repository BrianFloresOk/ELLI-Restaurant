export interface CreateProductDto {
    name: string;
    price: number;
    type: ProductType;
    categoryId: number;
    description?: string | "";
    stock?: number;
}

export type ProductType = "DISH" | "DRINK";