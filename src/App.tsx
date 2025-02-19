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
        <div className="min-h-[45px] max-w-4xl mx-auto flex justify-around lg:justify-between items-center max-sm:stiky max-sm:top-0">
          <h1 className="text-center text-lg max-sm:text-base font-bold text-white uppercase">
            Contador de calorías 
          </h1>
          <button 
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10 shrink-0"
            disabled={!canRestartApp()}
            onClick={() => dispatch({type: 'restart-app'})}
            >Reiniciar App</button>
        </div>
      </header>

      <div className="flex flex-col">
        <div className="flex order-first max-sm:order-last max-sm:flex-col">
          <section className="bg-lime-500 py-20 max-sm:py-5 px-5 w-[40%] max-sm:w-full max-sm:order-last">
            <div className="max-w-4xl mx-auto">
              <Form
                dispatch = {dispatch}
                state = {state}
              />
            </div>
          </section>

          <section className="p-10 max-sm:p-2 mx-auto w-[60%] max-sm:w-full">
            <ActivityList 
              activities={state.activities}
              dispatch={dispatch}
            />
          </section>
        </div>

        <section className="order-last max-sm:order-first bg-gray-800 py-10 max-sm:py-2">
          <div className="max-w-4xl mx-auto">
            <CalorieTracker 
              activities = {state.activities}
            />
          </div>
        </section>
      </div>
     
      
    </>
  )
}

export default App
