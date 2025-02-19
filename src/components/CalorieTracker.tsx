import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps) {

    //Contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity)=> activity.category === 1 ? total + activity.calories : total, 0), [activities])
    const caloriesBurned = useMemo(() => activities.reduce((total, activity)=> activity.category === 2 ? total + activity.calories : total, 0), [activities])
    const netCalories = useMemo(() => caloriesConsumed-caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl max-sm:text-2xl font-black text-white text-center">Resumen de calorías</h2>

            <div className="flex flex-col-item-center md:flex-row md:justify-between gap-5 mt-10 max-sm:mt-2">
               
               <CalorieDisplay 
                calories={caloriesConsumed}
                text={'Consumidas'}
               />
               <CalorieDisplay 
                calories={caloriesBurned}
                text={'Quemadas'}
               />
               <CalorieDisplay 
                calories={netCalories}
                text={'Diferencia'}
               />
                
            </div>
           
        </>
    )
}
