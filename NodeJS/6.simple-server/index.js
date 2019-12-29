const http = require("http");

/*Server

require('http')
To start a server using we have to improt the http module usning require

variableName = http.createServer((req,res)=>{
    //code
    res.end
})
-This method is a intializer
it has a callback function with 2 parameters
{
req - request object it holds all properties and parameters regarding the request made by the browser

res - respond object which holds all methods and properties to respond to the browser from server

res.end()
-One of the method of response object
writes whatever is specified on the browser
}

MUST assign it to a variable in order to call listen

variableName.listen(PORT, '127.0.0.1' , ()=>{
    callback
})

After intialization to a variable listen method is called, it has 3 arguments
PORT - The portnumber on which the server will be running
127.0.0.1 - the url of the localhost
callback - This will be executed as soon as the listen method is done

So the server will be hosted after using the request method

We can see in comand prompt it dosen't exit after executing the file, This is called event loop


*/

const server = http.createServer((req, res) => {
  res.end(`Hello World from the server ${new Date()}`);
});

server.listen(3000, "127.0.0.1", () => {
  console.log(`server up and running`);
});
