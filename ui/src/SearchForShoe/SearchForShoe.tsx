import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo';

interface ISearchState {
  selectedBrand: string;
  styleNumber: string;
}

class SearchForShoe extends Component<{}, ISearchState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      selectedBrand: 'nike',
      styleNumber: ''
    }
  }

  handleSubmit = () => {}

  handleSelectionChange = () => {}
  styleNumberChanged = (event: any) => {
    console.log(event);
  }

  search() {}
  
  render() {  
    return (

      <ApolloConsumer>
        { client => (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="styleNumber"></label>
            <input type="text" name="styleNumber" value={this.state.styleNumber} onChange={this.styleNumberChanged}/>

            <label htmlFor="shoePrice">Shoe Price</label>
            <input type="text" name="shoePrice"/>


            <select value={this.state.selectedBrand} onChange={this.handleSelectionChange} name="brand" id="shoe-brand">
              <option value="nike" selected>Nike</option>
              <option value="adidas">Adidas</option>
            </select>


            <input type="submit" value="Submit" />

            </form>
        )}
        
      </ApolloConsumer>

    )
  }

}

export default SearchForShoe;