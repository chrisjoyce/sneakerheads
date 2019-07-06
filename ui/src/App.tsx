import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForShoe from './SearchForShoe/SearchForShoe';


interface IState {}
interface IProps {}

class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  submitSearch = () => {}
  
  render() {
    return (
      <div className="app-wrapper">
        <div className="search-input"></div>
          <SearchForShoe />
        <div className="search-results"></div>
      </div>
    );
  }
}
// (const App: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <input type="text"></input>
//       </header>
//     </div>
//   );
// }

export default App;
