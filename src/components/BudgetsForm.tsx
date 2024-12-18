import { useState, ChangeEvent, useMemo } from "react"

export default function BudgetForm() {
    const [budget, setBudget] = useState(0)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        (!isNaN(+value) && +value > 0) ? setBudget(+value) : setBudget(0)
    }

    const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget])
    return (
        <form className="space-y-5">
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center" >Definir Presupuesto</label>
                <input type="number" id="budget" name="budget"
                    value={budget} onChange={handleChange}
                    placeholder="Define tu presupuesto"
                    className="w-full bg-white border border-gray-200 p-2" />
            </div>
            <input type="submit" value="Definir presupuesto"
                className="disabled:opacity-40 disabled:cursor-not-allowed rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase"
                disabled={isValid}
            />
        </form>
    )
}