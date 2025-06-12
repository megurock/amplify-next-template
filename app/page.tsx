'use client'
import type { Schema } from '@/amplify/data/resource'
import outputs from '@/amplify_outputs.json'
import { useAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import { useEffect, useState } from 'react'
import './../app/app.css'

Amplify.configure(outputs)

const client = generateClient<Schema>()

export default function App() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])
  const { signOut } = useAuthenticator()

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <ここでは無視して OK>
  useEffect(() => {
    listTodos()
  }, [])

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt('Todo content'),
    })
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  )
}
