export default {
    state: { //モジュールの状態定義
        todos: [], //「todos」という配列を定義
    },
    mutations: { //状態を変更するメソッドを定義
        addTodo: (state, todo) => { //stateモジュールとtodoを引数として、以下をaddTodoとする
            state.todos.push({ //配列todosに以下（done: false、content: todo）を追加
                done: false,
                content: todo
            })
        },
        removeTodo: (state, index) => { //stateモジュールとindexを引数として、以下をremoveTodoとする
            state.todos.splice(index, 1) //配列todosの最後の1件を削除
        },
        doneTodo: (state, index) => { //stateモジュールとindexを引数として、以下をdoneTodoとする
            state.todos[index].done = !state.todos[index].done //対象のオブジェクトのdoneプロパティを逆転させる（trueならfalseに、falseならtrueに）
        },
    },
    actions: { //mutationsを実行するための操作定義（store.dispatchで実行）
        addTodo: ({ commit }, todo) => {
            commit('addTodo', todo); //addTodoを実行　なぜこれがいる？mutationsを直接実行してはだめな理由は？
        },
        removeTodo: ({ commit }, index) => {
            commit('removeTodo', index); //removeTodoを実行
        },
        doneTodo: ({ commit }, index) => {
            commit('doneTodo', index) //doneTodoを実行
        },
    },
    getters: { //stateから派生した値を取得
        todos: state => state.todos, //現在のtodosの状態を取得
    },
}