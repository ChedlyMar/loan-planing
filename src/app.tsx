/* eslint-disable prettier/prettier */
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import LoanPlan from "./Pages/LoanPlan"

const App = () => (
    <div className="w-full h-full flex justify-center items-center bg-neutral-color">
        <LoanPlan/>
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
