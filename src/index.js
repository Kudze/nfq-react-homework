import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie';

class MovieSearch extends React.Component {

    state = {
        input: '',
        movie: {},
        loading: true
    };

    componentWillMount() {
        this.onRawRequest();
    }

    onInputChange = (e) => {
        this.onRequest(e.target.value);
    }

    onRequest = (value) => {

        if(this.verifyInput(value)) {

            this.setState({input: value, loading: true});

            var that = this;
            setTimeout(() => {

                if(that.state.input === value)
                    that.onRawRequest(value);

            }, 150);

        }

    }

    onRawRequest = (value = '') => {

        fetch(`http://www.omdbapi.com/?t=${value}&apikey=969a0dc3`)
            .then(response => response.json())
            .then(json => this.setState({movie: json, loading: false}));

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