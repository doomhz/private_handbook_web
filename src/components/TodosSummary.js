import React from 'react';
import {Link, browserHistory} from 'react-router';
import {
  Row, Col, Modal, Button, Form,
  FormGroup, FormControl, Icon
} from '@sketchpixy/rubix';
import {
  TYPE_DO, TYPE_DECIDE, TYPE_DELEGATE, TYPE_DELETE
} from '../constants'
import {
  getTodosByStatus
} from '../helpers/TodoStorage'
import TodoStorage from '../helpers/TodoStorage'

export default class TodosSummary extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      showQuickAdd: false,
      quickAddType: null,
      addTodoValue: ""
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
  toggleQuickAdd(type){
    this.setState({
      showQuickAdd: !this.state.showQuickAdd,
      quickAddType: type
    })
  }
  addTodo(todo = {}){
    if (!todo.title) todo.title = this.state.addTodoValue
    todo.type = this.state.quickAddType
    return TodoStorage.addTodo(todo)
    .then(()=> {
      this.loadActiveTodos()
      this.setState({
        quickAddType: "",
        addTodoValue: ""
      })
    })
  }
  handleQuickAdd(){
    if (!this.state.addTodoValue) return
    this.addTodo()
    .then(()=> this.toggleQuickAdd())
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
  renderQuickAdd(){
    return (
      <Modal show={this.state.showQuickAdd} onHide={()=> this.toggleQuickAdd()}>
        <Modal.Header closeButton>
          <Modal.Title>Add task to {this.state.quickAddType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(ev)=> ev.preventDefault() || this.handleQuickAdd()}>
            <FormGroup>
              <FormControl
                type="text"
                value={this.state.addTodoValue}
                placeholder="New todo"
                onChange={(event) => this.setState({
                  addTodoValue: event.target.value
                })}
              />
            </FormGroup>
            <Button type="submit" className="hidden">Add</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='primary' onClick={()=> this.handleQuickAdd()}>Add</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  render() {
    return (
      <div className='todos'>
        <Row>
          <Col sm={6}>
            <h2>
              <Link to={`todos/${TYPE_DO}`}>DO</Link>
              <Button bsStyle="link" onClick={()=> this.toggleQuickAdd(TYPE_DO)}>
                <Icon glyph='icon-fontello-plus-circled'/>
              </Button>
              <Button bsStyle="link" onClick={()=> browserHistory.push(`info/${TYPE_DO}`)}>
                <Icon glyph='icon-fontello-info'/>
              </Button>
            </h2>
            {this.renderActiveTodos(TYPE_DO)}
          </Col>
          <Col sm={6}>
            <h2>
              <Link to={`todos/${TYPE_DECIDE}`}>DECIDE</Link>
              <Button bsStyle="link" onClick={()=> this.toggleQuickAdd(TYPE_DECIDE)}>
                <Icon glyph='icon-fontello-plus-circled'/>
              </Button>
              <Button bsStyle="link" onClick={()=> browserHistory.push(`info/${TYPE_DECIDE}`)}>
                <Icon glyph='icon-fontello-info'/>
              </Button>
            </h2>
            {this.renderActiveTodos(TYPE_DECIDE)}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <h2>
              <Link to={`todos/${TYPE_DELEGATE}`}>DELEGATE</Link>
              <Button bsStyle="link" onClick={()=> this.toggleQuickAdd(TYPE_DELEGATE)}>
                <Icon glyph='icon-fontello-plus-circled'/>
              </Button>
              <Button bsStyle="link" onClick={()=> browserHistory.push(`info/${TYPE_DELEGATE}`)}>
                <Icon glyph='icon-fontello-info'/>
              </Button>
            </h2>
            {this.renderActiveTodos(TYPE_DELEGATE)}
          </Col>
          <Col sm={6}>
            <h2>
              <Link to={`todos/${TYPE_DELETE}`}>DELETE</Link>
              <Button bsStyle="link" onClick={()=> this.toggleQuickAdd(TYPE_DELETE)}>
                <Icon glyph='icon-fontello-plus-circled'/>
              </Button>
              <Button bsStyle="link" onClick={()=> browserHistory.push(`info/${TYPE_DELETE}`)}>
                <Icon glyph='icon-fontello-info'/>
              </Button>
            </h2>
            {this.renderActiveTodos(TYPE_DELETE)}
          </Col>
        </Row>
        {this.renderQuickAdd()}
      </div>
    );
  }
}
