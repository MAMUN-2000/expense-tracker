import editImg from "../images/edit.svg";
import deleteImg from "../images/delete.svg";
import { useDispatch } from "react-redux";
import * as fetches from "../features/transaction/transactionSlice";
function TransactionItem(item) {
  const dispatch = useDispatch();
  const { amount, name, type, id } = item;
  const handleDelete = () => {
    dispatch(fetches.deleteTransaction(id));
  };
  const handleEditing = () => {
    dispatch(fetches.activeEditing(item));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount} </p>
        <button className="link" onClick={handleEditing}>
          <img className="icon" src={editImg} alt="" />
        </button>
        <button className="link" onClick={handleDelete}>
          <img className="icon" src={deleteImg} alt="" />
        </button>
      </div>
    </li>
  );
}

export default TransactionItem;
