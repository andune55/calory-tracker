import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducers"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState : Activity= {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({dispatch, state}: FormProps) {

    const[activity, setActivity] = useState<Activity>(initialState) 

    useEffect(() => {
       if(state.activeId){
        //console.log(`ya hay algo en activeId: ${state.activeId}`)
        const selectActivity = state.activities.filter((actividad)=> actividad.id === state.activeId)[0]
        //console.log(selectActivity)
        setActivity(selectActivity)
       }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) =>{   
        const isNumberField = ['category','calories'].includes(e.target.id)
        setActivity({
            ...activity,           
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () =>{
        const { name, calories } = activity
        return name.trim() != '' && calories > 0 //devuelve true cuando ambas se cumplen
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: {newActivity: activity} })
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (    
        <form
            className="space-y-5 bg-white shadow p-10 max-sm:p-5 rounded-lg"
            onSubmit={handleSubmit}
        >

            <div className="gris grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select 
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="gris grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input 
                    id="name"
                    type="text" 
                    className="w-full border border-slate-300 p-2 rounded-lg"
                    placeholder="Por ej: Comida, zumo de naranja, ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}  
                    onChange={handleChange}              
                />
            </div>

            <div className="gris grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input 
                    id="calories"
                    type="number" 
                    className="w-full border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorías Por ej: 300, 500"
                    value={activity.calories}
                    onChange={handleChange}
                    />
            </div>

            <input 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
                disabled={!isValidActivity()}
            />
        </form>  
    )
}
