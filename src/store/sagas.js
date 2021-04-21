import { takeEvery, put, all, call, select/*, delay*/ } from "redux-saga/effects"

function apiGet(text, todos){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const random = Math.floor(Math.random() * 2) + 1
            if(random === 1)
                resolve(text + " e beber: " + (todos.length + 1));
            else if(random === 2)
                reject("Erro ao adicionar todo número: " + (todos.length + 1));
        }, 1500)
    })
}

function* asyncAddTodo(action){
    try{
        // Use redux saga select function to get state on a saga middleware
        const todos = yield select((state) => state.todos);

        // if you want to use timeOut just use: yield delay(1500);
        const text = yield call(apiGet, action.payload.text, todos);

        yield put({type: "ADD_TODO", payload: {text}});
    }catch(err){
        // when the API returns an error it cames here
        console.log(err)
    }
}

export default function* root(){
    yield all([
        takeEvery("ASYNC_ADD_TODO", asyncAddTodo)
    ])
}