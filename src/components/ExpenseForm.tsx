import { ChangeEvent, FormEvent, useState } from "react"
import { categories } from "../data/categories"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { DraftExpense } from "../types"
import { Value } from "react-calendar/src/shared/types.js"
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(expense).includes(''))
            setError('Todos los campos son obligatorios')
        else {
            setError('')
            dispatch({ type: 'add-expense', payload: { expense } })
        }
    }


    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
            >Nuevo Gasto</legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName"
                    className="text-xl"
                >Nombre Gasto:</label>
                <input type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount"
                    className="text-xl"
                >Cantidad:</label>
                <input type="number"
                    id="amount"
                    placeholder="Añade cantidad del gasto: pej 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category"
                    className="text-xl"
                >Categoría:</label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option
                            key={category.icon}
                            value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="text-xl"
                >Fecha Gasto:</label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={'Registrar gasto'}
            />

        </form>
    )
}