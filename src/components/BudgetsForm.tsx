import { useState, ChangeEvent } from "react"

export default function BudgetForm() {
    const [budget, setBudget] = useState(0)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }
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
                className="rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase"
            />
        </form>
    )
}