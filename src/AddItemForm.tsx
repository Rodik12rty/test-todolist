import {ChangeEvent, KeyboardEvent, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';




type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.key === "Enter") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }
    }

    const addTask = () => {
        // trim() это функция которая обрезает пробелы в input-е с обоих сторон
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError('Field is required');
        }
    }

    return <div style={{display: 'flex', alignItems: 'center'}}>
        {/* <input value={newTaskTitle} 
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
                className={error ? 'error' : ''}
        /> */}
        <TextField value={newTaskTitle} 
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
                variant={'filled'}
                label={'Enter your value'}
                error={!!error}
                helperText={error}
        />
        {/* <button onClick={addTask}>+</button> */}
        {/* {error && <div className='error-message'>{error}</div>} */}
        <IconButton onClick={addTask} color="success" size="large">
            <Add fontSize="inherit" />
        </IconButton>
    </div>
}
