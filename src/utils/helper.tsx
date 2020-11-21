const MONTH_IN_LETTERS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const STATUS_CONV:any = {
    'todo': 'To-Do',
    'inProgress': 'In-Progress',
    'done': 'Done'
}

export const getOrSetToken = (token?:string) => {
    if (token?.length) localStorage.setItem('token', token);
    else return localStorage.getItem('token');
}

export const emailValidator = (email:string) => {
    return RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);
}

export const toDisplayDateString = (date:string) => {
    if (date) {
        const dateDetails = getDateObjects(date);
        return dateDetails.monthInLetter.substr(0, 3) + ' ' + dateDetails.date;
    }
}

export const getMinDate = () => {
    const dateObj = getDateObjects(new Date().toDateString());
    return dateObj.year + '-' + dateObj.month + '-' + dateObj.date;
}

const getDateObjects = (date:string) => {
    if (date) {
        const dateObj = new Date(date);
        return {
            date: dateObj.getDate(),
            month: dateObj.getMonth() + 1,
            monthInLetter: MONTH_IN_LETTERS[dateObj.getMonth()],
            year: dateObj.getFullYear(),
            hour: dateObj.getHours(),
            minutes: dateObj.getMinutes()
        }
    }
}

const getURL = () => {
    return window.location.pathname;
}

export const getPathID = () => {
    const URL = getURL();
    const splitURL = URL.split('/');
    if (hasNumber(splitURL[splitURL.length - 1])) {
        return parseInt(splitURL[splitURL.length - 1]);
    }
    return null;
}

const hasNumber = (myString:string) => {
    return /\d/.test(myString);
}

export const getTask = () => JSON.parse(localStorage.getItem('task'));

export const setTask = (task:object) => {
    localStorage.setItem('task', JSON.stringify(task));
}

export const getID = () => {
    return parseInt((Math.random() * 1000).toFixed(0));
}

export const getTaskOfId = (id:number) => {
    const task = getTask();
    const taskWithId = task.find((data:CardDetail) => { 
        if (data.id === id) return true;
    });
    return taskWithId;
}

const getTaskIndex = (id:number, task:any) => {
    let taskIndex = null;
    for (let index = 0; index < task.length; index++) {
        const element = task[index];
        if (element.id === id) taskIndex = index;
    }
    return taskIndex;
}

export const findAndSetTask = (id:number, editedTask:CardDetail) => {
    const task:Array<CardDetail> = getTask();
    const index = getTaskIndex(id, task);
    task[index] = editedTask;
    setTask(task);
}

export const setTaskItem = (task:CardDetail) => {
    const allTask:Array<CardDetail> = getTask() || [];
    allTask.push(task);
    setTask(allTask);
}

export const getTaskByStatus = () => {
    // This will be handled at backend
    const allTask:Array<CardDetail> = getTask() || [];
    const returnObj:any = {
        todo: [], inProgress: [], done: []
    };
    for (let index = 0; index < allTask.length; index++) {
        const element = allTask[index];
        returnObj[element.status].push(element);
    }
    return returnObj;
}

export const deleteTask = (id:number) => {
    const task:Array<CardDetail> = getTask();
    const index = getTaskIndex(id, task);
    task.splice(index, 1);
    setTask(task);
}

export const subTaskStatusChange = (taskId: number, subTaskID: number, checked: boolean) => {
    const task:Array<CardDetail> = getTask();
    const index = getTaskIndex(taskId, task);
    const subTaskIndex = getTaskIndex(subTaskID, task[index].subTask);
    task[index].subTask[subTaskIndex].done = checked;
    setTask(task);
}