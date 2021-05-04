import html from '../scripts/core.js'

function TodoItem({content, completed}, index, indexUpdate){
    return html`
        <li class = ${completed && "completed"} ${index === indexUpdate && 'editing'}>
            <div class="view">
                <input 
                class="toggle" 
                type="checkbox" 
                ${completed && "checked"}
                onchange = "dispatch('toggle', ${index})"
                >
                <label ondblclick = "dispatch('edit', ${index})">
                    ${content}
                </label>
                <button class="destroy" onclick = "dispatch('delete', ${index})"></button>
            </div>
            <input 
                class="edit" 
                value="${content}"
                onkeyup = "event.keyCode === 13 && dispatch('update', this.value.trim()) || event.keyCode === 27 && dispatch('exitEdit')"
                onblur = "dispatch('update', this.value.trim())"
            >
        </li>
    `
}

export default TodoItem