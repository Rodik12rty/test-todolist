import {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';




type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);

    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        // ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus label={'Edit your value'} variant={'standard'} />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}
