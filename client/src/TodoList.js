import { Card, Header, Form, Input, Icon, Button } from 'semantic-ui-react'
import axios from 'axios'
import { useEffect, useState } from 'react'

let endpoint = 'http://localhost:9000'

const TodoList = () => {
    const [task, setTask] = useState('')
    const [items, setItems] = useState([])

    useEffect(() => {
        getTask()
    }, [])

    const onSubmit = async () => {
        if (task) {
            console.log('123');
            const res = await axios.post(endpoint + '/api/tasks',
                { task },
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }
            )
            if (res.data) {
                getTask()
                setTask('')
            }
        }
    }

    const onChange = (e) => {
        setTask(e.target.value)
    }

    const getTask = async () => {
        const res = await axios.get(endpoint + '/api/tasks')

        if (res.data) {
            const results = res.data.map(item => {
                let color = "yellow"
                let style = {
                    wordWrap: 'break-word'
                }

                if (item.status) {
                    color = 'green'
                    style['textDecorationLine'] = "line-through"
                }
                return (
                    <Card key={item._id} color={color} fluid className='rough'>
                        <Card.Content>
                            <Card.Header textAlign='left'>
                                <div style={style}>
                                    {item.task}
                                </div>
                            </Card.Header>
                            <Card.Meta textAlign='right'>
                                <Icon
                                    name="check circle"
                                    color="blue"
                                    onClick={() => updateTask(item._id)}
                                />
                                <span style={{ paddingRight: 10 }}>Done</span>
                                <Icon
                                    name="undo"
                                    color="blue"
                                    onClick={() => undoTask(item._id)}
                                />
                                <span style={{ paddingRight: 10 }}>Undo</span>
                                <Icon
                                    name="delete"
                                    color="red"
                                    onClick={() => deleteTask(item._id)}
                                />
                                <span style={{ paddingRight: 10 }}> Delete</span>
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                )
            })
            setItems(results)
        } else {
            setItems([])
        }
    }

    const updateTask = async (id) => {
        const res = await axios.put(endpoint + '/api/tasks/' + id, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        })
        if (res.data) {
            getTask()
        }
    }

    const undoTask = async (id) => {
        const res = await axios.put(endpoint + '/api/undoTask/' + id, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        })
        if (res.data) {
            getTask()
        }
    }

    const deleteTask = async (id) => {
        const res = await axios.delete(endpoint + '/api/deleteTask/' + id, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        })
        if (res.data) {
            getTask()
        }
    }

    return (
        <div>
            <div className="row">
                <Header className="header" as='h2' color='yellow'>
                    TODO LIST
                </Header>
            </div>
            <div className="row">
                <Form onSubmit={onSubmit}>
                    <Input
                        type='text'
                        name='task'
                        onChange={onChange}
                        value={task}
                        fluid
                        placeholder='Create task'
                    />
                    <Button>Create Task</Button>
                </Form>
            </div>
            <div className="row">
                <Card.Group>{items}</Card.Group>
            </div>
        </div>
    )
}

export default TodoList