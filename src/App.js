import './App.css'
import Graph from './Graph'

const App = () => (
  <div className="App">
    <header className="header">Bar Graph</header>
    <Graph />
    <footer className="footer">
      Made by{' '}
      <code>
        <a
          className="link"
          href="https://github.com/giridhar7632"
          target={'_blank'}
          rel="noreferrer"
        >
          Giridhar
        </a>
      </code>
      {' 😃'}
    </footer>
  </div>
)

export default App
