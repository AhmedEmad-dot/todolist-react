import { v4 as uuidv4 } from 'uuid';


export default function Reducer(currentState, action) {
    switch (action.type) {
        case "start": {
            const storgeTodos = JSON.parse(localStorage.getItem("todos")) ?? []
            return storgeTodos
       }
       
        case "added": {
            const newTodo = {
                id: uuidv4(),
                title: action.payload.title,
                details: "",
                isComplete: false
              }
              const updateTodos = [...currentState, newTodo]
              
              localStorage.setItem("todos", JSON.stringify(updateTodos))
            return updateTodos
        }
        case "deleted": { 
            const update = currentState.filter((t) => {
                return t.id != action.payload.id
            })
            localStorage.setItem("todos", JSON.stringify(update))   
            return update
        }
        case "updated": {
            const update = currentState.map((t) => {
                if (t.id == action.payload.id) {
                    return {...t, title: action.payload.title, details: action.payload.details}
                } else {
                    return t
                }
            })
            localStorage.setItem("todos", JSON.stringify(update))
            return update
        }
        case "checked": {
            const update = currentState.map((t) => {
                if (t.id == action.payload.id) {
                    const updateiscompleted = {
                    ...t, isComplete: !t.isComplete
                    }
                    return updateiscompleted
                }
                return t;
            });
            localStorage.setItem("todos", JSON.stringify(update))
            return update
        }
        case "deleteall": {
            localStorage.setItem("todos", JSON.stringify([]));
            return [];
            }
            
        default: {
            throw(Error("UnKnown action" + action.type) )
        }
    }
}