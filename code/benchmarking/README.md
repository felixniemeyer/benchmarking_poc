# Benchmarking Demo

This is an implementation of a multi party computing protocol that informs all participants how they rank among each other regarding a specific metric, while nobody has to make his value public. An example use case would be millionaires figuring out who's richest without telling each other how rich they are.

Input: arbitrary number of parties P1,...Pn with inputs x1,...xn

## Note on the code

We use a library called JIFF for the computation. There are two possible approaches based on JIFF template app.

1. With sorting (merge sort) and then matching who’s value where in the sorted list. At the moment this way doesn't support proper ranking when several values being equal. (`computeWithSort`)
2. Direct rank calculation comparing everyone to everyone. (`computeCompare`)

To choose which one to use you need to change function name in `src/client.vue`.

## Valid inputs

This instantiation of benchmarking only supports positive integer inputs.

## Setup
1. Clone the [JIFF repo](https://github.com/multiparty/jiff) in the same directory as this repository. We don't use the jiff module from npm, because it's out of date.

1. Install dependencies
	```shell
	npm install
	```

2. Run webpack (only if you want to use the web client) 
	```shell
	npm run webpack-dev
	```
	for development or 
	```shell
	npm run webpack-prod
	```
for production

## Manual walkthrough

1. Run a server:
	```shell
	node server.js
	```
2. Per Participant you either 
	1. Open a web client: *http://localhost:8080/* in the browser or
	2. Use the `party.js` script by running
		```shell
		node party.js <input> [<party count> [<computation_id> [<party id>]]]
		```

## Testing 
```shell
npm test
```
Note that you *do not* need to have the server running when running the tests; they run the server on their own.

## File structure
The demo consists of the following parts:

1. Server script: *server.js*
2. Web Client (Webpack & Vue project):
    * *./src/*: Source files
    * *./dist/*: index.html and the webpacked *main.js* 
3. Node.js-Based Party:
    * *party.js*: Parses input from the command line and initializes the computation.
4. The MPC protocol: Implemented in *mpc.js*. This file is used by both the web client and `party.js`.
5. test.js: mocha unit tests.
6. Documentation:
    * This *README.md* file.

