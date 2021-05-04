import html from '../scripts/core.js'
import Header from './Header.js'
import TodoList from './TodoList.js'
import Footer from './Footer.js'
import {connect} from '../scripts/store.js'

const connector = connect()

function App({todos, filters}){
    return html`
        <section class="todoapp">
            ${Header()}
            ${todos.length > 0 && TodoList()}
            ${todos.length > 0 && Footer()}
        </section>
    `
}

export default connector(App)