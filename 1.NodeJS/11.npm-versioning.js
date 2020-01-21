/*npm versioning
version: ^1.    10.     11
        major  minor     patch versions
    
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
    
    */
