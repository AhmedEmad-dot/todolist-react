// import { useState } from 'react's
import './App.css'
import TodoList from './compontes/todolist'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  TodosProvider  from './context/todoscontext';
import {ToastProvider} from "./context/toast"



function App() {


  const theme = createTheme({
    typography: {
      fontFamily: ["cairo"]
    }
  })


  return (
    <>
      <ThemeProvider theme={theme}>
        <TodosProvider>
          <ToastProvider>
              <TodoList />
          </ToastProvider>
        </TodosProvider>
        </ThemeProvider>  
    </>
  )
}

export default App
