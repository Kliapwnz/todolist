import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
   title: string
   onClick: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
   let [title, setTitle] = useState(props.title)
   const [edit, setEdit] = useState(false)
   const editHandler = () => {
      setEdit(!edit)
      if (edit) {
         addTask()
      }


   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }
   const addTask = () => {
      props.onClick(title)
   }

   return (
      edit
         ? <input value={title} onChange={onChangeHandler} onBlur={editHandler} autoFocus/>
         : <span onDoubleClick={editHandler}>{props.title}</span>
   );
};

