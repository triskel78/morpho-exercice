import './Card.css';
import { MOCK_DATA } from '../../mock/cardMockData';
import CircleGraph from '../circleGraph/CircleGraph';
import Table from '../table/Table';

function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{props.cardType}</div>
      </div>
      <div className="card-content">
        <CircleGraph data={MOCK_DATA.markets} />
        <Table data={MOCK_DATA.markets} />
      </div>
      <div className="card-footer">
        <div className="card-footer-action">
          <div className="card-footer-action-text">{props.cardType} a new asset</div>
          <div className="card-footer-action-icon">+</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
