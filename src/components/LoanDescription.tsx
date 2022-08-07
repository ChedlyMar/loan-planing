import React, { useEffect, useState } from "react"
import { ILoanPlan } from "src/models/loanPlan"

interface IProps {
    loanPlan: ILoanPlan
}

const LoanDescription = ({ loanPlan }: IProps) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const [targetMonth, setTargetMonth] = useState<string>()

    useEffect(() => {
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()
        const monthIndex = (currentMonth + +loanPlan.monthsNumber) % 12
        const year = currentYear + Math.floor((+loanPlan.monthsNumber - monthIndex) / 12) + 1
        setTargetMonth(months[monthIndex] + " " + year.toString())
    }, [loanPlan.monthsNumber])

    return (
        <div className="mt-6 flex flex-col border-2 rounded	">
            <div className="flex justify-between text-xl px-8 py-6">
                <div>Monthly amount</div>
                <div className="text-blue-number text-3xl font-medium	rubik-font">
                    ${loanPlan.monthlyAmount}
                </div>
            </div>
            <div className="text-xs	text-black-paragraph bg-grey-color px-8 py-6  rounded-b ">
                You’re planning {loanPlan.monthsNumber}{" "}
                <strong className="font-semibold">monthly deposits</strong> to reach your{" "}
                <strong className="font-semibold">${loanPlan.amount}</strong> goal by{" "}
                <strong className="font-semibold">{targetMonth}</strong>. The total amount loaned
                will be <strong className="font-semibold">${loanPlan.totalAmount}</strong>
            </div>
        </div>
    )
}

export default LoanDescription
