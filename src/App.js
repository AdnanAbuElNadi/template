import logo from './logo.svg';
import './App.css';
import Palindrome from './JS_LeetProblems/Palindrome';
import MedianArrays from './JS_LeetProblems/Medianof2SortedArrays';
import UserTable from './Table/users';

function App() {
  return (
    <div className="App">
{/*       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      <MedianArrays/>
    </header> */}
    <UserTable/>
    
    </div>
  );
}

export default App;
