interface CardDetail {
    id?: number,
    tag: string, 
    task: string, 
    status: string,
    subTask: Array<SubTask>, 
    description: string, 
    date: string
}

interface SubTask {
    id?: number,
    task: string,
    done: boolean
}

interface HomeProps {
    history: any
}

interface Status {
    name: string, title: string, class: string
}

interface TodoCardProps extends CardDetail {
    currentTask: string,
    deleteTask: Function,
    changeSubTask: Function
};

interface SimplePopup {
    id: number,
    deleteTask: Function,
}

interface StatusContainerProps {
    title: string,
    name: string,
    class: string,
    cardDetails: Array<CardDetail>
    deleteTask: Function,
    changeSubTask: Function
}