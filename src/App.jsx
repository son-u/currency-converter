import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amountFrom, setAmountFrom] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfoFrom = useCurrencyInfo(from);
  const currencyInfoTo = useCurrencyInfo(to);

  const optionsFrom = Object.keys(currencyInfoFrom);
  const optionsTo = Object.keys(currencyInfoTo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmountFrom(convertedAmount);
    setConvertedAmount(amountFrom);
  };

  const convert = () => {
    setConvertedAmount(amountFrom * currencyInfoFrom[to]);
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat "
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/1420701/pexels-photo-1420701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
        }}
      >
        <div className="w-full mt-52">
          <div className="w-full max-w-md mx-auto border border-black border-dotted rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <h1 className="text-2xl font-bold text-indigo-500 text-center mb-5 uppercase">
              Currency Converter
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amountFrom}
                  currencyOptions={optionsFrom}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmountFrom(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-indigo-500 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={optionsTo}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
