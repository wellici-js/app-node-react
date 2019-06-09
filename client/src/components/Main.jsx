import React from 'react';
import Card from './card/Card';

export default class Main extends React.Component {
    constructor() {
        super()
        this.handleChange.bind(this);
    }
    state = {
        response: [],
        todos: true,
        vivos: false,
        mortos: false,
        nome: '',
        search: false
    };

    callApi = async () => {
        const response = await fetch('/rick-and-morty');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
    };
    
    componentDidMount() {
        this.callApi()
          .then(res => this.setState({ response: res.express.sort((a,b) => a.name < b.name?1:-1).sort((a,b) => a.episode.length>b.episode.length?-1:1) }))
          .catch(err => console.log(err));
    }

    aparicoesTemporada(temp,eps) {
        let epTemps = eps.map(item =>{
            let string = item.split('').reverse().join('');
            let substr = string.substring(0,string.indexOf('/')).split('').reverse().join('');
            return parseInt(substr);
        })
        if (temp === 1){
            return epTemps.filter(item => item <= 11).length; 
        }else if (temp === 2){
            return epTemps.filter(item => item > 11 && item <= 21).length;
        }else if (temp === 3){
            return epTemps.filter(item => item > 21).length;
        }
    }

    renderHeader() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h3 className="navbar-brand" >Personagens</h3>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    
                    <li className="nav-item">
                        <button className="nav-link btn-success" 
                        onClick={() => {
                            this.setState({vivos: true})
                            this.setState({mortos: false})
                            this.setState({todos: false})
                            this.setState({search: false})
                            }}>Vivos</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn-danger" 
                        onClick={() => {
                            this.setState({vivos: false})
                            this.setState({mortos: true})
                            this.setState({todos: false})
                            this.setState({search: false})
                            }}>Mortos</button>
                    </li>

                    <li className="nav-item">
                        <button className="nav-link btn-primary" 
                        onClick={() => {
                            this.setState({vivos: false})
                            this.setState({mortos: false})
                            this.setState({todos: true})
                            this.setState({search: false})
                            }}>Todos</button>
                    </li>
                    
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    
                    <input lassName="form-control mr-sm-2" type="text" placeholder="Search"
                     value={this.state.nome} 
                     onChange={this.handleChange.bind(this)}
                     onFocus={() => {
                        this.setState({vivos: false})
                        this.setState({mortos: false})
                        this.setState({todos: false})
                        this.setState({search: true})
                     }}
                    />

                    </form>
                </div>
            </nav>
        );
    }

    handleChange(event) {
        this.setState({nome: event.target.value});
    }

    renderCondicional() {
        if(this.state.vivos){
            return this.state.response.map(item => {
                if(item.status === 'Alive'){

                    return (
                        <Card name={item.name} id={item.id} image={item.image}
                            status={item.status} color={item.status === 'Alive'? 'text-success': 'text-danger'}
                            key={item.id} origin={item.origin} location={item.location}
                            species={item.species} gender={item.gender} quantidade={item.episode.length} temp1={this.aparicoesTemporada(1,item.episode)}
                            temp2={this.aparicoesTemporada(2,item.episode)} temp3={this.aparicoesTemporada(3,item.episode)} 
                        ></Card>
                 );
                }else {
                    return false;
                }

            })
        }
        if(this.state.mortos){
            return this.state.response.map(item => {
                if(item.status === 'Dead'){

                    return (
                        <Card name={item.name} id={item.id} image={item.image}
                            status={item.status} color={item.status === 'Alive'? 'text-success': 'text-danger'}
                            key={item.id} origin={item.origin} location={item.location}
                            species={item.species} gender={item.gender} quantidade={item.episode.length} temp1={this.aparicoesTemporada(1,item.episode)}
                            temp2={this.aparicoesTemporada(2,item.episode)} temp3={this.aparicoesTemporada(3,item.episode)} 
                        ></Card>
                 );
                }else {
                    return false;
                }

            })
        }
        if(this.state.todos){
            return this.state.response.map(item => {
                    return (
                        <Card name={item.name} id={item.id} image={item.image}
                            status={item.status} color={item.status === 'Alive'? 'text-success': 'text-danger'}
                            key={item.id} origin={item.origin} location={item.location}
                            species={item.species} gender={item.gender} quantidade={item.episode.length} temp1={this.aparicoesTemporada(1,item.episode)}
                            temp2={this.aparicoesTemporada(2,item.episode)} temp3={this.aparicoesTemporada(3,item.episode)} 
                        ></Card>
                 );
            })
        }
        if(this.state.search){
            return this.state.response.map(item => {
                if(item.name.toUpperCase().includes(this.state.nome.toUpperCase())){

                    return (
                        <Card name={item.name} id={item.id} image={item.image}
                            status={item.status} color={item.status === 'Alive'? 'text-success': 'text-danger'}
                            key={item.id} origin={item.origin} location={item.location}
                            species={item.species} gender={item.gender} quantidade={item.episode.length} temp1={this.aparicoesTemporada(1,item.episode)}
                            temp2={this.aparicoesTemporada(2,item.episode)} temp3={this.aparicoesTemporada(3,item.episode)} 
                        ></Card>
                 );
                }else {
                    return false;
                }

            })
        }
    }

    render(){
        return (
            <div className="container-fluid">
                {this.renderHeader()}
                {this.renderCondicional()}
            </div>
        );
    }
}