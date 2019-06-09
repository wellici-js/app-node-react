import React from 'react';
import './styles.css';


export default class Card extends React.Component {

    state = {
        en: ['Alive','Dead','unknown','Male','Female','Human','Alien','Cronenberg'],
        pt: ['Vivo', 'Morto','Desconhecido','Masculino','Feminino','Humano','Alienigena','Cronenberg']
    }

    tradutor(prop) {
        return this.state.en.map((item, index) => item === prop? this.state.pt[index]: false);
    }


    render() {
        return (
            <div className="card"  key={this.props.key}>
                <img src={this.props.image} className="card-img-top" alt={this.props.name}/>
                
                <div className="card-body">
                    <h5 className="card-title">{this.props.name}</h5>
                    <div className="cont">
                        <p>Visto por ultimo em: {this.props.location.name}</p>
                    </div>
                    <p>Genero: {this.tradutor(this.props.gender)}</p>
                    <h6>Staus: <p className={this.props.color}>{this.tradutor(this.props.status)}</p> </h6>
                    <p className="card-text">Especie: {this.tradutor(this.props.species)}</p>
                    <p className="card-text">Origem: {this.props.origin.name === 'unknown'?'Desconhecido':this.props.origin.name}</p>
                    <div className="cont-localite">
                        <p className="card-text">Aparições na 1° temporada: {this.props.temp1}</p>
                        <p className="card-text">Aparições na 2° temporada: {this.props.temp2}</p>
                        <p className="card-text">Aparições na 3° temporada: {this.props.temp3}</p>
                        <p className="card-text">Aparições no total: {this.props.quantidade}</p>
                    </div>
                    
                </div>
            </div>
        );
    }
}