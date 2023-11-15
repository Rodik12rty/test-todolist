import {useState, DragEvent} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';




export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    order: number
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "Html&Css", isDone: true},
    //     {id: v1(), title: "Js", isDone: true},
    //     {id: v1(), title: "React&Redux", isDone: false},
    //     {id: v1(), title: "Python&Django", isDone: false}
    // ]);

    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let task: TaskType = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        // Достанем нужный массив  по todolistId.
        let tasks = tasksObj[todolistId];
        // Найдём нужную таску.
        let task = tasks.find(t => t.id === taskId);
        // Изменим таску если она нашлась.
        // Проверяем есть ли нужная таска с id, если есть то только тогда выполняем условие, если бы мы не выполнили
        // и не проверяли на условие, то при приходе таски без id, возникла бы ошибка undefined
        if (task) {
            task.isDone = isDone;
            // Засетаем в стейт копию объекта, что бы React отреагировал перерисовкой.
            setTasks({...tasksObj});
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj});
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        } 
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolists);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    let [number, setNumber] = useState(5);
    function addTodolist(title: string) {
        let todolist: TodolistType = {id: v1(), title: title, filter: "all", order: number};
        setTodolists([todolist, ...todolists]);
        setTasks({...tasksObj, [todolist.id]: []});
        setNumber(number+1);
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        let todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    // drag and drop
    let dragStartHandler = (e: DragEvent<HTMLDivElement>, todolist: TodolistType) => {
        setCurrentTodolist(todolist);
    }

    let dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {

    }

    let dragEndHandler = (e: DragEvent<HTMLDivElement>) => {

    }

    let dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    let dropHandler = (e: DragEvent<HTMLDivElement>, todolist: TodolistType) => {
        e.preventDefault();
        setTodolists(todolists.map(t => {
            // Если id текущего элемента массива равен тудулисту в которую мы закидываем, то этому тудулисту а она находится снизу мы будем присваивать порядок того тудулиста, которую мы держим
            if (t.id === todolist.id) {  
                return {...t, order: currentTodolist!.order}
            }
            // Если id текущего элемента массива равен тудулисту которого мы держим, то у него порядок мы меняем на тот тудулист, которая снизу
            if (t.id === currentTodolist!.id) {
                return {...t, order: todolist.order}
            }
            return t;
        }));
    }

    // Мы меняем порядок, ну ни как не сортируем по нему, что-бы были изменения на странице нужна эта функция
    const sortCards = (a: TodolistType, b: TodolistType) => { 
        if (a.order < b.order) {
            return 1;
        } else {
            return -1;
        }
    }


    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();
    let todolistId4 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all", order: 1},
        {id: todolistId2, title: "What to buy", filter: "all", order: 2},
        {id: todolistId3, title: "Where to go today", filter: "all", order: 3},
        {id: todolistId4, title: "Schedule", filter: "all", order: 4}
    ]);

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "Html&Css", isDone: true},
            {id: v1(), title: "Js", isDone: true},
            {id: v1(), title: "React&Redux", isDone: true},
            {id: v1(), title: "Next", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Butter", isDone: false},
            {id: v1(), title: "Salt", isDone: false}
        ],
        [todolistId3]: [
            {id: v1(), title: "To the cinema", isDone: true},
            {id: v1(), title: "In a restaurant", isDone: false},
            {id: v1(), title: "To work", isDone: false},
            {id: v1(), title: "To school", isDone: false}
        ],
        [todolistId4]: [
            {id: v1(), title: "Breakfast", isDone: false},
            {id: v1(), title: "Lunch", isDone: false},
            {id: v1(), title: "Afternoon snack", isDone: false},
            {id: v1(), title: "Dinner", isDone: false}
        ]
    });

    // Так как в функции dropHandler нам эти тудулисты необходимо будет менять местами, нам необходимо будет запоминать взятый тудулист
    let [currentTodolist, setCurrentTodolist] = useState<TodolistType | null>(null);
 
    return (
        <div className="App">

            <AppBar position="static" style={{marginBottom: '20px'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container style={{maxWidth: '1300px'}}>
                <Grid container style={{marginBottom: '10px'}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={2}>
                    {
                        todolists.sort(sortCards).map((tl) => {

                            let tasksForTodolist = tasksObj[tl.id];

                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }

                            return (
                                <Grid key={tl.id}>
                                    <Paper elevation={4}>
                                        <Todolist title={tl.title}
                                                        tasks={tasksForTodolist}
                                                        removeTask={removeTask}
                                                        addTask={addTask}
                                                        changeTaskStatus={changeStatus}
                                                        changeTaskTitle={changeTaskTitle}
                                                        changeFilter={changeFilter}
                                                        key={tl.id}
                                                        id={tl.id}
                                                        filter={tl.filter}
                                                        removeTodolist={removeTodolist}
                                                        changeTodolistTitle={changeTodolistTitle}

                                                        dragStartHandler={dragStartHandler}
                                                        dragLeaveHandler={dragLeaveHandler}
                                                        dragEndHandler={dragEndHandler}
                                                        dragOverHandler={dragOverHandler}
                                                        dropHandler={dropHandler}
                                                        todolist={tl}
                                            />
                                    </Paper>
                                </Grid>
                            )

                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}


export default App; 
