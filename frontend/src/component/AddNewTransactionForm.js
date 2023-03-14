import { useEffect, useState } from "react";
import * as fetchs from "../features/transaction/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

function AddNewTransactionForm() {
  const [ammount, setAmmount] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { editing } = useSelector((s) => s.transaction);

  const reset = () => {
    setAmmount("");
    setName("");
    setType("");
  };

  useEffect(() => {
    const { id, name, amount, type } = editing;
    if (id) {
      setEditMode(true);
      setAmmount(amount);
      setName(name);
      setType(type);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const handleEditMode = () => {
    reset();
    setEditMode(false);
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const uId = Date.now().toString(10) + Math.random().toString(16).slice(2);
    const newData = {
      name,
      amount: ammount,
      id: uId,
      type,
    };

    dispatch(fetchs.addTransaction(newData));
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const newData = {
      name,
      amount: ammount,
      type,
    };
    dispatch(fetchs.editTransaction({ data: newData, id: editing.id }));
    setEditMode(false);
    reset();
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleUpdate : handleAddTransaction}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            required
            type="text"
            name="transaction_name"
            placeholder="My Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              name="transaction_type"
              checked={type === "income"}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="expense"
              name="transaction_type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            required
            type="number"
            placeholder="300"
            name="transaction_amount"
            value={ammount}
            onChange={(e) => setAmmount(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {editMode && (
          <button onClick={handleEditMode} className="btn cancel_edit">
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default AddNewTransactionForm;
