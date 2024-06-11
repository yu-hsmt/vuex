<template>
    <h1>Todo App</h1>

	<form @submit.prevent="addTodo()"><!-- ボタンを押したら「addTodo()」を実行 -->
		<label>New ToDo</label>
		<input
			v-model="newTodo"
			name="newTodo"
			autocomplete="off"
		>
		<button>Add ToDo</button>
	</form>

	<h2>Todo List</h2>
	<ul>
		<li
			v-for="(todo, index) in todos"
			:key="index"
		><!-- indexを引数として配列「todos」を反復処理 -->
			<span
				:class="{ done: todo.done }"
				@click="doneTodo(index)"
			><!-- todo.doneがtrueだったら「done」というclassをつける/クリックしたらindexを引数として「doneTodo()」を実行 -->
				{{ todo.content }} <!-- todo.contentを表示 -->
			</span>
			<button @click="removeTodo(index)">Remove</button><!-- クリックでindexを引数として「removeTodo()」を実行 -->
		</li>
	</ul>

	<h4 v-if="todos.length === 0">Empty list.</h4> <!-- 配列todosの数が0の場合、このh4タグを表示 -->
</template>

<script setup>
	import { computed, ref } from 'vue' //ref関数とcomputed関数をインポートして使えるようにする
	import { useStore } from 'vuex' //useStoreをインポートして使えるようにする
	
	const store = useStore() //「store」を「useStore()」とする
	const newTodo = ref('') //newTodoを空のrefとする
	const todos = computed(() => store.getters.todos) //配列todosをリアクティブに取得して「todos」とする

	const addTodo = () => { //以下を「addTodo」とする
		if (newTodo.value.trim() === '') return //newTodoの両端からスペースを取り除いたものが空だった場合、何もしない
		store.dispatch('addTodo', newTodo.value) //それ以外の場合（newTodoに値が入っている場合）、newTodoの値に対して「addTodo」を実行
		newTodo.value = '' //newTodoの値を空にする
	}

	const removeTodo = (index) => { //indexを引数として、以下を「removeTodo」とする
		store.dispatch('removeTodo', index) //indexに対して「removeTodo」を実行
	}

	const doneTodo = (todo) => { //todoを引数として、以下を「doneTodo」とする
		store.dispatch('doneTodo', todo) //todoに対して「doneTodo」を実行
	}
</script>

<style lang="scss">
$border: 2px solid
	rgba(
		$color: white,
		$alpha: 0.35,
	);
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #27292d;
$textColor: white;
$primaryColor: #a0a4d9;
$secondTextColor: #1f2023;
body {
	margin: 0;
	padding: 0;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: $backgroundColor;
	color: $textColor;
	#app {
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		padding: 20px;
		h1 {
			font-weight: bold;
			font-size: 28px;
			text-align: center;
		}
		form {
			display: flex;
			flex-direction: column;
			width: 100%;
			label {
				font-size: 14px;
				font-weight: bold;
			}
			input,
			button {
				height: $size5;
				box-shadow: none;
				outline: none;
				padding-left: $size2;
				padding-right: $size2;
				border-radius: $size1;
				font-size: 18px;
				margin-top: $size1;
				margin-bottom: $size2;
			}
			input {
				background-color: transparent;
				border: $border;
				color: inherit;
			}
		}
		button {
			cursor: pointer;
			background-color: $primaryColor;
			border: 1px solid $primaryColor;
			color: $secondTextColor;
			font-weight: bold;
			outline: none;
			border-radius: $size1;
		}
		h2 {
			font-size: 22px;
			border-bottom: $border;
			padding-bottom: $size1;
		}
		ul {
			padding: 10px;
			li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border: $border;
				padding: $size2 $size4;
				border-radius: $size1;
				margin-bottom: $size2;
				span {
					cursor: pointer;
				}
				.done {
					text-decoration: line-through;
				}
				button {
					font-size: $size2;
					padding: $size1;
				}
			}
		}
		h4 {
			text-align: center;
			opacity: 0.5;
			margin: 0;
		}
	}
}
</style>