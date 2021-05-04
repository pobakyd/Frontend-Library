import {attach} from './store.js'
import processComponent from '../component/App.js'

attach(processComponent, document.getElementById('root'))
