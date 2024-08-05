import { createContext, ReactNode, useContext, useState } from "react";
export type TodosProviderProps = {
    children: ReactNode
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddToDo: (task: string) => void; //call signature
    toggleToDoAsCompleted: (id: string) => void;
    handleDeleteToDo: (id: string) => void;
}



export const todosContext = createContext<TodosContext | null>(null);
export const TodosProvider = ({ children }: TodosProviderProps) => {

    //retrieving data from local strorage for initial , if no data present then we pass empty array, 
    // if data is present then we pase the json string stored in local storage to desired Todo Type
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[];
        } catch (error) {
            return []
        }
    });

    const handleAddToDo = (task: string) => {

        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            // console.log("My previous, ", prev);
            // console.log(newTodos);

            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    //mark completed

    const toggleToDoAsCompleted = (id: string) => {

        setTodos((prev) => {
            let newTodos = prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    //delete the individual data

    const handleDeleteToDo = (id: string) => {
        setTodos((prev) => {
            let newTodos = prev.filter((filterTodo) => filterTodo.id !== id)
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    return <todosContext.Provider value={{ todos, handleAddToDo, toggleToDoAsCompleted, handleDeleteToDo }}>
        {children}
    </todosContext.Provider>
}


//consumer

export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if (!todosConsumer) {
        throw new Error("useTodos used outside of Provider");
    }
    return todosConsumer;
}