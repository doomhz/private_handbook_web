import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import {
  TYPE_TITLES, TODO_STATUS_ACTIVE, TODO_STATUS_COMPLETED
} from '../constants'
import {
  Checkbox, Form, FormGroup, FormControl,
  Button, Icon
} from '@sketchpixy/rubix';
import {loadTodos, addTodo, deleteTodo, updateTodo} from '../store/todos/actions'
import {getTodosByType} from '../store/todos/selectors'

class TodosList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: props.params.type,
      addTodoValue: ""
    }
  }
  componentDidMount() {
    this.props.dispatch(loadTodos({sync: true}))
  }
  toggleTodo(todo){
    const newStatus = todo.status === TODO_STATUS_ACTIVE ? TODO_STATUS_COMPLETED : TODO_STATUS_ACTIVE
    const newTodo = Object.assign({}, todo, {status: newStatus})
    this.props.dispatch(updateTodo(newTodo, {sync: true}))
  }
  addTodo(todo = {}){
    if (!todo.title) todo.title = this.state.addTodoValue
    if (!todo.title) return
    todo.type = this.state.type
    this.props.dispatch(addTodo(todo, {sync: true}))
    this.setState({addTodoValue: ""})
  }
  deleteTodo(todo){
    this.props.dispatch(deleteTodo(todo, {sync: true}))
  }
  handleTodoSubmit(ev){
    ev.preventDefault()
    this.addTodo()
  }
  renderTodos(){
    if (this.props.todos.length)
      return (
        <ul className="todos-list">
          {this.props.todos.map((todo, i)=> {
            return (
              <li key={i} className={`todo-item todo-item-${todo.status}`}>
                <Checkbox
                  checked={todo.status !== TODO_STATUS_ACTIVE}
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

const mapStateToProps = (state, ownProps)=> ({
  todos: getTodosByType(state, ownProps.params.type),
  type: ownProps.params.type
})

export default connect(mapStateToProps)(TodosList);
