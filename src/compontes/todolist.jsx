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

import { useState, useEffect, useMemo} from 'react';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTodos } from "../context/todoscontext";
import {useToast} from "../context/toast"


export default function TodoList() {
  console.log("to do list")
  const [titleinput, settitleinput] = useState("");
  const {todost, dispatch} = useTodos();
  const [showDelte, setshowDelte] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showUpdate, setshowUpdate] = useState(false)
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  const {showHideToast} = useToast();
  
  
  const [displaytodosType, setdisplaytodosType] = useState("all")

  function changetodosType(e) {
    setdisplaytodosType(e.target.value)
  }
  
  useEffect(() => {
    dispatch({type: "start"})
  }, [])

  function handletodoclik() {

    dispatch({type: "added" , payload: {title: titleinput} })
    settitleinput("");
    showHideToast("تم الاضافة بنجاخ")
  };
  function handledelteall() {
    dispatch({ type: "deleteall" });
    setShowDeleteAll(false);
    showHideToast("تم حذف جميع المهام بنجاح");
  }
  function handleCloseDeleteAll() {
    setShowDeleteAll(false);
  }
  function openDeleteDialog(todo) {
		setDialogTodo(todo);
		setshowDelte(true);
  }
  function openDeleteAllDialog() {
    setShowDeleteAll(true);
  }
  
  function handleCloseDelete() {
    setshowDelte(false)
  }

  function handleConfirmDelte() {
    dispatch({type: "deleted" , payload: dialogTodo })
    setshowDelte(false)
    showHideToast("تم الحدف بنجاح")
  }
  function handleCloseUpdate() {
    setshowUpdate(false)
}
function handleConfirmUpdate() {
  dispatch({type: "updated" , payload: dialogTodo })
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
      {/* Start dialog for delete all */}
      <Dialog
        open={showDeleteAll}
        onClose={handleCloseDeleteAll}
        style={{ direction: "rtl" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من حذف جميع المهام؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            سيتم حذف جميع المهام بشكل نهائي ولا يمكن استرجاعها.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteAll}>إغلاق</Button>
          <Button onClick={handledelteall} autoFocus>
            حذف الكل
          </Button>
        </DialogActions>
      </Dialog>
      {/* End dialog for delete all */}
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
              <Grid size={2}>
                <Button onClick={() => { 
                  handletodoclik();
                  }} style={{ width: "100%", height: "100%", backgroundColor: "#d23232" }} variant="contained">اضافة</Button>
                </Grid>
                <Grid size={2}>
                <Button onClick={() => { 
                  openDeleteAllDialog();
                  }} style={{ width: "100%", height: "100%", backgroundColor: "#d23232" }} variant="contained">حدف الكل</Button>
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