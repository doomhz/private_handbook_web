import React from 'react'
import { connect } from 'react-redux'
import {Link, browserHistory} from 'react-router'
import {
  Row, Col, Modal, Button, Form,
  FormGroup, FormControl, Icon
} from '@sketchpixy/rubix'
import {
  TYPE_DO, TYPE_DECIDE, TYPE_DELEGATE, TYPE_DELETE,
  TODO_STATUS_ACTIVE
} from '../constants'
import {loadTodos, addTodo} from '../store/todos/actions'
import {getGroupedTodosByTypeAndStatus} from '../store/todos/selectors'

class TodosSummary extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showQuickAdd: false,
      quickAddType: null,
      addTodoValue: ''
    }
  }
  componentDidMount() {
    this.props.dispatch(loadTodos({sync: true}))
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
    this.props.dispatch(addTodo(todo, {sync: true}))
    this.setState({quickAddType: '', addTodoValue: ''})
  }
  handleQuickAdd(){
    if (!this.state.addTodoValue) return
    this.addTodo()
    this.toggleQuickAdd()
  }
  renderActiveTodos(type){
    if (!this.props.todos[type]) return null
    return (
      <ul>
        {this.props.todos[type].map((t, i)=> {
          return (
            <li key={i}>
              <span>{t.title}</span>
            </li>
          )
        })}
      </ul>
    )
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
    )
  }
}

const mapStateToProps = (state)=> ({
  todos: getGroupedTodosByTypeAndStatus(state, TODO_STATUS_ACTIVE)
})

export default connect(mapStateToProps)(TodosSummary)
