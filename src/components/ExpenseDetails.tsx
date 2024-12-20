import { Expense } from "../types"

type ExpenseDetailsProp = {
    expense: Expense
}
export default function ExpenseDetails({ expense }: ExpenseDetailsProp) {
    return (<div>{expense.expenseName}</div>)
}