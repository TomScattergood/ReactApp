import React from 'react';
import ReactDOM from 'react-dom';
import "./customer.css";

 //document.body.style.background = "red";


class CustomerRow extends React.Component{
    render() {
        const customer = this.props.customer;
        const customer_id = this.props.customer.customer_id
        const FirstName = this.props.customer.FirstName;
        const LastName = this.props.customer.LastName;
        return (
            <tr>
                <td>{customer_id}</td>       
                <td>{FirstName}</td>
                <td>{LastName}</td>
            </tr>
        )
    }
}


class CustomerTable extends React.Component{
    render() {
        const filterText = this.props.filterText;        
        
        const rows = [];

        this.props.customer.forEach((actor) => {
        if (customer.FirstName.toLowerCase().indexOf(filterText) === -1 
        // || (customer.LastName.toLowerCase().indexOf(filterText))
            )
            {
            return;
        }
            rows.push(
                <CustomerRow
                customer={customer}
                key={customer.FirstName} />
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th id = "id_heading_2"> customer_id </th>
                        <th id = "first_name heading 2">First Name</th>
                        <th id = "last_name heading 2">Last Name </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}


class Searchbar extends React.Component {
    constructor (props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText}
                    onChange={this.handleFilterTextChange} />
            </form>
        )
    }
}




class FilterableCustomerTable extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           filterText: ''
       };


       this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
   }

        handleFilterTextChange(filterText){
            this.setState({
                filterText:filterText
            })
        }

    render () {
        data()
        return (
           <div>
            <h1 class = "title">This is a customer database </h1>
            <Searchbar
                filterText={this.state.filterText}
                onFilterTextChange={this.handleFilterTextChange}
            />
            <h1 id="customer_title"> Customers </h1>
            <CustomerTable customer={this.props.customers}
                filterText={this.state.filterText}
            />
            </div>
        );
    }
}


const data = () =>{
    fetch("http://localhost:8080/customers/allcustomers")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)}
        )
};

const CUSTOMERS = [
    {customer_id: "1", FirstName: "Thomas", LastName: "Scattergood"},
    {customer_id: "2", FirstName: "William", LastName: "Test"},
    {customer_id: "3", FirstName: "Mary", LastName: "Smith"},

];

ReactDOM.render(
    <FilterableCustomerTable customers={CUSTOMERS}
    />,
    document.getElementById('root')
  );