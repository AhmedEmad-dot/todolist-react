import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useContext } from 'react';
import { TodosContext } from '../context/todoscontext';
import TextField from '@mui/material/TextField';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {useToast} from "../context/toastutils"




export default function Todo({ todo , showDelte , showUpdate}) {
console.log("to do")


    const {todost, settodost} = useContext(TodosContext);
    const {showHideToast} = useToast();
    // Start handle Events ss
    
    function handlecheckbutton() {
        const update = todost.map((t) => {
            if (t.id == todo.id) {
            t.isComplete = !t.isComplete
            }
            return t;
        });
        
        settodost(update);
        localStorage.setItem("todos", JSON.stringify(update))
        showHideToast("نم التعديل بنجاح")
    }


    function handleDelteclick() {
        showDelte(todo)
    }


    function handleUpdateclick() {
        showUpdate(todo)
        
    }
    

    // End handle Events
    return (
        <>


            <Card className="tocard" sx={{ minWidth: 500, marginTop: 3, textAlign: 'right',bgcolor: "#3036d2", color: "white"}}>
                
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography gutterBottom sx={{textDecoration: todo.isComplete ? "line-through" : "none"}} variant='h5'>
                                {todo.title}
                            </Typography>
                            <Typography gutterBottom sx={{}} variant='hا6'>
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">

                            <IconButton onClick={() => {
                                handlecheckbutton();
                            }} className='iconbutton' style={{ backgroundColor: todo.isComplete ? "green" : "white", color: todo.isComplete ?  "white" : "green"  , border: "solid green 3px"}}> <CheckIcon />
                            </IconButton>
                            
                            <IconButton onClick={() => {
                                handleUpdateclick()
                        }} className='iconbutton' style={{backgroundColor: "white", color: "#1e23a3", border: "solid #1e23a3 3px"}}><ModeEditOutlineOutlinedIcon />
                            </IconButton>
                            
                            <IconButton onClick={() => {
                                handleDelteclick();
                            }} className='iconbutton' style={{ backgroundColor: "white", color: "#d23232", border: "solid #d23232 3px" }} >
            <DeleteOutlinedIcon />
                            </IconButton>
                            
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}