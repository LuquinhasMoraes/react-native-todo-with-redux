export const addTodo = (task) => ({
    
        type: 'ADD_TODO',
        payload: task
    
})

export const remove = (task) => ({
    
    type: 'REMOVE',
    payload: task

})

export const completeTodo = (task) => ({
    type: 'DONE',
    payload: task
})