var antimatter = new Decimal(10)
var dimensionAmounts = [NaN,new Decimal(0),new Decimal(0)]
var dimensionCosts = [NaN,new Decimal(10),new Decimal(100)]
var dimensionMultipliers = [NaN,new Decimal(1),new Decimal(1)]
function buy1stDim() {
  if (antimatter.greaterThanOrEqualTo(dimensionCosts[1])){
   dimensionAmounts[1] = dimensionAmounts[1].add(1)  }
}