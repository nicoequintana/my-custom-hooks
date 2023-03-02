import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"

const init = () => {
    //como toda funcion, por si sola no devuelve nada, debemos RETORNAR algo, entonces usamos RETURN para traer del local storage el string que pasamos antes, lo parseamos con JSON.parse() y le pasamos como argumento la KEY con la que guardamos en el useEffect. Pero si el local esta vacio, nos va a arroja null, y eso va a dar error, entonces con el operador logico '||' decimos "si el localStorage tiene algo, traelo y parsealo, si no tiene nada, trae un array vacio". Si no hacemos eso, la consola va a arroja error y va a decir que no se puede leer las propiedades de un NULL
        return JSON.parse( localStorage.getItem('todos')) || []
}


export const useTodo = () => {


    const [ todos, dispatchTodoAction ] = useReducer( todoReducer, [], init )



    //el useEffect se va a disparar cada vez que se cargue el componente o cada vez que cambie el estado 'todos' (porque pusimos el estado todos en el array de dependencia del hook). Entonces, cada vez que es pase, la informacion que yo guarde en el localStorage, se va a reescribir y va a desaparecer lo que yo guarde anteriormente, por eso hay que usar la funcion inicializadora del useReducer para decir 'lo que tenia antes, traelo y guardalo en el estado inicial, no lo pierdas'
    
    useEffect(() => {
    //localStorage.setItem() recibe dos argumentos, una KEY y un VALUE, la KEY es un string, y el value es la informacion que quiera guardar, pero debo pasarla a string, por eso a ese segundo argumento le hacemos un JSON.stringify() y le pasamos como argumento el objeto o arreglo que queremos guardar.
        localStorage.setItem( 'todos', JSON.stringify( todos ) )
    }, [todos])
        

    const handleNewTodo = ( todo ) => {

        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }
        dispatchTodoAction( action )
    }

    const deleteTodo = ( id ) => {

        const action = {
            type: '[TODO] Delete Todo',
            payload: id,

        }
        dispatchTodoAction( action )
    }

    const onHandleTodo = ( id ) => {

        const action = {
            type: '[TODO] Handle Todo',
            payload: id,
        }
        dispatchTodoAction( action )
    }

    const pendingsTodo = todos.filter( todo => todo.done !== true).length;
    const allTodos = todos.length

  return {
    ...todos,
    todos,
    handleNewTodo,
    deleteTodo,
    onHandleTodo,
    pendingsTodo, 
    allTodos

  }
}
