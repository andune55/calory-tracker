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
        <h2 className="text-4xl max-sm:text-2xl max-sm:mb-2 font-bold text-slate-600 text-center">Comida y Actividades</h2>

        {isEmptyActivities 
            ? <p className="text-center my-5">No hay actividades aún</p> :
        
        activities.map(activity => (
            <div key={activity.id} className={`px-3 max-sm:px-0 py-2 max-sm:py-0 bg-white mt-4 max-sm:mt-0 max-sm:mb-1.25 flex justify-between rounded-md max-sm:shadow ${activity.category === 1 ? 'border-lime-500' : 'border-orange-500'}`}>
                <div className="space-y-2 max-sm:w-full">
                    {/* Muestra actividad: categoría, nombre y calorías */}
                    <p className={`flex items-center max-sm:text-left px-4 max-sm:my-0 max-sm:rounded-tl-xl text-white uppercase ${activity.category === 1 ? 'bg-lime-500 max-sm:bg-linear-to-r from-lime-500 to-white' : 'bg-orange-500 max-sm:bg-linear-to-r from-orange-500 to-white'}`}>
                        {/* {activity.category} */}
                        <span className="font-bold">{categoryName(+activity.category)}&nbsp;</span><span className="text-black text-xs">{` - ${activity.name}`}</span> 
                        
                    </p>
                    <div className="flex items-baseline">                        
                        <p className={`font-black text-xl ${activity.category === 1 ? 'text-lime-500' : 'text-orange-500'} ml-1.25`}>
                            {activity.calories} {''}
                            <span>Calorías</span>
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
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
