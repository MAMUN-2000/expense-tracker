import { useSelector } from "react-redux";

function CurrentBalance() {
  const { transactions } = useSelector((s) => s.transaction);

  const calculateBalance = () => {
    let income = 0;
    transactions.map((item) => {
      if (item.type === "income") {
        return (income += Number(item.amount));
      } else return (income -= Number(item.amount));
    });

    return income;
  };

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>{calculateBalance()}</span>
      </h3>
    </div>
  );
}
export default CurrentBalance;
