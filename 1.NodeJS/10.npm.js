/*npm (node package manager)
To include 3rd party packages into our application we use npm 

npm interface in cmd prompt which comes pre-installed with nodejs helps us to install 3rd party packages from cmd prompt

www.npmjs.com to know about the packages 

IN CMD PROMPT
npm init - Intitalizes an npm to the project asking necessary info about the project
i.e configuration of the project

Packages 
-There are 2 types of packages 
1.simple dependencies
    Dependencies which we will include in our own code the main code depends on these packages
ex- express

npm install packageName --save 



2.development dependencies
    Dependencies which are used only while development our code dosen't depend on these packages, not need for production code
ex-nodemon

npm install packageName --save-dev


If we use particular dependencies for all projects instead of installing it everytime we can install it globally
npm install packageName --global


In in main file while calling require method always follow
1.core modules
2.3rd party modules
3.own modules


package.json
It consitis of all configuration of the project, dependecies and all the details about project
While sharing the project we shouldn't share node modules files also because those modules can be easily installed by users so we have to share
package.json and package-lock.json

package-lock.json - consits of all the dependecies and its dependecies versions.

*/
