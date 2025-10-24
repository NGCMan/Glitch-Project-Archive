function checkTime(num) {
  if(num.greaterThanOrEqualTo(1000)) {
    return num.divide(1000) + "s"
  } else if(num.greaterThanOrEqualTo(1)) {
    return num + "ms"
  } else {
    return num + "μs"
  }
}