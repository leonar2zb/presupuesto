import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'


export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-Modal' } |
    { type: 'close-Modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: []
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {
        console.log(action.payload.budget)
        return {
            ...state,
            budget: action.payload.budget
        }
    }
    if (action.type === 'show-Modal')
        return {
            ...state,
            modal: true
        }

    if (action.type === 'close-Modal')
        return {
            ...state,
            modal: false
        }

    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(exp => exp.id !== action.payload.id)
        }
    }
    return state

}