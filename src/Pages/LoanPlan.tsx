import Button from "@components/Button"
import LoanDescription from "@components/LoanDescription"
import ProductList from "@components/ProductList"
import React, { useState } from "react"
import { ILoanPlan } from "src/models/loanPlan"
import { IProduct } from "src/models/product"
import products from "../public/products.json"

const LoanPlan = () => {
    const [productList, setProductList] = useState<Array<IProduct>>(products)
    const [selectedProduct, setSelectedProduct] = useState(productList[0])
    const [loanPlan, setLoanPlan] = useState<ILoanPlan>({
        amount: productList[0].min_amount,
        monthsNumber: productList[0].min_tenure,
        endDate: "",
        totalAmount: (
            +productList[0].min_amount +
            (+productList[0].min_amount * +productList[0].interest) / 100
        ).toString(),
        monthlyAmount: (
            (+productList[0].min_amount +
                (+productList[0].min_amount * +productList[0].interest) / 100) /
            +productList[0].min_tenure
        ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
        previewsAmount: productList[0].min_amount,
    })

    const handelSelectProduct = (product: IProduct) => {
        setSelectedProduct(product)
        setLoanPlan({
            amount: product.min_amount,
            monthsNumber: product.min_tenure,
            endDate: "",
            totalAmount: (
                +product.min_amount +
                (+product.min_amount * +product.interest) / 100
            ).toString(),
            monthlyAmount: (
                (+product.min_amount + (+product.min_amount * +product.interest) / 100) /
                +product.min_tenure
            ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
            previewsAmount: productList[0].min_amount,
        })
    }

    const updateMonthHandler = (operation: string) => {
        if (operation === "increment" && loanPlan.monthsNumber < selectedProduct.max_tenure) {
            setLoanPlan({
                ...loanPlan,
                monthsNumber: (+loanPlan.monthsNumber + 1).toString(),
                monthlyAmount: (
                    (+loanPlan.amount + (+loanPlan.amount * +selectedProduct.interest) / 100) /
                    (+loanPlan.monthsNumber + 1)
                ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
            })
        }
        if (operation === "decrement" && loanPlan.monthsNumber > selectedProduct.min_tenure) {
            setLoanPlan({
                ...loanPlan,
                monthsNumber: (+loanPlan.monthsNumber - 1).toString(),
                monthlyAmount: (
                    (+loanPlan.amount + (+loanPlan.amount * +selectedProduct.interest) / 100) /
                    (+loanPlan.monthsNumber - 1)
                ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
            })
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<any>) => {
        e.key === "ArrowUp" && updateMonthHandler("increment")
        e.key === "ArrowDown" && updateMonthHandler("decrement")
    }

    const handelLoanAmount = (e: React.FocusEvent<HTMLInputElement>) => {
        if (
            +e.target.value > +selectedProduct.min_amount &&
            +e.target.value < +selectedProduct.max_amount
        ) {
            setLoanPlan({
                amount: e.target.value,
                monthsNumber: selectedProduct.min_tenure,
                endDate: "",
                totalAmount: (
                    +e.target.value +
                    (+e.target.value * +selectedProduct.interest) / 100
                ).toString(),
                monthlyAmount: (
                    (+e.target.value + (+e.target.value * +selectedProduct.interest) / 100) /
                    +selectedProduct.min_tenure
                ).toLocaleString(undefined, { maximumFractionDigits: 2 }),
                previewsAmount: e.target.value,
            })
        } else {
            setLoanPlan({ ...loanPlan, amount: loanPlan.previewsAmount })
        }
    }

    return (
        <div className="max-w-xl px-10 pb-10 bg-white text-black-label">
            {/* product list */}
            <ProductList handelSelectProduct={handelSelectProduct} />
            {/* form */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between">
                <div className="flex flex-col mr-0 sm:mr-4 mb-4 sm:mb-0">
                    <label className="text-sm">Loan amount</label>
                    <div className="flex flex-row w-full bg-transparent text-2xl font-medium text-[#4D6475] border-2 rounded h-14">
                        <div className="my-auto px-3 text-[#CBD5DC]">$</div>
                        <input
                            className="text-2xl	font-medium text-[#4D6475] rubik-font "
                            value={loanPlan.amount}
                            onChange={(e) => setLoanPlan({ ...loanPlan, amount: e.target.value })}
                            onBlur={handelLoanAmount}
                            type="number"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm ">Number of months</label>
                    <div className="flex flex-row w-full bg-transparent text-2xl font-medium text-[#4D6475] border-2 rounded h-14">
                        <button
                            onClick={(e) => updateMonthHandler("decrement")}
                            className="text-[#708797] w-20 rounded-r  cursor-pointer">
                            <span className="m-auto text-base font-thin">&lt;</span>
                        </button>
                        <input
                            type="number"
                            readOnly
                            className="text-center w-full text-base flex items-center text-[#4D6475]"
                            value={loanPlan.monthsNumber}
                            min={selectedProduct.min_tenure}
                            max={selectedProduct.max_tenure}
                            onKeyDown={handleKeyPress}></input>
                        <button
                            onClick={(e) => updateMonthHandler("increment")}
                            className="text-[#708797] w-20 rounded-r cursor-pointer">
                            <span className="m-auto text-base font-thin">&gt;</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* paragraph */}
            <LoanDescription loanPlan={loanPlan} />
            {/* button */}
            <div className="mt-8 flex justify-center">
                <Button />
            </div>
        </div>
    )
}

export default LoanPlan
