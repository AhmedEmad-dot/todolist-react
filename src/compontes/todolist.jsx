import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './todo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useState, useContext, useEffect, useMemo} from 'react';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TodosContext } from "../context/todoscontext";
import {useToast} from "../context/toastutils"


export default function TodoList() {
  console.log("to do list")
  const [titleinput, settitleinput] = useState("");
  const { todost, settodost } = useContext(TodosContext);
  const [showDelte, setshowDelte] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showUpdate, setshowUpdate] = useState(false)
  
  const {showHideToast} = useToast();
  
  
  const [displaytodosType, setdisplaytodosType] = useState("all")

  function changetodosType(e) {
    setdisplaytodosType(e.target.value)
  }
  
  useEffect(() => {
    const storgeTodos = JSON.parse(localStorage.getItem("todos")) ?? []
    settodost(storgeTodos)
  }, [settodost])

  function handletodoclik() {

    const newTodo = {
      id: uuidv4(),
      title: titleinput,
      details: "",
      isComplete: false
    }
    const updateTodos = [...todost, newTodo]
    settodost(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos))
    settitleinput("");
    showHideToast("تم الاضافة بنجاخ")
  };

  function openDeleteDialog(todo) {
		setDialogTodo(todo);
		setshowDelte(true);
  }
  
  function handleCloseDelete() {
    setshowDelte(false)
  }

  function handleConfirmDelte() {
    const update = todost.filter((t) => {
        return t.id != dialogTodo.id
    })
    settodost(update)
    localStorage.setItem("todos", JSON.stringify(update))   
    setshowDelte(false)
    showHideToast("تم الحدف بنجاح")
  }
  function handleCloseUpdate() {
    setshowUpdate(false)
}
function handleConfirmUpdate() {
    const update = todost.map((t) => {
        if (t.id == dialogTodo.id) {
            return {...t, title: dialogTodo.title, details: dialogTodo.details}
        } else {
            return t
        }
    })
    settodost(update)
    localStorage.setItem("todos", JSON.stringify(update))
  setshowUpdate(false)
  showHideToast("تم التحديث بنجاح")
    
  }
  function openUpdateDialog(todo) {
  setDialogTodo(todo);
  setshowUpdate(true);
}




  const todosCompleted = useMemo(() => {
      return todost.filter((t) => {
        console.log("completed")
        return t.isComplete
      })
    }, [todost])


  const todosNonCompleted = useMemo(() => {
    return todost.filter((t) => {
    console.log("not completed")
    return !t.isComplete
  })
  }, [todost])
  let todosTobeRender = todost

  if (displaytodosType === "completed") {
    todosTobeRender = todosCompleted
  } else if (displaytodosType === "non-completed") {
    todosTobeRender = todosNonCompleted
  }
  const todos = todosTobeRender.map((t) => {
    return <Todo key={t.id} todo={t} showDelte={openDeleteDialog} showUpdate={openUpdateDialog} />
  })
  return (
    <>
                  {/* Start dialog for delete */}
                  <Dialog
              open={showDelte}
                      onClose={handleCloseDelete}
                      style={{direction: " rtl"}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                هل أنت متاكد من حدف المهمة؟
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  احدر عند الحدف لا يمكنك استرجاع المهمة مرة اخري
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDelete}>إغلاق</Button>
                <Button onClick={handleConfirmDelte} autoFocus>
                  حدف
                </Button>
              </DialogActions>
                  </Dialog>
      {/* End dialog for delete */}
      
            {/* Start dialog for update */}
            <Dialog
        open={showUpdate}
        onClose={handleCloseUpdate}
        style={{direction: "rtl"}}        
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent >
         <DialogContentText>
           <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo?.title}
            onChange={(e) => {
              setDialogTodo({...dialogTodo, title: e.target.value})
            }}                
                    />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="details"
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo?.details}
            onChange={(e) => {
              setDialogTodo({...dialogTodo, details: e.target.value})
            }}      
          />     
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>اغلاق</Button>
          <Button onClick={handleConfirmUpdate}>تعديل</Button>
        </DialogActions>
      </Dialog>
            {/* End dialog for update */}
       <Container  sx={{ minWidth: 500 }} maxWidth="md" style={{direction: "rtl"}}>
      <Card sx={{ minWidth: 500, maxHeight: "85vh", padding: "20px"}}  >
          <CardContent >
            <div>
            <Typography gutterBottom sx={{}} variant='h4'>
          مهامي
        </Typography>
          <Divider />
          {/* Start toggle button  */}
      <ToggleButtonGroup
          exclusive
            aria-label="text alignment"
              style={{ marginTop: "20px", direction: "ltr" }}
              value={displaytodosType}
              onChange={changetodosType}
        >
      <ToggleButton size="small" value="non-completed"  >الغير منجز</ToggleButton>
      <ToggleButton size="small" value="completed"  >المنجز</ToggleButton>
      <ToggleButton size="small" value="all"  >الكل</ToggleButton>
    </ToggleButtonGroup>
        {/* End  toggle button  */}  
                    
       
            </div>

          
          <div className='custom-scroll' style={{maxHeight: "50vh"}}>
             {/* Start TodoList */}
                    
             {todos}
        {/* End TodoList */}
          </div>
          <div>
                 {/* Start add button */}
                 <Grid container spacing={2} style={{marginTop: "15px" }} >
              <Grid size={8}>
                <TextField value={titleinput} onChange={(e) => {
                  settitleinput(e.target.value);
              }} style={{width: "100%"}} id="outlined-basic" label="اضافة مهمة" variant="outlined" />
              </Grid>
              <Grid size={4}>
                <Button onClick={() => { 
                  handletodoclik();
                }} style={{width: "100%", height: "100%", backgroundColor: "#d23232"}} variant="contained">اضافة</Button>
              </Grid>
          </Grid>
        {/* End add button */}
            </div>
            </CardContent>
    </Card>

    </Container>
      </>
    )
}