import React from 'react';
import Card from './card/Card';

export default class Main extends React.Component {
    state = {
        response: []
    };

    callApi = async () => {
        const response = await fetch('/rick-and-morty');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
    };
    
    componentDidMount() {
        this.callApi()
          .then(res => this.setState({ response: res.express}))
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

    render(){
        return (
            <div className="container-fluid">
                {this.state.response.map(item => {
                    return (
                        <Card name={item.name} id={item.id} image={item.image}
                            status={item.status} color={item.status === 'Alive'? 'text-success': 'text-danger'}
                            key={item.id} origin={item.origin} location={item.location}
                            species={item.species} gender={item.gender} quantidade={item.episode.length} temp1={this.aparicoesTemporada(1,item.episode)}
                            temp2={this.aparicoesTemporada(2,item.episode)} temp3={this.aparicoesTemporada(3,item.episode)} 
                        ></Card>
                    );
                })}
            </div>
        );
    }
}