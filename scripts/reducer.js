import storage from './storage.js'

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: (todo) => !todo.completed,
        completed: (todo) => todo.completed
    },
    indexUpdate: null
}

const actions = {
    add(state, content){
        if (content){
            const todo = {
                content,
                completed: false
            }
            state.todos.push(todo)
            storage.set(state.todos)
        }
    },
    
    toggle(state, index){
        state.todos[index].completed = !state.todos[index].completed
        storage.set(state.todos)
    },

    toggleAll(state, checked){
        state.todos.forEach(todo => todo.completed = checked)
        storage.set(state.todos)
    },

    delete(state, index){
        state.todos.splice(index, 1)
        storage.set(state.todos)
    },

    filter(state, type){
        state.filter = type
        storage.set(state.todos)
    },

    clearCompleted(state){
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },

    edit(state, index){
        state.indexUpdate = index 
    },

    update(state, content){
        if(state.indexUpdate !== null){
            if(!content){
                this.delete(state, state.indexUpdate)
            }
            else{
                state.todos[state.indexUpdate].content = content
                storage.set(state.todos)
            }
            state.indexUpdate = null
        }
    },

    exitEdit(state){
        state.indexUpdate = null
    }
}

export default function reducer(state = init, action, args){
    actions[action] && actions[action](state, ...args)
    return state
}