module.exports = (ele, Temp) => {
  let final = Temp.replace(/{%productName%}/g, ele.productName);

  final = final.replace(/{%quantity%}/g, ele.quantity);
  final = final.replace(/{%price%}/g, ele.price);
  final = final.replace(/{%price%}/g, ele.price);
  final = final.replace(/{%id%}/g, ele.id);
  final = final.replace(/{%from%}/g, ele.from);
  final = final.replace(/{%nutrients%}/g, ele.nutrients);
  final = final.replace(/{%description%}/g, ele.description);

  if (ele.organic == false) {
    final = final.replace(/{%not-organic%}/g, "not-organic");
  }
  return final;
};
