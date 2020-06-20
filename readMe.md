## NodeJS

    NodeJS is a javascript runtime built on google's open source v8 engine and libuv and many other dependencies

#### Advantages of NodeJS

    - Single threaded
    - Event driven
    - Non blocking Input/Output model
    - Fast
    - Easy Scalable for dataintensive apps

##### Use

    - API with NoSQL database
    - Streaming

##### Don't use

    - Applications with heavy server side processing

#### REPL (Read Eval Print Loop)

    To enter REPL type node in terminal and hit enter,
    tab twice shows the global variable available in NodeJS
    Obj.(i.e String.) +  tab to view all the global methods of that constructor

#### Modules

    Additional functionalities in node will be saved as modules we can use that by requiring them
        ex- const fs = require('fs') //Opens up file system which gives node access to read and write files

#### Single Thread

    Thread is set of instructions where the code will be executed in the CPU, NodeJS is single threaded which means all the code are in a single thread,
    i.e When one user is using particular functionality the other users must wait for the  user to complete the task since it is single threaded,(i.e exception asynchronous) all the code is in single thread

#### Blocking and Non-Blocking

    Node can execute functionalities with synchronous and asynchronus way

    Synchronus
       In a synchronous way codes will be executed line by line once a particular code is done executing then NodeJS goes on to the next line of code, which also means that code is blocking rest of the code till its execution is complete.

    Asynchronus
        To avoid the blocking of the code we can use asynchronous way,In a asynchronous way a function will be called which does the task in the background and nodeJS continues to execute the rest of the code normally, Once the task is done the function is called which does the task mentioned in function.
        i.e Easy to understand with example
        Thus this functionality dosen't block rest of the code which is called non-blocking I/O model.

#### Server

    To create a sever we must use http module which gives acess to networking functionalities.

    const http = require('http')
    const server = http.createServer((request,response)=>{
        //
    })
    server.listen(PORT, ()=>{
        log(`server up and running PORT)
    })

    request - it is an object which holds all the request parameters
    response - it also an object which is used to respond to the particular request

    Node enters into event loop after creating server, so it dosen't exit the process

#### Routing

    -Implementing different actions for different URL
    request.url -- gives acess to the url by implementing conditionals we can respond to particular url with particular reponse
    ex- if(reques,url === '/home'){
        response.send('Hello World')
    }

    -We have to respond with header so that the browser knows what type of data we are sending

    response.writeHead(statusCode, {
        header-name:'value'
        content-type:'text/html'
    })

#### Own Modules

    We can create a module which performs particular task when required

    ex-
    const myModule = require('/pathToFile')
    In our module file we have to export it as a module

#### npm (node package manager)

    node package manager is an built node functionality which helps us to add 3rd party packages
    npm interface in cmd prompt which comes pre-installed with nodejs helps us to install 3rd party packages from cmd prompt.

    IN CMD PROMPT

npm init - Intitalizes an npm to the project asking necessary info about the project
i.e configuration of the project

Packages
-There are 2 types of packages

##### Simple dependencies

    Dependencies which we will include in our own code the main code depends on these packages
    ex- express
    npm install packageName --save

##### Development dependencies

    Dependencies which are used only while development our code dosen't depend on these packages, not need for production code
    ex-nodemon

    npm install packageName --save-dev

    If we use particular dependencies for all projects instead of installing it everytime we can install it globally
    npm install packageName --global

In in main file while calling require method always follow

- core modules
- 3rd party modules
- own modules

#### npm versioning

    version: ^1.    10.     11
            major   minor   patch versions

    patch versions - to fix bugs
    minor versions - new features but not code breaking changes
    major versions - new big release and maybe code breaking changes


    The below symbol tells the way we want to update the packages
    ^ - all patch and minor releases  //recomended
    ~ - only patch and minor updates  //safest
    * - all the version               //not recomended as it may break the code

    npm outdated
    To see which are the outdated packages present

    npm update packageName
    To update particular package

    npm uninstall packageName
    To uninstall particular package

    npm install packageName@1.0.0(version number)

    So if we have package.json file and we have not installed any packages if we do
    npm install
    It reads all the packages and installs them

##### package.json

    It consitis of all configuration of the project, dependecies and all the details about project
    While sharing the project we shouldn't share node modules files also because those modules can be easily installed by users so we have to share
    package.json and package-lock.json
    package-lock.json - consits of all the dependecies and its dependecies versions.

## Theory

    Theory about  WEB

#### How the web works

    Everytime when we try to get info from browser(i.e client) a request and response takes place between the server and client which is called REQUEST RESPONSE model or CILENT SERVER architecture.


                                        request
          CLIENT        -------------------------------------------------------->    SERVER
        eg-browser
                        <---------------------------------------------------------
                                        response

    Example -
    We are trying to access https://www.google.com/maps

            (Domain Name Server)          real address of server
                    DNS                 https://221.58.211.16:443
                                    protocol | IP address   | port number
        dns lookup  |   |             https   |              | default https:443
                    |   |           or http   |              |  http: 80

                CLIENT


        https://www.google.com/maps
    protocol  | domain name   | resource
    https or  |
    http

    When we try to access https://www.google.com that is not the real address of the google server, The request is made to DNS through our ISP(Internet Service Provider)  DNS is just like a phonebook it matches the domain name with IP address, the request sent by client to DNS is called DNS lookup,
    DNS responds with the real address of the server.

    -Client makes the request to DNS lookup and gets back the real address,


        DNS                         HTTP REQUEST
        (DNS lookup)    ----------------------------------------------------->
                                    TCP/IP socket connection
        CLIENT      --------------------------------------------------------      SERVER
    https://221.58.211.16:443 <-----------------------------------------------
    protocol  |IP address    | port number          HTTP RESPONSE

    After reciving the real address of the server there will be a connection established between client and server known as TCP/IP socket connection
    Connection between server and client and server is kept till we transfer all the files of website

#### Communication Protocol

    System of rules to allow 2 or more party to communicate

    TCP - Transmission Control Protocol
    IP - Internet Protocol
    They both are communication protocols

#### HTTP request (Hyper Text Transfer Protocol)

    Hyper Text Transfer Protocol is also another communication protocol, through which client and server communicates by sending request and response messages

    ex -    GET     /maps HTTP      /1.1            ---> Start line
        HTTP method  request target  HTTP version

        Host:www.google.com
        User-Agent:Mozilla/5.0                      ---> HTTP request headers

        <BODY>                                      ---> In case we are sending data

    Few of the http requests are
    1.GET           to get the data
    2.POST          to send the pata
    3.PUT              to edit
    4.PATCH             the data

#### HTTP response

    HTTP/1.1        200             OK          ----> start line
    http version    status code  status text

    Date: Tue, 31 Dec 2019
    Content-type : text/html                -----> http response header
    Transfer-encoding: chunked

    <BODY>                                   ----> html or json data


    When the client recieves the 1st response after the 1st request it will only be html file, Later all the other CSS, JS files will be requested, For each file new http request for the server,
    There will be multiple request and response at same time

#### TCP/IP socket connection

    Transmission Control Protocol
        Decides how data travel along the website

        TCP breaks all data of request or response into small packets of chunks once it reaches the server or client it assembles to form the original data, this done to speed up the process

        IP Send and route all these packets through internet using ip address on each packet

#### FrontEnd VS BackEnd

    Front End Development
    Everything that happens in browser, desiginig building final website visible to the user

    tech -
    HTML5, CSS3, Javascript, Angular, Redux, React, GraphQL
    All tech forms front end stack

    Back End
    Everything that happens in the webserver

    Server
    Just a computer connect to internet 1st stores files like html, css and images,  runs an http server which can understand urls, requests and delivering responses
    Its called a static server.

    If we want a server to deal with the databases
    Then we have app running which reads databases and respondes with the data dynamically

    Database
    Used to store the data, username password, text to fill up the template etc,

    Create User profile, login, send email handle  payment manipulate data in database

    Tech Used NodeJS and MongoDB
    Back-End-Stack


    Full Stack Both front and backend stack

#### Static Website vs Dynamic Website

- Static
  Simple website contains html,css and js server just reads all these files and responds to the client there is no server side processing

            HTML, CSS  ------------- Browser ------------Screen
             and JS

  ex- jonas.io the content of the page remians all the time you open up that page
  Page can be made dynamic using javascript but that doesn't mean the website is rendered dynamically

- Dynamic  
   Contains a database then app is running which reads the database and fills the template with the data creating a webpage everytime a request is made this is known as server side rendering

  Built on server each time new request comes in

  Database ---- Get Data ------ Build ------ HTML,CSS and ------ Browser ----- Screen ---- Website JS
  Template ----------------------|

  website change all the time based on the data in database
  ex- twiter every time we login we see diff posts as there is new data in the database
