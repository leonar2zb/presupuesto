import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import { Expense } from "../types"
import { formatDate } from "../helpers"
import AmountDisplay from "./AmountDisplay"
import { useMemo } from "react"
import { categories } from "../data/categories"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from '../hooks/useBudget'

type ExpenseDetailsProp = {
    expense: Expense
}

export default function ExpenseDetails({ expense }: ExpenseDetailsProp) {
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const { dispatch } = useBudget()

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => { dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } }) }}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })} destructive={true}                >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={0.75}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-20 flex gap-5 items-center">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="Icono gasto" className="w-20" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>
                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}