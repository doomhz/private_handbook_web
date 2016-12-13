import React from 'react';
import {Link} from 'react-router';
import {
  Row, Col, Checkbox
} from '@sketchpixy/rubix';
import TodoStorage from '../helpers/TodoStorage'

export default class TodosList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      type: props.params.type
    }
  }
  componentWillReceiveProps(nextProps){
    this.loadActiveTodos()
  }
  componentDidMount() {
    this.loadActiveTodos()
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
  renderTodos(){
    let todos = this.state.todos.filter((t)=> t.type === this.state.type)
    if (todos.length)
      return (
        <ul className="todos-list">
          {todos.map((t, i)=> {
            return (
              <li key={i}>
                <Checkbox checked={t.status !== "active"} readOnly>
                  {t.title}
                </Checkbox>
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
        <h1>{this.state.type.toUpperCase()}</h1>
        {this.renderTodos()}
      </div>
    );
  }
}
