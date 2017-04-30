Contributions are welcome!

To contribute


Please open a ticket describing the changes you want to make
Write a quick set of tests with the goal of finding out when a change will break it for someone who relies on it


Project uses mocha runner and Node's Assert library (run with npm test)


Use JSDoc on all methods and classes and use correct types. This is important for VSCode's hinting.
File a pull request linked to that ticket and indicate what kind of changes were made
Please include some high level documentation on your feature, how to use it and what its benefit is.


Some things to know about this project:


It uses ES2015 and runs on Node v6+ (It may run on older versions but support hasn't been tested)
The npm package itself will contain transpiled ES5 code
Unit testing is encouraged using Mocha