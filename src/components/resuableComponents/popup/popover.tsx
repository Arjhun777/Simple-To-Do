import React from 'react';
import Popover from '@material-ui/core/Popover';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Divider } from '@material-ui/core';
import history from '../../../utils/history';
import { deleteTask } from '../../../utils/helper';
import '../../../assets/style/popup.scss';

export default function SimplePopover(props:SimplePopup) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        history.push(`/edit-task/${props.id}`);
    }

    const handleDeleteClick = () => {
        props.deleteTask(props.id);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <span aria-describedby={id} onClick={handleClick}>
                <MoreVertIcon></MoreVertIcon>
            </span>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
            {/* <Typography className={classes.typography}>The content of the Popover.</Typography> */}
            <div className="card-action-wrapper">
                <div className="edit-card card-action" onClick={handleEditClick}>
                    <EditIcon></EditIcon>
                    <span className="action-text">Edit</span>
                </div>
                <Divider></Divider>
                <div className="delete-card card-action" onClick={handleDeleteClick}>
                    <DeleteOutlineIcon></DeleteOutlineIcon>
                    <span className="action-text">Delete</span>
                </div>
            </div>
            </Popover>
        </div>
    );
}
