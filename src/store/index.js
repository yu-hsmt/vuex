import { createStore } from 'vuex';
import todos from './todos';

export default createStore({ //「todos」モジュールを含むストアを作成する
    modules: {
        todos,
    }
})