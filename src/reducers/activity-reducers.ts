import { Activity } from "../types"

//ACCIONES - type que va a describir lo que va a pasar en nuestro reducer
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' } 

export type ActivityState = {
    activities : Activity[], //este state de este reducer se va a llamar activities y va a ser de tipo Activity[](ya lo teníamos definido en types)
    activeId : Activity['id'] 
}

const localStorageActivities = () : Activity[] =>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}
//STATE - nuestro state inicial que es un objeto necesita un type (definimos arriba 'ActivityState'). En nuestro state de actividades vamos a tener un arreglo.
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

//REDUCER - que conecta a ambos, nuestras acciones y el state
export const activityReducer = (
        state : ActivityState = initialState,
        action: ActivityActions
    ) => {
    
    if(action.type === 'save-activity'){
        let updatedActivities : Activity[] = []
        
        if(state.activeId){
            //vamos a iterar sobre cada actividad porque hemos de identificar cual tiene el activeId y pasarle el nuevo payload
            updatedActivities = state.activities.map( actividad => actividad.id === state.activeId ? action.payload.newActivity : actividad)

        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        
        return{
            ...state,
            //activities: [...state.activities, action.payload.newActivity]
            activities: updatedActivities,
            activeId: ''
        }
    }
    
    if(action.type === 'set-activeId'){
        //Este código maneja la lógica para actualizar el state activeId
        //console.log('desde el type de set-activeId') //console.log(action.payload.id)         
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        return{
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app'){
        return{
            activities: [],
            activeId: ''
        }
    }

    return state
}