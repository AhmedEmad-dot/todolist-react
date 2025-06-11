// import { useState } from 'react's
import './App.css'
import TodoList from './compontes/todolist'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TodosContext } from './context/todoscontext';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {ToastProvider} from "./context/toast"



const todostable = [
  {
    id: uuidv4(),
    title: "المهمة الاولي",
    details: "قراءة كتاب",
    isComplete: false
  },
  {
    id: uuidv4(),
    title: "المهمة الاولي",
    details: "قراءة كتاب",
    isComplete: false
  },
  {
    id: uuidv4(),
    title: "المهمة الاولي",
    details: "قراءة كتاب",
    isComplete: false
  },
]


function App() {

  const [todost, settodost] = useState(todostable);

  const theme = createTheme({
    typography: {
      fontFamily: ["cairo"]
    }
  })


  return (
    <>
      <ThemeProvider theme={theme}>
      <ToastProvider>
          <TodosContext.Provider value={{todost, settodost}}>
              <TodoList />
          </TodosContext.Provider>
      </ToastProvider>
        </ThemeProvider>  
    </>
  )
}

export default App
