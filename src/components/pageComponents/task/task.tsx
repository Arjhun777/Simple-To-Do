import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button, Checkbox, Divider, FormControlLabel } from '@material-ui/core';
import { findAndSetTask, getID, getMinDate, getPathID, getTask, getTaskOfId, setTask, setTaskItem } from '../../../utils/helper';
// Icons Imports
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
// Style Imports
import '../../../assets/style/task.scss';
import history from '../../../utils/history';

const STATUS_CONV:any = {
    'To-Do': 'todo',
    'In-Progress': 'inProgress',
    'Done': 'done'
}

function Task() {
    const [taskDetails, setTaskDetails] = useState<CardDetail>({
        task: '',
        description: '',
        status: '',
        tag: '',
        date: new Date().toDateString(),
        subTask: [{
            id: getID(),
            task: '',
            done: false
        }]
    });

    const checkIsEdit = () => {
        const pathID = getPathID();
        if (pathID !== null && pathID >= 0) return true;
        return false;
    }
    
    const [isEdit, setIsEdit] = useState(checkIsEdit());

    useEffect(() => {
        if (isEdit) {
            const pathID = getPathID();
            const task = getTaskOfId(pathID);
            setTaskDetails(task);
        }
    }, []);

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = event.target;
        setTaskDetails({
            ...taskDetails,
            [name]: value
        });
    }

    const handleStatusChange = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        // @ts-ignore
        let { name, value } = event.target;
        if (name === 'status') value = STATUS_CONV[value];
        setTaskDetails({
            ...taskDetails,
            [name]: value
        });
    }

    const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        setTaskDetails({
            ...taskDetails,
            tag: name
        });
    }

    const onSubTaskStatusChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value, name, checked } = event.target;
        // @ts-ignore
        taskDetails.subTask[index][name] = name === 'done' ? checked : value;
        setTaskDetails({
            ...taskDetails
        });
    }

    const insertNewSubTask = () => {
        const subTask:SubTask = { done: false, task: '' }
        if (!isEdit) subTask['id'] = getID();
        taskDetails.subTask.push(subTask);
        setTaskDetails({
            ...taskDetails
        });
    }

    const deleteSubTask = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index:number) => {
        taskDetails.subTask.splice(index, 1);
        setTaskDetails({
            ...taskDetails
        });
    } 

    const handleBack = () => {
        history.push('/home');
    }

    const checkValidation = () => {
        if (!taskDetails.task.length || !taskDetails.status.length || !taskDetails.tag.length) return false;
        return true;
    }

    const handleSubmit = () => {
        if (checkValidation()) {
            const pathID = getPathID();
            if (!isEdit) {
                taskDetails['id'] = getID();
                setTaskItem(taskDetails);
            } else {
                findAndSetTask(pathID, taskDetails);
            }
            history.push('/home');
        }
    }

    return (
        <React.Fragment>
            <div className="task-container">
                <div className="task-headbar">
                    <span onClick={handleBack}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </span>
                    <span className="task-head-text">{isEdit ? 'Edit Task' : 'Create Task'}</span>
                </div>
                <Divider></Divider>
                <div className="flex-task-container">
                    <div className="task-input-wrapper">
                        <div className="task-name-wrapper task-wrapper">
                            <label htmlFor="task" className="task-name-label task-label">Enter Task Name</label>
                            <input className="task-name-text" placeholder="Task Name" type="text" name="task" onChange={handleTaskChange} value={taskDetails.task}></input>
                        </div>
                        <div className="task-description-wrapper task-wrapper">
                            <label htmlFor="description" className="task-description-label task-label">Enter Task Name</label>
                            <textarea className="task-description-text" placeholder="Description" name="description" onChange={handleTaskChange} value={taskDetails.description}></textarea>
                        </div>
                        <div className="task-branch task-wrapper">
                            <label htmlFor="status" className="task-branch-label task-label">Branch to</label>
                            <div className="task-status-wrapper">
                                <input className={`task-todo ${taskDetails.status === 'todo' ? 'active' : ''}`} type="button" name="status" value="To-Do" onClick={handleStatusChange}/>
                                <input className={`task-in-progress ${taskDetails.status === 'inProgress' ? 'active' : ''}`} type="button" name="status" value="In-Progress" onClick={handleStatusChange}/>
                                <input className={`task-done ${taskDetails.status === 'done' ? 'active' : ''}`} type="button" name="status" value="Done" onClick={handleStatusChange}/>
                            </div>
                        </div>
                        <div className="task-tag-wrapper task-wrapper">
                            <label htmlFor="task-tag" className="task-label">Select Tag</label>
                            <div className="task-tag-input-wrapper">
                                <Tag onChange={handleTagChange} checked={taskDetails.tag === 'personal'} label={'Personal'} name="personal" />
                                <Tag onChange={handleTagChange} checked={taskDetails.tag === 'official'} label={'Official'} name="official" />
                                <Tag onChange={handleTagChange} checked={taskDetails.tag === 'miscellaneous'} label={'Miscellaneous'} name="miscellaneous" />
                            </div>
                        </div>
                        <div className="task-date-select-wrapper task-wrapper">
                            <label htmlFor="date" className="task-label">Select Date</label>
                            <input className="task-date-select" name="date" type="date" min={getMinDate()} onChange={handleTaskChange} value={taskDetails.date}/>
                        </div>
                        <div className="action-wrapper">
                            <Button className="cancel-btn" onClick={handleBack}>Cancel</Button>
                            <Button className="create-btn" onClick={handleSubmit}>{isEdit ? 'Edit' : 'Create'}</Button>
                        </div>
                    </div>
                    <div className="sub-task-container task-wrapper">
                        <label htmlFor="sub-task" className="task-label">Sub-Tasks</label>
                        {
                            taskDetails.subTask?.map((subtask, index) => (        
                                <div>
                                    <div className="sub-task-wrapper">
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" color="inherit" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" color="inherit" />}
                                            checked={subtask.done}
                                            onChange={(e) => onSubTaskStatusChange(e, index)}
                                            name='done'
                                            color="primary"
                                        />
                                        <input className="sub-task-name-text" placeholder="Sub Task" type="text" name="task" value={subtask.task} onChange={(e) => onSubTaskStatusChange(e, index)}/>
                                        <span className="delete-subtask" onClick={(e) => deleteSubTask(e, index)}>
                                            <DeleteOutlineIcon></DeleteOutlineIcon>
                                        </span>
                                    </div>
                                    <Divider></Divider>
                                </div>
                            ))
                        }
                        <div className="new-sub-task-wrapper" onClick={insertNewSubTask}>
                            <span>
                                <AddIcon></AddIcon>
                            </span>
                            <span className="new-sub-task-text">New Sub Task</span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Task;

const Tag = (props:any) => {
    return (
        <React.Fragment>
            <FormControlLabel
                control={
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" color="inherit" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" color="inherit" />}
                    checked={props.checked}
                    onChange={props.onChange}
                    name={props.name}
                    color="primary"
                />
                }
                label={props.label}
            />
        </React.Fragment>
    )
}