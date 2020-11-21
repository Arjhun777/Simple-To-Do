import React from 'react';
import { toDisplayDateString } from '../../../utils/helper';
import { Checkbox, Divider } from '@material-ui/core';
import SimplePopover from '../popup/popover';
import '../../../assets/style/todoCard.scss';

function TodoCard(props:TodoCardProps) {

    const handleSubTaskChange = (event: React.ChangeEvent<HTMLInputElement>, subTask: number) => {
        props.changeSubTask(props.id, subTask, event.target.checked);
    }

    return (
        <React.Fragment>
            <div className="todo-card-container">
                <div className="todo-card-head">
                        <span className="todo-tag">{props.tag}</span>
                        <span className="todo-options">
                            <SimplePopover id={props.id} deleteTask={props.deleteTask}/>
                        </span>
                        <h4 className="todo-task">{props.task}</h4>
                        <p className="todo-date">{toDisplayDateString(props.date)}</p>
                </div>
                <p className="todo-description">{props.description}</p>
                <Divider></Divider>
                {
                    props.subTask?.map((subTask, index) => (
                        <>
                            {index !== 0 && <Divider></Divider>}
                            <div className="todo-subtask-wrapper">
                                <Checkbox className="todo-checkbox" checked={subTask.done} onChange={(e) => handleSubTaskChange(e, subTask.id)}></Checkbox>
                                <p className="todo-subtask-text">{subTask.task}</p>
                            </div>
                        </>
                    ))
                }
            </div>
        </React.Fragment>
    )
}

export default TodoCard;