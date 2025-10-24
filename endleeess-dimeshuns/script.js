let game = {
  dimensions: {
    amount: 7,
    costs: [10,],
    category: []
  }
}

function test() {
  let z = ``
  for (var i = 1; i <= game.dimensions.amount + 1; i++) z += `
    <tr id = "dimDisplay` + i + `" style = "text-align: right">
  	<td style = "text-align: left; padding-bottom: 8px; width: 250">` + i + ` Dimension</td>
	  <td style = "position: absolute; width: 100"><span id = "dimamount`+i+`"></span></td>
	  <td style = "position: absolute; width: 200; left: 400; text-align: left"><span id = "dimgrowth`+i+`"></span></td>
	  <td style = "position: absolute; width: 200; left: 600">x<span id = "dimmult`+i+`"></span></td>
	  <td style = "position: absolute; right: 20"><button class = "buy" id = "dimbuy`+i+`" onclick = "buyDimension(`+i+`)"></button></td>
  </tr>`
  document.getElementById("dimensions").innerHTML = z
}
test()