import { createContext , useContext, useReducer} from "react";
import todosreducer from "../reducers/todosreducer"

const TodosContext = createContext({})

 const TodosProvider = ({ children}) => {
    const [todost , dispatch ] = useReducer(todosreducer , [])

     return (
        <>
            <TodosContext.Provider value={{todost :todost,  dispatch: dispatch}}>
                {children}
            </TodosContext.Provider>
        </>
    )
} 

export function useTodos() {
    return useContext(TodosContext)
}

export default TodosProvider