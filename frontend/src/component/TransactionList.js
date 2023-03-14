import React from "react";
import TransactionItem from "./TransactionItem";

function TransactionList() {
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <TransactionItem />
    </>
  );
}

export default TransactionList;
