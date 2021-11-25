import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

 document.body.style.background = "gray";


class ActorRow extends React.Component{
    render() {
        const actor = this.props.actor;
        const actor_id = this.props.actor.actor_id
        const first_name = this.props.actor.first_name;
        const last_name = this.props.actor.last_name;
        return (
            <tr>
                <td>{actor_id}</td>       
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td> 
                    <button
                        type="button">
                        Delete
                        
                    </button>
                </td>
            </tr>
            
        )
    }
}


class ActorTable extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            actor_id: "",
            first_name: "", 
            last_name: "" 
        }
        this.handleActorIdChange = this.handleActorIdChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }

    postActor(e){
        e.preventDefault();
       console.log ("alert(Actor was added to the table)")
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({actor_id: this.state.actor_id, first_name: this.state.first_name, last_name: this.state.last_name})
        };
        fetch('http://localhost:8080/actors/addactor', requestOptions)
            //.then(response => response.json())
            //.then(data => this.setState({ postId: data.id }));        
    };

    handleActorIdChange(e)  {
        e.preventDefault();
        this.setState({
            actor_id: e.target.value
        })
    };

    handleFirstNameChange(e) {
        e.preventDefault();
        this.setState({
            first_name: e.target.value
        })
    }

    handleLastNameChange(e){
        e.preventDefault();
        this.setState({
            last_name: e.target.value
        })
    }
    render() {
        const filterText = this.props.filterText;        
        
        const rows = [];

        this.props.actors.forEach((actor) => {
        if (actor.last_name.toLowerCase().indexOf(filterText) === -1)
            {
            return;
        }
            rows.push(
                <ActorRow
                actor={actor}
                key={actor.actor_id} />
            );
        });
           
      

        return (
            <div className="actorTableDiv">
            <table>
                <thead>
                    <tr>
                        <th id = "id_heading_1"> Actor Id </th>
                        <th id = "first_name_heading1">First Name</th>
                        <th id = "last_name_heading1">Last Name </th>
                        <th id ="Actions">Actions </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>

            <h1> Add an Actor</h1>

            <form onSubmit={(e) => this.postActor(e)}>
            <label>
            Actor Id:
            <input 
            type ="text" 
            value={this.state.actor_id}
            name = "actor_id"
            required="required"
            placeholder ="Enter an Id..."
            onChange={this.handleActorIdChange}
            />
            </label>

            <label>
            First name:
            <input 
            type ="text" 
            value={this.state.first_name}
            name = "first_name"
            required="required" 
            placeholder ="Enter actor's first name..."
            onChange={this.handleFirstNameChange}
            />
            </label>

            <label>
            Last name:
            <input 
            type ="text" 
            value={this.state.last_name}
            name = "last_name"
            required="required" 
            placeholder ="Enter actor's last name..."
            onChange={this.handleLastNameChange}
            />
            </label>

                <button type="submit">Add</button>
            </form>

            </div>
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




class FilterableActorTable extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           filterText: "",
           actors: []
           
       };


       this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
   }

   componentDidMount() {
       fetch("http://localhost:8080/actors/allactors")
       .then((response) => response.json())
       .then((jsonData) => {
        this.setState({
         actors: jsonData
        });
    });
}

        handleFilterTextChange(filterText){
            this.setState({
                filterText:filterText
            })
        }

    render () {
        return (
           <div>
            <h1 className = "title">Actor Database </h1>
            <h2> Search for an actor</h2>
            <Searchbar
                filterText={this.state.filterText}
                onFilterTextChange={this.handleFilterTextChange}
            />
            <h1 id="actor_title"> Actors </h1>
            <ActorTable actors={this.state.actors}  //props for static data, state for dynamic date
                filterText={this.state.filterText}
            />
            </div>
        );
    }
}


/*const ACTORS = [
    {actor_id: "1", first_name: "George", last_name: "Test"},
    {actor_id: "2", first_name: "Thomas", last_name: "Test"},
    {actor_id: "3", first_name: "John", last_name: "Test"},
    {actor_id: "4", first_name: "Steven", last_name: "Test"},
    {actor_id: "5", first_name: "Gary", last_name: "Test"},
    {actor_id: "6", first_name: "Mary", last_name: "Test"},
    {actor_id: "7", first_name: "William", last_name: "Smith"},

];

*/
ReactDOM.render(
    <FilterableActorTable 
    />,
    document.getElementById('root')
  );