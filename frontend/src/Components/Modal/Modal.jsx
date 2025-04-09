import React from 'react';
import './Modal.css';
import acMilan from '../../assets/UEFA/ac-milan.svg';
import ajax from '../../assets/UEFA/ajax.svg';
import atalanta from '../../assets/UEFA/atalanta.svg';
import atleticoMadrid from '../../assets/UEFA/atletico-madrid.svg';
import barcelona from '../../assets/UEFA/barcelona.svg';
import bayern from '../../assets/UEFA/bayern-munchen.svg';
import benfica from '../../assets/UEFA/benfica.svg';
import besiktas from '../../assets/UEFA/besiktas.svg';
import clubBrugge from '../../assets/UEFA/club-brugge.svg';
import dynamoKiyv from '../../assets/UEFA/dynamo-kiyv.svg';
import fcPorto from '../../assets/UEFA/fc-porto.svg';
import interMilan from '../../assets/UEFA/internazionale-milano.svg';
import juventus from '../../assets/UEFA/juventus.svg';
import liverpool from '../../assets/UEFA/liverpool.svg';
import lille from '../../assets/UEFA/losc-lille.svg';
import malmo from '../../assets/UEFA/malmo-ff.svg';
import manCity from '../../assets/UEFA/manchester-city.svg';
import psg from '../../assets/UEFA/paris-saint-germain-f-c.svg';
import leipzig from '../../assets/UEFA/rb-leipzig.svg';
import realMadrid from '../../assets/UEFA/real-madrid.svg';
import salzburg from '../../assets/UEFA/redbull-salzburg.svg';
import sevilla from '../../assets/UEFA/sevilla.svg';
import shakhtar from '../../assets/UEFA/shakhtar-donetsk.svg';
import sheriff from '../../assets/UEFA/sheriff-tiraspol.svg';
import sporting from '../../assets/UEFA/sporting-cp.svg';
function Modal({ message, onConfirm, onCancel }) {
    const teams = [
        acMilan, ajax, atalanta, atleticoMadrid, barcelona, bayern,
        benfica, besiktas, clubBrugge, dynamoKiyv, fcPorto, interMilan,
        juventus, liverpool, lille, malmo, manCity, psg,
        leipzig, realMadrid, salzburg, sevilla, shakhtar, sheriff, sporting
      ];
      
  return (
    <div className="pos-modal">
        <h3>{message}</h3>
        
        <div className='logo-equipe'>
        {teams.map((logo, index) => (
    <button key={index} className="team-button">
      <img src={logo} alt={`team-${index}`} />
    </button>
  ))}
        </div>
        
          <button className="confirmer" onClick={onConfirm}>Confirmer</button>
          <button className="annuler" onClick={onCancel}>Annuler</button>

        </div>
  );
}

export default Modal;