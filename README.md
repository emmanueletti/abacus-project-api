# Abacus Project Documentation

An API of personal finance calculators.

## Table of Contents

1.  [Investment Fees Route](#investment-fees)
2.  [Education Return On Invesment Route](#education-return-on-investment)
3.  [Investment Vehicle Route](#investment-vehicle)
4.  [Rent or Buy Route](#rent-or-buy)

## Investment Fees

```
POST /api/investment-fees
```

**Parameters**
| Name | Type | Location | Description / Example |
| ------------- |:-------------:| -----:|-----:|
| Content-Type | string | header |application/json |
| principalInvestment | int | body |40000 |
| annualInterestRate | int | body |7 |
| monthlyContributions | int | body |500 |
| managementExpenseRatio | int | body |2.23 |
| startingAge | int | body |30 |
| retirementAge | int | body |65 |

**Javascript Example**

```javascript
const data = {
  principalInvestment: 40000,
  annualInterestRate: 7,
  monthlyContributions: 500,
  managementExpenseRatio: 2.23,
  startingAge: 30,
  retirementAge: 65,
};

fetch('/api/investment-fees', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

**Response**

```
200 OK
```

```json
{
  "finalInvestmentAmountWithOutFees": "$1,858,585",
  "finalInvestmentAmountWithFees": "$1,648,658",
  "amountLostToFees": "$209,927",
  "percentageLostToFees": "11.30%"
}
```

**Bad Request**

```
400 Bad Requests
```

**Validation failed**

```
Status: 422 Unprocessable Entity
```

[⬆️ Back To Top](#abacus-project)

## Education Return On Investment

```
POST /api/education-roi
```

**Parameters**
| Name | Type | Location | Description / Example |
| ------------- |:-------------:| -----:|-----:|
| Content-Type | string | header |application/json |
| programLengthYears | int | body |2 |
| annualTuition | int | body |5000 |
| currentSalary | int | body |40000 |
| medianExpectedSalary | int | body |60000 |
| isPartTime | bool | body |false |

**Javascript Example**

```javascript
const data = {
  programLengthYears: 2,
  annualTuition: 5000,
  currentSalary: 40000,
  medianExpectedSalary: 60000,
  isPartTime: false,
};

fetch('/api/investment-fees', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

**Response**

```
200 OK
```

```json
{
  "increaseInSalary": "$20,000",
  "returnOnInvestmentPercentage": "22.2%",
  "yearsForEducationToPayForItself": "4.5 Years"
}
```

**Bad Request**

```
400 Bad Requests
```

**Validation failed**

```
Status: 422 Unprocessable Entity
```

[⬆️ Back To Top](#abacus-project)

## Investment Vehicle

```
POST /api/investment-vehicle
```

**Parameters**
| Name | Type | Location | Description / Example |
| ------------- |:-------------:| -----:|-----:|
| Content-Type | string | header |application/json |
| annualIncome | int | body |60000 |
| isTFSAContributionMaxed | bool | body |false |
| isRRSPContributionMaxed | bool | body |false |

**Javascript Example**

```javascript
const data = {
  annualIncome: 60000,
  isTFSAContributionMaxed: false,
  isRRSPContributionMaxed: false,
};

fetch('/api/investment-fees', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

**Response**

```
200 OK
```

```json
{
  "investmentVehicle": "RRSP",
  "amountToContribute": "Contribute at most $9,803 without going past max RRSP contribution room"
}
```

**Bad Request**

```
400 Bad Requests
```

**Validation failed**

```
Status: 422 Unprocessable Entity
```

[⬆️ Back To Top](#abacus-project)

## Rent or Buy

```
POST /api/rent-or-buy
```

**Parameters**
| Name | Type | Location | Description / Example |
| ------------- |:-------------:| -----:|-----:|
| Content-Type | string | header |application/json |
| homePrice | int | body |500000 |
| isTFSAorRRSPMaxed | bool | body |false |

**Javascript Example**

```javascript
const data = {
  homePrice: 500000,
  isTFSAorRRSPMaxed: false,
};

fetch('/api/investment-fees', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

**Response**

```
200 OK
```

```json
{
  "rentEquivalent": "$2,083",
  "referenceURL": "https://www.youtube.com/watch?v=Uwl3-jBNEd4"
}
```

**Bad Request**

```
400 Bad Requests
```

**Validation failed**

```
Status: 422 Unprocessable Entity
```

[⬆️ Back To Top](#abacus-project)
