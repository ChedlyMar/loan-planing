import React, { useState } from "react"
import { IProduct } from "src/models/product"

interface IProps {
    handelSelectProduct: (product: IProduct) => void
}

const ProductList = ({ handelSelectProduct }: IProps) => {
    const [productList, setProductList] = useState<Array<IProduct>>([
        {
            id: "20",
            interest: "4.500",
            name: "Cash Loan",
            min_amount: "1500.000",
            max_amount: "25000.000",
            min_tenure: "24",
            max_tenure: "60",
            image: "https://cdn.pixabay.com/photo/2018/10/01/22/57/dollar-3717534_960_720.png",
        },
        {
            id: "21",
            interest: "4.500",
            name: "Automobile Loan",
            min_amount: "1000.000",
            max_amount: "25000.000",
            min_tenure: "12",
            max_tenure: "60",
            image: "https://cdn.pixabay.com/photo/2017/01/08/07/49/travel-1962321_1280.png",
        },
        {
            id: "25",
            interest: "4.500",
            name: "Housing Loan",
            min_amount: "1000.000",
            max_amount: "70000.000",
            min_tenure: "12",
            max_tenure: "84",
            image: "https://cdn.pixabay.com/photo/2017/06/05/19/05/house-2374925_960_720.png",
        },
    ])

    return (
        <div className="mt-7 flex justify-center">
            {productList.map((product) => (
                <div key={product.id}>
                    <img
                        onClick={() => handelSelectProduct(product)}
                        className="w-16 ml-4 rounded-full"
                        src={product.image}
                        alt={product.name}
                    />
                </div>
            ))}
        </div>
    )
}

export default ProductList
