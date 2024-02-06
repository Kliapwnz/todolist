import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    let addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let onEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    return (
        <div>
            <TextField
                size='small'
                variant='outlined'
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onEnterHandler}
                error={!!error}
                label='Title'
                helperText={error}
            />

            <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                    variant='contained' color='primary' onClick={addTaskHandler}>+</Button>
        </div>
    );
};

