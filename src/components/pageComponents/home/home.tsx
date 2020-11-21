import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { deleteTask, getTask, getTaskByStatus, subTaskStatusChange } from "../../../utils/helper";
import history from "../../../utils/history";
import StatusContainer from "../../resuableComponents/statusContainer/statusContainer";

const STATUS:Array<Status> = [
    { name: 'todo', title: 'To-Do', class: 'todo' },
    { name: 'inProgress', title: 'In-Progress', class: 'in-progress' },
    { name: 'done', title: 'Done', class: 'done' }
];

function Home(props:HomeProps) {
    const [todoCards, setTodoCards] = useState<any>(getTaskByStatus());

    const onNewTask = () => {
        history.push('/new-task');
    }

    const refetch = () => {
        setTodoCards(getTaskByStatus());
    }

    const deleteTaskFromList = (id:number) => {
        deleteTask(id);
        refetch();
    }

    const changeSubTask = (id: number, subTask: number, checked: boolean) => {
        subTaskStatusChange(id, subTask, checked);
        refetch();
    }
    
    return (
        <React.Fragment>
            <div className="main-container">
                <div className="new-task-btn">
                    <Button onClick={onNewTask}>New Task</Button>
                </div>
                <div className="status-wrapper">
                    {
                        STATUS.map((status) => (
                            <>
                                <StatusContainer {...status} cardDetails={todoCards[status.name]} deleteTask={deleteTaskFromList} changeSubTask={changeSubTask}/>
                            </>
                        ))
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;