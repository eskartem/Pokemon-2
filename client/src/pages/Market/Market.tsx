import React, { useState, useContext, useEffect } from 'react';
import Button from '../../components/Button/Button';
import MarketTab from '../../components/MarketTab/MarketTab';
import TraderTab from '../../components/TraderTab/TraderTab';
import ExchangerTab from '../../components/ExchangerTab/ExchangerTab';
import { IBasePage, PAGES } from '../PageManager';
import { ServerContext, StoreContext } from '../../App';
import './Market.scss';
import { TUserResources } from '../../services/server/types';

export enum TABS {
  MARKET,
  TRADER,
  EXCHANGER
}

const Market: React.FC<IBasePage> = (props: IBasePage) => {
  const { setPage } = props;
  const server = useContext(ServerContext);
  const store = useContext(StoreContext);
  const [tab, setTab] = useState<TABS>(TABS.MARKET);
  const [resources, setResources] = useState<TUserResources | null>(null);

  const user = store.getUser();

  useEffect(() => {
    (async () => {
      const res = await server.getUserResources();
      setResources(res);
    })();
  }, []);

  const backClickHandler = () => setPage(PAGES.MAINMENU);

  if (!user || !resources) {
    return (
      <div>
        <div>ошибка</div>
        <Button onClick={backClickHandler} text='назад' id="test-back-button-error" />
      </div>
    )
  }

  const updateCoins = (newCoins: number) => {
    const updatedResources = { ...resources, coins: newCoins };
    store.setUserResources(updatedResources);
    setResources(updatedResources);
  };

  const addEgg = () => {
    store.addEggToInventory();
  };

  return (
    <div id="test-market-page">
      <div className='user-resources' id="test-user-resources">
        <h1 className='resources-text' id="test-resources-coins">монеты: {resources.coins} |</h1>
        <h1 className='resources-text' id="test-resources-crystals">кристаллы улучшения: {resources.crystals} |</h1>
        <h1 className='resources-text' id="test-resources-eggFragments">куски яиц: {resources.eggFragments}</h1>
      </div>
      <div className='button-panel'>
        <button onClick={() => setTab(TABS.MARKET)} className='market-button' id="test-tab-market">рынок</button>
        <button onClick={() => setTab(TABS.TRADER)} className='market-button' id="test-tab-trader">торговец</button>
        <button onClick={() => setTab(TABS.EXCHANGER)} className='market-button' id="test-tab-exchanger">обменник</button>
      </div>
      <div>
        {tab === TABS.MARKET && <MarketTab />}
        {tab === TABS.TRADER && <TraderTab />}
        {tab === TABS.EXCHANGER && 
          <ExchangerTab 
            requiredCoins={50} 
            updateCoins={updateCoins}
            addEgg={addEgg}
            coins={resources.coins}
          />
        }
      </div>
      <Button onClick={backClickHandler} text='назад' id="test-back-button-main" />
    </div>
  );
}

export default Market;
