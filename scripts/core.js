export default function html([first,...strings], ...values){
    return values.reduce((acc,ele) => {
        return acc.concat(ele, strings.shift())
    }, [first])
    .filter(ele => (ele && ele !== true) || ele === 0 )
    .join('')
}

export function createStore(reducer){
    let state = reducer()
    const roots = new Map()
    function render(){
        for(const [root, processcomponent] of roots){
            const output = processcomponent()
            root.innerHTML = output
        }
    }
    return {
        attach(processcomponent, root){
            roots.set(root, processcomponent)
            render()
        },
        connect(selector = state => state){
            return component => (props,...args) => component(Object.assign({}, props, selector(state), args))
        },
        dispatch(action,...args){
            state = reducer(state, action, args)
            render()
        }
    }

}