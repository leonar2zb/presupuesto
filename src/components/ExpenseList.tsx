import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails"

export default function ExpenseList() {
    const { state } = useBudget()
    const filterCategories = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    const isEmpty = useMemo(() => filterCategories.length === 0, [filterCategories])
    return (<div className="mt-10 bg-white shadow-lg rounded-lg p-5">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> : (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de gastos</p>
                {filterCategories.map(expense => (
                    <ExpenseDetails key={expense.id} expense={expense} />
                ))}
            </>
        )}
    </div>)
}