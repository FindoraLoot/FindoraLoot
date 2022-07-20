import React from 'react';
import { useHistory } from 'react-router';

import pageURL from '_constants/pageURL';
import Header from '_components/Header';

import './index.less';

function Home() {
  const history = useHistory();

  function handleOnClickEnter() {
    history.push(pageURL.action);
  }
  return (
    <div className="home-page">
      <div>
        <Header />
      </div>
      <section className="scope-home-desc">
        <div className="title">Loot</div>
        <ul className="about">
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              OpenSea
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Contract
            </a>
          </li>
        </ul>
        <p className="info">
          Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are
          intentionally omitted for others to interpret. <br />
          Feel free to use Loot in any way you want.
        </p>
      </section>

      <section className="scope-home-dapp">
        <div className="btn-white self_btn" onClick={handleOnClickEnter}>
          Enter
        </div>
      </section>
    </div>
  );
}
export default Home;
