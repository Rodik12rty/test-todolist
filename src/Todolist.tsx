import {ChangeEvent, DragEvent} from 'react';
import {FilterValuesType, TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';




export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    id: string
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void

    dragStartHandler: (e: DragEvent<HTMLDivElement>, todolist: TodolistType) => void
    dragLeaveHandler: (e: DragEvent<HTMLDivElement>) => void
    dragEndHandler: (e: DragEvent<HTMLDivElement>) => void
    dragOverHandler: (e: DragEvent<HTMLDivElement>) => void
    dropHandler: (e: DragEvent<HTMLDivElement>, todolist: TodolistType) => void
    todolist: TodolistType
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);

    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onActiveClickHandler = () => props.changeFilter("active", props.id);

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    // Функция для того что бы обхитрить передачи пропсов в компоненту AddItemForm
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div style={{padding: '10px'}}
            draggable={true}    // Атрибут для того, что-бы можно было элемент перемещать с зажатой мышкой
            onDragStart={(e) => props.dragStartHandler(e, props.todolist)}    // Слушатель который срабатывает в тот момент, когда мы взяли карточку
            onDragLeave={(e) => props.dragLeaveHandler(e)}    // Слушатель который срабатывает в тот момент, когда мы вышли за пределы другой карточки
            onDragEnd={(e) => props.dragEndHandler(e)}    // Слушатель который срабатывает в тот момент, когда мы отпустили перемещение
            onDragOver={(e) => props.dragOverHandler(e)}    // Слушатель который срабатывает в тот момент, когда мы находимся над другим объектом
            onDrop={(e) => props.dropHandler(e, props.todolist)}    // Слушатель который срабатывает в тот момент, когда мы отпустили карточку и расчитываем что должно произойти какое то связанное с этим действие
        >
            <h3 style={{marginTop: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                {/* <button onClick={removeTodolist}>X</button> */}
                <IconButton aria-label="delete todolist" size="large" onClick={removeTodolist}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {props.removeTask(t.id, props.id)}

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            {/* <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler} /> */}
                            <Checkbox checked={t.isDone} onChange={onChangeStatusHandler} color={t.isDone ? 'success': 'error'} style={{paddingLeft: '0'}} />

                            <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                            
                            {/* <button onClick={onRemoveHandler}>X</button> */}
                            <IconButton aria-label="delete task" size="small" onClick={onRemoveHandler}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                {/* <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? 'active-filter' : ''}>Completed</button>
                <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'active-filter' : ''}>Active</button> */}

                <Button onClick={onAllClickHandler} 
                        variant={props.filter === 'all' ? 'contained' : 'text'}>
                    All
                </Button>
                <Button onClick={onCompletedClickHandler}
                        color="success"
                        variant={props.filter === 'completed' ? 'contained' : 'text'}>
                    Completed
                </Button>
                <Button onClick={onActiveClickHandler}
                        color="error"
                        variant={props.filter === 'active' ? 'contained' : 'text'}>
                    Active
                </Button>
            </div>
        </div>
    )
}
