import React from 'react';
import {browserHistory} from 'react-router';
import {
  TYPE_TITLES
} from '../constants'
import {
  Checkbox, Form, FormGroup, FormControl,
  Button, Icon
} from '@sketchpixy/rubix';
import TodoStorage from '../helpers/TodoStorage'

export default class TodosList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      type: props.params.type,
      addTodoValue: ""
    }
  }
  componentDidMount() {
    this.updateTodos()
  }
  loadActiveTodos(){
    return TodoStorage.getTodosByType(this.state.type)
    .then((todos)=> {
      this.setState({
        todos: todos
      })
      return todos
    })
  }
  updateTodos(){
    return TodoStorage.getTodosByType(this.state.type)
    .then((todos)=> {
      this.setState({
        todos: todos
      })
      return todos
    })
  }
  toggleTodo(todo){
    todo.status = todo.status === "active" ? "completed" : "active"
    TodoStorage.updateTodo(todo)
    .then(()=> {
      this.updateTodos()
    })
  }
  addTodo(todo = {}){
    if (!todo.title) todo.title = this.state.addTodoValue
    if (!todo.title) return
    todo.type = this.state.type
    TodoStorage.addTodo(todo)
    .then(()=> {
      this.updateTodos()
      this.setState({addTodoValue: ""})
    })
  }
  deleteTodo(todo){
    TodoStorage.deleteTodo(todo)
    .then(()=> {
      this.updateTodos()
    })
  }
  handleTodoSubmit(ev){
    ev.preventDefault()
    this.addTodo()
  }
  renderTodos(){
    let todos = this.state.todos.filter((t)=> t.type === this.state.type)
    if (todos.length)
      return (
        <ul className="todos-list">
          {todos.map((todo, i)=> {
            return (
              <li key={i} className={`todo-item todo-item-${todo.status}`}>
                <Checkbox
                  checked={todo.status !== "active"}
                  readOnly
                  onChange={()=> this.toggleTodo(todo)}
                >
                  {todo.title}
                </Checkbox>
                <Button

                  bsStyle="link"
                  onlyOnHover
                  onClick={()=> this.deleteTodo(todo)}
                >
                  <Icon glyph='icon-fontello-trash-empty'/>
                </Button>
              </li>
            )
          })}
        </ul>
      )
    return null
  }
  render() {
    return (
      <div className='todos'>
        <h1>
          {TYPE_TITLES[this.state.type]} ({this.state.type.toUpperCase()})
          <Button bsStyle="link" onClick={()=> browserHistory.push(`info/${this.state.type}`)}>
            <Icon glyph='icon-fontello-info'/>
          </Button>
          <Button bsStyle="link" onClick={browserHistory.goBack}>
            <Icon glyph='icon-fontello-back'/>
          </Button>
        </h1>
        {this.renderTodos()}
        <Form inline onSubmit={(ev)=> this.handleTodoSubmit(ev)}>
          <FormGroup controlId="formInlineName">
            <FormControl
              type="text"
              value={this.state.addTodoValue}
              placeholder="New todo"
              onChange={(event) => this.setState({
                addTodoValue: event.target.value
              })}
            />
          </FormGroup>
          <Button type="submit">
            Add
          </Button>
        </Form>
      </div>
    );
  }
}
