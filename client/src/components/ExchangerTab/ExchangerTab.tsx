import React, { useContext } from 'react';
import ExchangerImage from '../../assets/ExchangerImage/Exchanger.jpg';
import { ServerContext } from '../../App';
import './ExchangerTab.scss';

const ExchangerTab: React.FC = () => {
  const serverContext = useContext(ServerContext);
  
 

  return (
    <div className="exchanger-container" id="test-exchanger-tab-container">
      <img 
        src={ExchangerImage} 
        alt="Exchanger" 
        className="exchanger-image" 
        id="test-exchanger-image" 
      />
    </div>
  );
};

export default ExchangerTab;
