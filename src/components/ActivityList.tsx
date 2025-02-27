import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducers"

type ActivityListProps = {
    activities: Activity[]
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch}: ActivityListProps) {  
    
    const categoryName = useMemo(()=> 
        (category:Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '')
    , [activities]
    )

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

        {isEmptyActivities 
            ? <p className="text-center my-5">No hay actividades aún</p> :
        
        activities.map(activity => (
            <div key={activity.id} className="px-5 py-2 bg-white mt-4 flex justify-between">
                <div className="space-y-2 relative">
                    {/* Muestra actividad: categoría, nombre y calorías */}
                    <p className={`absolute -top-6 -left-8 px-5 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                        {/* {activity.category} */}
                        {categoryName(+activity.category)}
                        
                    </p>
                    <div className="flex items-baseline">
                        <p className="text-xl font-bold">{activity.name} - </p> 
                        <p className="font-black text-xl text-lime-500 ml-1.25">
                            {activity.calories} {''}
                            <span>Calorías</span>
                        </p>
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    {/* Acciones para editar/eliminar esa actividad */}
                    <button
                        className="cursor-pointer"
                        onClick={() => dispatch({type:"set-activeId", payload: {id: activity.id}})}
                    >
                        <PencilSquareIcon 
                            className="h-8 w-8 text-g"
                        />
                    </button>

                    <button
                        className="cursor-pointer"
                        onClick={() => dispatch({type:"delete-activity", payload: {id: activity.id}})}
                    >
                        <XCircleIcon 
                            className="h-8 w-8 text-red-500"
                        />
                    </button>
                </div>
                
            </div>
        ))
        }
    </>
    )
}
