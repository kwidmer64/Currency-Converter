//
var myHeaders = new Headers();
myHeaders.append("apikey", "goP6laGyu7iQkR9xoIzsH9Ot15C0JPYu");
var requestOptions = {
  method: 'GET',
  headers: myHeaders
};

//Conversion

let currency = {
    convertCurrency: function (currency_from, currency_to, amount){
      // conversion retrieval
        fetch(
            "https://api.apilayer.com/exchangerates_data/convert?to="
            + currency_to 
            + "&from=" 
            + currency_from 
            + "&amount="
            + amount, 
            requestOptions)
          .then(async function(response){
            var json = await response.json();
            //console.log(json);
            return json;
          } )
          .then(result => this.displayConversion(result))
          .catch(error => console.log('error', error));
    },
    // display conversion results
    displayConversion: function(result) {
        const currencyFrom = result.query.from;
        const currencyTo = result.query.to;
        const amount = result.query.amount;
        //console.log(currencyFrom, currencyTo, result.result);
        document.querySelector(".currency-from").innerText = amount + " " + currencyFrom + " equals";
        document.querySelector(".currency-to").innerText = result.result + " " + currencyTo;
    }
};

//Symbol retrieval

let symbols = {
  getSymbols: function (){
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
      .then(async function(response){
        var json = await response.json();
        //console.log(json);
        return json;
      } )
      .then(result => this.symbolTesting(result))
      .catch(error => console.log('error', error));

  },
  symbolTesting: function (symbolInput){
    const symbols = symbolInput.symbols;
    var convertFrom = document.getElementById("convert-from");
    var convertTo = document.getElementById("convert-to");

    for(var i in symbols){

      //create options for convertFrom
      var option1 = document.createElement('option');
      option1.value = i;
      option1.className = "dropdown-options";
      option1.innerHTML = symbols[i];

      //create options for convertTo
      var option2 = document.createElement('option');
      option2.value = i;
      option2.className = "dropdown-options";
      option2.innerHTML = symbols[i];

      //append the elements
      convertTo.appendChild(option1);
      convertFrom.appendChild(option2);
    }

  }

};

document
  .querySelector(".search")
  .addEventListener("click", function () {
    //get currency from value
    var selectFrom = document.getElementById('convert-from');
    var valueFrom = selectFrom.options[selectFrom.selectedIndex].value;

    //get currency to value
    var selectTo = document.getElementById('convert-to');
    var valueTo = selectTo.options[selectTo.selectedIndex].value;

    //get conversion amount
    var conversionAmount = document.getElementById('convert-input').value;


    currency.convertCurrency(valueFrom, valueTo, conversionAmount);
  });

window.onload = (event) => {
  symbols.getSymbols();
  /*
  fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  */
}