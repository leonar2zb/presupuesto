import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget } = useBudget()
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar value={percentage}
                    styles={buildStyles({
                        pathColor: percentage < 90 ? `rgba(59, 130, 246,${percentage / 100})`
                            : `rgba(220, 38, 38,${percentage / 100})`,
                        trailColor: '#f5f5f5',
                        textSize: 8,
                        textColor: percentage < 90 ? '#3b82f6' : '#dc2626'
                    })}
                    text={`${percentage}% Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase rounded-lg font-bold"
                >
                    Resetear App
                </button>
                <AmountDisplay label="Presupuesto" amount={state.budget} />
                <AmountDisplay label="Disponible" amount={remainingBudget} />
                <AmountDisplay label="Gastado" amount={totalExpenses} />

            </div>
        </div>
    )
}