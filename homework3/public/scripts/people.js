var PeopleBox = React.createClass({
    loadPeopleFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },
      handlePersonSubmit: function(person) {
        var people = this.state.data;
        var newPeople = people.concat([person]);
        this.setState({data: newPeople});
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: person,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            this.setState({data: people});
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },
      getInitialState: function() {
        return {data: []};
      },
      componentDidMount: function() {
        this.loadPeopleFromServer();
        setInterval(this.loadPeopleFromServer, this.props.pollInterval);
      },
      render: function() {
        return (
          <div className="peopleBox">
            <h1>People</h1>
            <PeopleList data={this.state.data} />
            <PersonForm onPersonSubmit={this.handlePersonSubmit} />
          </div>
        );
      }
});

var PeopleList = React.createClass({
    render: function() {
        var personNodes = this.props.data.map(function(person) {
          return (
            <Person
            firstName={person.firstName} lastName={person.lastName}
            workID={person.workID} startDate={person.startDate} key={person._id}>
            </Person>
          );
        });
        return (
          <div className="personList">
            {personNodes}
          </div>
        );
    }
});

var PersonForm = React.createClass({
    getInitialState: function() {
        return {firstName: '', lastName: '', workID: '', startDate: ''};
      },
      handleFirstNameChange: function(e) {
        this.setState({firstName: e.target.value});
      },
      handleLastNameChange: function(e) {
        this.setState({lastName: e.target.value});
      },
      handleWorkIDChange: function(e) {
        this.setState({workID: e.target.value});
      },
      handleStartDateChange: function(e) {
        this.setState({startDate: e.target.value});
      },
      handleSubmit: function(e) {
        e.preventDefault();
        var firstName = this.state.firstName.trim();
        var lastName = this.state.lastName.trim();
        var workID = this.state.workID.trim();
        var startDate = this.state.startDate.trim();
        if (!firstName || !lastName || !workID || !startDate) {
          return;
        }
        this.props.onPersonSubmit({firstName: firstName, lastName: lastName, workID: workID, startDate: startDate});
        this.setState({firstName: '', lastName: '', workID: '', startDate: ''});
      },
      render: function() {
        return (
          <form className="personForm" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Your first name"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
            <input
              type="text"
              placeholder="Your last name"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
            <input
              type="text"
              placeholder="Your Work ID"
              value={this.state.workID}
              onChange={this.handleWorkIDChange}
            />
            <input
              type="text"
              placeholder="Your start date"
              value={this.state.startDate}
              onChange={this.handleStartDateChange}
            />
            <input type="submit" value="Post" />
          </form>
        );
      }
});

var Person = React.createClass({
    render: function() {
        return (
            <div className="person">
            <h2 className="name">
                {this.props.firstName} {this.props.lastName}
            </h2>

            <p className="workID">
                Work ID: {this.props.workID}
            </p>
            <p className="startDate">
                Start Date: {this.props.startDate}
            </p>
            </div>
        );
    }
});

ReactDOM.render(
    <PeopleBox url="/people" pollInterval={2000} />,
    document.getElementById('content')
);
