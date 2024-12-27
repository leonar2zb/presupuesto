import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'


export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-Modal' } |
    { type: 'close-Modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-budget' }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: ''
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
            modal: false,
            editingId: ''
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

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expemse => expemse.id === action.payload.expense.id ? action.payload.expense : expemse),
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'reset-budget')
        return {
            ...state,
            budget: 0,
            expenses: [],
        }
    return state

}