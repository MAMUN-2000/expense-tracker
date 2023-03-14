import React, { useEffect } from "react";
import TransactionItem from "./TransactionItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../features/transaction/transactionSlice";
import Loading from "./ui/Loading";
import Error from "./ui/Error";

function TransactionList() {
  const dispatch = useDispatch();
  const { transactions, isLoading, isError, errorMessage } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

  // decide what to render
  let element;

  if (isLoading) {
    element = <Loading />;
  }
  if (isError) {
    element = <Error msg={errorMessage} />;
  }
  if (!isError && !isLoading && transactions?.length > 0) {
    element = transactions.map((item, index) => (
      <TransactionItem key={index} {...item} />
    ));
  }
  if (!isError && !isLoading && transactions?.length === 0) {
    element = <h1>No Transaction Found ! </h1>;
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>{element}</ul>
      </div>
    </>
  );
}

export default TransactionList;
