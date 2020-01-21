/* Event Driven Architecture
Many modules in nodeJS are instances of events events are emited when certain action is completed, Just like JS DOM 
Event is an object



Event Driven Architecture
1.Event Emitter -- Emits named event events
2.Event Listener -- calls the cb               both 1 & 2 togethere is called observer pattern
3.Attached Callback



ex

Event Emitter
New Request on server 
127.0.0.1:8000

Listener

server.on = ('request', (req,res)=>{
    //cb
    res.end('Hello world')
})

After executeing cb
Hello World



We can create our own instance of the events using event objects
*/

const events = require("events");

const myEvent = new events();

myEvent.on("greet", () => {
  console.log("Hello World");
});
myEvent.emit("greet");

//Practical cases

class greetings extends events {
  constructor() {
    super();
  }
}
const greet = new greetings();

greet.on("greet", () => {
  console.log("Hello People");
});
greet.emit("greet");

//In-built event emitters
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url);

  res.end("Hello World");
});

server.listen("4500", "127.0.0.1", () => {
  console.log("4500... up");
});

/*One event can have multiple listeners */
