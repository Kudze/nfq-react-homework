import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie';

/*
class HelloWorld extends React.Component {

    state = {
        counter: 0
    };

    onCounterChange = (isDecrement) => {

        let { counter } = this.state;
        if(isDecrement) {
            counter--;
        } else {
            counter++;
        }

        this.setState({counter});

    }

    render() {

        const { user, age } = this.props;

        return (
            //className instead of class, htmlFor instead of for.
            <div>
                <h1>Hello my name is { user }. And I'am { age } years old!</h1>

                <h4>{this.state.counter}</h4>
                <button onClick={this.onCounterChange.bind(this, false)}>Increment</button>
                <button onClick={this.onCounterChange.bind(this, true)}>Decrement</button>
            </div>
        )
    }

}

ReactDOM.render(<HelloWorld user="John Snow" age={25}/>, document.getElementById('root'));
*/

class MovieSearch extends React.Component {

    state = {
        input: '',
        movie: {},
        loading: true
    };

    componentWillMount() {
        this.onRequest();
    }

    onInputChange = (e) => {
        this.onRequest(e.target.value);
    }

    onRequest = (value) => {

        if(this.verifyInput(value)) {

            this.setState({input: value, loading: true})

            fetch(`http://www.omdbapi.com/?t=${value}&apikey=969a0dc3`)
                .then(response => response.json())
                .then(json => this.setState({movie: json, loading: false}));

        }

    }

    verifyInput = (input) => {

        return /(^[a-zA-Z _]+(\s*[a-zA-Z _]+)*$)|(^$)/.test(input);

    }

    render() {

        let movieInfo;
        if(this.state.loading)
            movieInfo = <h4>Loading ...</h4>
        else
            movieInfo = <Movie {...this.state.movie}/>

        return (
            <div>
                <h1>Movies</h1>
                <input type="text" onChange={this.onInputChange} value={this.state.input}></input>

                {movieInfo}

            </div>
        )
    }

}

ReactDOM.render(<MovieSearch></MovieSearch>, document.getElementById('root'));