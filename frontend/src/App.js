import AddNewTransactionForm from "./component/AddNewTransactionForm";
import CurrentBalance from "./component/CurrentBalance";
import Footer from "./component/Footer";
import Topbar from "./component/Topbar";
import TransactionList from "./component/TransactionList";

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className="main">
        <div className="container">
          <CurrentBalance />
          <AddNewTransactionForm />
          <TransactionList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
