import React from 'react';
import TodoCard from '../todoCard/todoCard';
import '../../../assets/style/statusContainer.scss';

function StatusContainer(props:StatusContainerProps) {

    return (
        <React.Fragment>
            <div className={`status-container ${props.class}`}>
                <h3 className="status-title">
                    {props.title}
                </h3>
                <div className="status-card-wrapper">
                    {
                        props.cardDetails?.length
                        ?   props.cardDetails.map((cardDetail:CardDetail) => (
                                <TodoCard {...cardDetail} currentTask={props.name} deleteTask={props.deleteTask} changeSubTask={props.changeSubTask}/>
                            ))
                        :   `No ${props.title} Task Yet`
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default StatusContainer;