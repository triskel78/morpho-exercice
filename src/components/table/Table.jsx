import './Table.css';
import { getLogoSvgUrl } from '../../utils/AssetUtils';
import P2PIcon from '../p2pIcon/P2PIcon';

function Table(porps) {
  return (
    <div className="table-container">
      <table className="table">
        <tr className="table-head">
          <th>Assets</th>
          <th>Borrow</th>
          <th>Compound APY</th>
          <th>Your APY</th>
        </tr>
        {porps.data.map((market) => (
          <tr>
            <td>
              <div className="asset-container">
                <img className="asset-logo" alt={market.symbol} src={getLogoSvgUrl(market.symbol)}></img>
                <span>{market.symbol}</span>
              </div>
              <span className="morpho-rewards">
                <img
                  className="morpho-rewards-logo"
                  alt="morpho-token"
                  src="https://cdn.morpho.xyz/assets/logos/morpho.svg"
                ></img>
                {market.morphoRewards < 0 ? '-' : '+'} {market.morphoRewards}
              </span>
            </td>
            <td>{market.borrow}</td>
            <td>{Math.round(market.poolAPY * 10000) / 100}%</td>
            <td>
              <div className="user-apy">
                <span>{Math.round(market.userAPY * 10000) / 100}%</span>
                {market.isMatched && <P2PIcon />}
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
