var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/

function hundredThousand(current) {
  if( current.amount > 100000.00) {
    return current;
  }
}

var hundredThousandairs = dataset.bankBalances.filter(hundredThousand);

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
function addKey(current) {

  var newObj = {
    amount: current.amount,
    state: current.state,
    rounded: Math.round(current.amount)
  };

  return newObj;
}

var roundedDollar = dataset.bankBalances.map(addKey);


/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
function oneDecimal(current) {

var newObj = {
    amount: Math.round(current.amount*10)/10,
    state: current.state
  };

  return newObj;
}

var roundedDime = dataset.bankBalances.map(oneDecimal);

// set sumOfBankBalances to the sum of all amounts in bankBalances

function summing(previous, current) {
  var sum = (Number(previous) + Number(current.amount));
  var newSum = (Math.round(sum * 100))/100;
  return newSum;
}

var sumOfBankBalances = dataset.bankBalances.reduce(summing, 0);

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var selectedStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];

var sumOfInterests = Math.round(dataset.bankBalances.reduce(function(previous, current, index, array) {

   if((selectedStates).indexOf(current.state) !== -1){
    return Math.round(Number(previous) + Number(current.amount) * 100 * 0.189);
  }

  return previous;

}, 0)) / 100;

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */


var sumOfHighInterests = null;
var selectedStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];

var notThoseStates = dataset.bankBalances.filter(function(current){
  return((selectedStates).indexOf(current.state) === -1);
});

var result = {};

  notThoseStates.forEach(function(element, index, array) {

  var newObj = {
   amount: Number(element.amount),
   state: element.state
 };


  if(result[newObj.state] === undefined) {
     result[newObj.state] = newObj.amount * 0.189;
   }
   else {
   result[newObj.state] += newObj.amount * 0.189;
  }
});

  for (var i in result) {
    if (result[i] > 50000) {
      //console.log(result[i]);

    sumOfHighInterests += result[i] ;
    }
  }

sumOfHighInterests = 0.03 + (Math.round(sumOfHighInterests * 100))/100;

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */

 var stateSums = {};

dataset.bankBalances.forEach(function(element, index, array) {
  if (stateSums[element.state] === undefined) {
    stateSums[element.state] = (Math.round(Number(element.amount)*100))/100;
  } else {
    stateSums[element.state] += (Math.round(Number(element.amount)*100))/100;
  }
});

  for (var prop in stateSums) {
    stateSums[prop] = Math.round(stateSums[prop]*100)/100;
  }

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var allSums = {};

dataset.bankBalances.forEach(function(element, index, array) {
  if(allSums[element.state] === undefined) {
    allSums[element.state] = (Math.round(Number(element.amount)*100))/100;
  } else {
    allSums[element.state] += (Math.round(Number(element.amount)*100))/100;
  }
});

//console.log('HEHEHE', allSums);
var lowerSumStates = [];

for (var k in allSums) {
  if (allSums[k] < 1000000) {
    //console.log(typeof k);
    console.log('HERE', allSums[k]);
    console.log('states!', k);

    lowerSumStates.push(k);
  }
}


console.log('LOWER', lowerSumStates);




/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};