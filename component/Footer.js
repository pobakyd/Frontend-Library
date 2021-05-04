import html from '../scripts/core.js'
import {connect} from '../scripts/store.js'

const connector = connect()

function Footer({todos, filter, filters}){
    return html`
        <footer class="footer">
            <span class="todo-count"><strong>${todos.filter(filters.active).length}</strong> item left</span>
            <ul class="filters">
                ${Object.keys(filters).map((type) => {
                    return html`
                        <li style = "cursor: pointer">
                            <a class = ${filter === type && 'selected'} href="#" onclick = "dispatch('filter', '${type}')">${type[0].toUpperCase() + type.slice(1)}</a>
                        </li>
                    `
                })}
            </ul>
            <button 
                class="clear-completed" 
                style = "display: ${todos.every(filters.active) && 'none'}"
                onclick = "dispatch('clearComplete')"
            >Clear completed</button>
        </footer>
    `
}

export default connector(Footer)