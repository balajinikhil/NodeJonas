/*
Single threaded -
thread is set of instructions where the code will be executed in the CPU, NodeJS is single threaded which means all the code are in a single thread,
i.e When one user is using particular functionality the other users must wait for the  user to complete the task since it is single threaded,(i.e exception asynchronous) all the code is in single thread

Synchronous (i.e Blocking) - 
In a synchronous way codes will be executed line by line once a particular code is done executing then NodeJS goes on to the next line of code, which also means that code is blocking rest of the code till its execution is complete

Asynchronous (i.e Non-Blocking)-
To avoid the blocking of the code we can use asynchronous way,In a asynchronous way a function will be called which does the task in the background and nodeJS continues to execute the rest of the code normally, Once the task is done the function is called which does the task mentioned in function 
i.e Easy to understand with example
Thus this functionality dosen't block rest of the code which is called non-blocking I/O model

Callback Hell - 
Using of asynchronous functions leads to multiple callback functions which in-turn will have multiple callbacks this way of writing the code becomes difficult to read and debug to overcome this we can use Promises or Async await


ex- fs.readFile('path' , 'char-encoding' callback()=>{
    fs.writeFile('path', file, callback()=>{
        //callback hell
    })
})


*/

console.log("Theory");
