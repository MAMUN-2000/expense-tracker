import editImg from "../images/edit.svg";
import deleteImg from "../images/delete.svg";

function TransactionItem() {
  return (
    <div className="conatiner_of_list_of_transactions">
      <ul>
        <li className="transaction income">
          <p>Earned this month</p>
          <div className="right">
            <p>৳ 100</p>
            <button className="link">
              <img className="icon" src={editImg} alt="" />
            </button>
            <button className="link">
              <img className="icon" src={deleteImg} alt="" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TransactionItem;
