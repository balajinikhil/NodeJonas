const fs = require("fs");
const http = require("http");
const url = require("url");
const createTemplate = require("./createTemplate");

//file system
let data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "UTF-8"));

const overviewTemp = fs.readFileSync(
  `${__dirname}/template/overview.html`,
  "UTF-8"
);

const cardTemp = fs.readFileSync(
  `${__dirname}/template/cardTemplate.html`,
  "UTF-8"
);

const productTemp = fs.readFileSync(
  `${__dirname}/template/product.html`,
  "UTF-8"
);

//callbacks

//overview

//server
const server = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true);
  console.log(pathname);

  res.writeHead(200, {
    "Content-type": "text/html"
  });

  //overview
  if (pathname == "/" || pathname == "/overview") {
    let output = data.map(ele => createTemplate(ele, cardTemp));
    let disp = output.join("");
    let out = overviewTemp.replace("%cardTemplate%", disp);
    res.end(out);

    //product
  } else if (pathname == "/product") {
    let out = data[query.id];

    let disp = createTemplate(out, productTemp);

    res.end(disp);
  } else {
    res.writeHead(404, {
      "Content-type": "application/json"
    });

    res.end("Something must be wrong");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server up and running on port 3000");
});

/*Creating a simple Node Farm API

//creating and loading
-First we require the core node module such as http and fs, 
We read all the html files in synchronous way (i.e because once this will only be executed once as application is run so this dosen't block the process as it is loaded only once)
-All html files and json files is stored into variables

-We create a server using http module
http.createServer((req,res)=>{
  //code
})

we intiate the server using createServer by assing it to a variable, 
We should also host the server by using variableName.listen(portno, 'localhost', ()=>{
  //this runs as soon as the server is hosted
})

-After creating the server inside createServer callback has 2 parameters request and respond 
res.end() - returns whatever is specified inside to the server

res.url - shows what url is requested by the user

res.writeHead- shows the type of data responded by the server

if html - res.writeHead(status, {
  'head':'type',
  "content-type":"text/html"
} )
i.e status = 200 for sucess 

for json - res.writeHead(200, {
  "content-type":"application/json"
})

if the head is mentioned properly the server will load up the particular data,


//reading
Inside createServer we loop through the data obj so to add each data dynamically

so we do data.map(ele => callbackfunc(el, template))
ex- for overview
data.map((ele)=>callback(el,overviewTemplate))

We create a placeholders in html which we want to replace dynamically,
ex -{%productName%} all the placeholders are created inside the html files,

Now for overview page 
Inside createServer we write condition for req.url == '/'
If that is true we want to load it with overview page 
so inside the if block i.e - if(condition){
  //
}

Inside callback we regex to identify all the placeholders and replace it with the data's properties,
Now for each element the callback is called all the elements will be stored as an array inside the variable assigned to map
Now we join all those arrays to get the the whole overview page with all the placeholders filled with element data 

after join the array we get an full loaded html page with all the data dynamically added,
this fully loaded page is passed into the res.end(), This loads up the overview page.

URL
Parsing variables through URL
we require url core module 
url core module holds all the properties related to the url

 url.parse(req.url, true)
This converts the url string to javascript object, 
req.url shows the requested url, true is to obtain the query string from url

we destructure the url.parse to get path name and query property into a variable
 
PRODUCT 
For product page
We obtain the particular object of data by passing the query.id as an element accessor in the array 
and we assing that element and the productTemplate to the callback function which replaces all the placeholders
Once that is done whenever we click on particular object in overview page the  path product matches and enters the if block as we have already mentioned the querry parameter in the anchor link that parameter will be taken and will be processed by the callback and all the placeholders will be replaced,



THIS PROJECT IS LITTLE CONFUSING BUT GIVE IT TIME IT WILL SINK IN
*/
