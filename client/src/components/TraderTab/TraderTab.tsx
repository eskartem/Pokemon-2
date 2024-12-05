import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../../App';
import { TLots } from '../../services/server/types';
import Button from '../../components/Button/Button';

const TraderTab: React.FC = () => {
  const server = useContext(ServerContext); // Используем контексты
  let catalog: TLots | null = null;
  useEffect(
    () => {
    ( async () => {catalog = await server.sell();})()

    }, []
  );

  // тоже самое как и для маркета, просто метооды для торговца

  return (
    <div id="test-trader-tab-container">
    торговец
    </div>
  );
};

export default TraderTab;
