
//1、先创建ui组件
class Counter extends Component{
    render(){
        const {value, onInClick} = this.props
        return(
            <div>
                <span>{value}</span>
                <button onClick={onInClick}>增加</button>
            </div>
        )
    }
}

//2、定义value到state的映射
function mapStateToProps(state){
    return {
        value: state.count
    }
}
const increaseAction = { type: 'increase' }
function mapDispatchToProps(dispatch){
    return{
        onInClick: ()=>{
            dispatch(increaseAction)
        }
    }
}

//3、利用connect生成容器组件
const App = connect(mapStateToProps, mapDispatchToProps)(Counter)

//4、定义这个组件的Reducer
let defaultState = {count: 0}
function counter(state = defaultState, action){
    const count = state.count
    switch (action.type){
        case 'increase':
            return {count: count + 1}
        default: 
            return state
    }
} 

//5、最后，生成store对象，并使用Provider在跟组件外面包一层
import {loadState, saveState} from './localStorage'

const persistedState = loadState();
const store = createStore(
    todoApp,
    persistedState
)
store.subscribe()

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
