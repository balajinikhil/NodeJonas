const fs = require("fs");
const superagent = require("superagent");

/*
//normal
superagent.get(`https://dog.ceo/api/breeds/image/random`).end((err, res) => {
  console.log(res.body.message);
  fs.writeFileSync("test-file-1.txt", res.body.message, err => {});
});
*/

/*
//promise
superagent
  .get(`https://dog.ceo/api/breeds/image/random`)
  .then(dt => {
    console.log(dt.body);
    write(dt.body.message);
  })
  .catch(err => console.log(err));
*/

//own promises
function write(dt) {
  return new Promise((resolve, reject) => {
    if (dt) {
      resolve(
        fs.writeFile("test-file-1.txt", dt, () => console.log("done writing"))
      );
    } else {
      reject("Something went wrong....!");
    }
  });
}

//async await
async function randomDog() {
  let sup = await superagent
    .get(`https://dog.ceo/api/breeds/image/random`)
    .then(dt => {
      console.log(dt.body);
      return dt.body.message;
    });
  let cb = await write(sup);
}

randomDog();
