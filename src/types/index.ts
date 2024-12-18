type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece]

export type Expense = {
    id: string
    amount: number
    expenseName: string
    category: string
    date: Value
}

export type DraftExpense = Omit<Expense, 'id'>

export type category = {
    id: string
    name: string
    icon: string
}