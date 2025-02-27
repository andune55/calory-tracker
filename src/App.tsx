import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import { activityReducer, initialState } from "./reducers/activity-reducers"
import CalorieTracker from "./components/CalorieTracker"

function App() {  

  const [state, dispatch] = useReducer(activityReducer, initialState)  

  useEffect(() => {
    localStorage.setItem('activities',JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>

      <header className="bg-lime-600">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorías 
          </h1>
          <button 
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({type: 'restart-app'})}
            >Reiniciar App</button>
        </div>
      </header>

      <div className="flex max-sm:flex-col">
        <section className="bg-lime-500 py-20 px-5 w-[40%] max-sm:w-full">
          <div className="max-w-4xl mx-auto">
            <Form
              dispatch = {dispatch}
              state = {state}
            />
          </div>
        </section>

        <section className="p-10 mx-auto w-[60%] max-sm:w-full">
          <ActivityList 
            activities={state.activities}
            dispatch={dispatch}
          />
        </section>
      </div>

      <section className="bg-gray-800 py-10">
      <div className="max-w-4xl mx-auto">
        <CalorieTracker 
          activities = {state.activities}
        />
      </div>
      </section>

     
      
    </>
  )
}

export default App
