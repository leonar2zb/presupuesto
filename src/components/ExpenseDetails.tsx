import { Expense } from "../types"
import { formatDate } from "../helpers"
import AmountDisplay from "./AmountDisplay"
import { useMemo } from "react"
import { categories } from "../data/categories"

type ExpenseDetailsProp = {
    expense: Expense
}
export default function ExpenseDetails({ expense }: ExpenseDetailsProp) {
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])
    return (
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-20 flex gap-5 items-center">
            <div>
                <img src={`/icono_${categoryInfo.icon}.svg`} alt="Icono gasto" className="w-20" />
            </div>
            <div className="flex-1 space-y-2">
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
            </div>
            <AmountDisplay amount={expense.amount} />
        </div>)
}