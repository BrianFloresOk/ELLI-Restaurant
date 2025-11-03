import './App.css'
import { Login } from './pages/Login'

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold underline font-montserrat">
        Hello world!
      </h1>
      <p className="font-inter text-gray-700">
        Este texto usa Inter.
      </p>
      <Login />
    </div>
  )
}

export default App
