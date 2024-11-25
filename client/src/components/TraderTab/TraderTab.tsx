import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../../App';
import { TTraderCatalog } from '../../services/server/types';

const TraderTab: React.FC = () => {
  const server = useContext(ServerContext); // Используем контексты
  let catalog: TTraderCatalog | null = null;
  useEffect(
    () => {
    ( async () => {catalog = await server.getTraderCatalog();})()

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