import React from 'react';
import {Link} from 'react-router';
import {
  Row, Col
} from '@sketchpixy/rubix';
import {
  TYPE_DO, TYPE_DECIDE, TYPE_DELEGATE, TYPE_DELETE
} from '../constants'
import {
  syncUserTodos, getTodosByStatus
} from '../helpers/TodoStorage'
import TodoStorage from '../helpers/TodoStorage'

export default class TodosSummary extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
  }
  componentWillReceiveProps(nextProps){
    this.loadActiveTodos()
  }
  componentDidMount() {
    this.loadActiveTodos()
  }
  loadActiveTodos(){
    return getTodosByStatus("active")
    .then((todos)=> {
      this.setState({
        todos: todos
      })
      return todos
    })
  }
  renderActiveTodos(type){
    let todos = this.state.todos.filter((t)=> t.type === type)
    if (todos.length)
      return (
        <ul>
          {todos.map((t, i)=> {
            return (
              <li key={i}>
                <span>{t.title}</span>
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
        <Row>
          <Col sm={6}>
            <h2><Link to={`todos/${TYPE_DO}`}>DO</Link></h2>
            {this.renderActiveTodos(TYPE_DO)}
          </Col>
          <Col sm={6}>
            <h2><Link to={`todos/${TYPE_DECIDE}`}>DECIDE</Link></h2>
            {this.renderActiveTodos(TYPE_DECIDE)}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <h2><Link to={`todos/${TYPE_DELEGATE}`}>DELEGATE</Link></h2>
            {this.renderActiveTodos(TYPE_DELEGATE)}
          </Col>
          <Col sm={6}>
            <h2><Link to={`todos/${TYPE_DELETE}`}>DELETE</Link></h2>
            {this.renderActiveTodos(TYPE_DELETE)}
          </Col>
        </Row>
      </div>
    );
  }
}
