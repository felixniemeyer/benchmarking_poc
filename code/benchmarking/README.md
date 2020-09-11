# Benchmarking Demo

Description and guide for computing ranks of inputs with secure MPC.

## Secure ranking protocol

The implementation of the following protocol may be found in `mpc.js`.

Input: arbitrary number of parties P1,...Pn with inputs x1,...xn

## Note on the code

There're 2 approaches based on JIFF template app.

1. With sorting (merge sort) and then matching who’s value where in the sorted list. At the moment this way doesn't support proper ranking when several values being equal. (`computeWithSort`)
2. Direct rank calculation comparing everyone to everyone. (`computeCompare`)

To choose which one to use you need to change function name in `client.js:61`.

## Legal inputs

This instantiation of benchmarking only supports positive integer inputs.

## Running Demo
To run it you need jiff repo pulled in the same directory as this repo. It's because npm module on the public repo is waaaay dated.

0. Getting deps

    ```shell
    npm install
    ```

1. Running a server:
    ```shell
    node server.js
    ```

2. Either open browser based parties by going to *http://localhost:8080/client.html* in the browser, or a node.js party by running
    ```shell
    node party.js <input> [<party count> [<computation_id> [<party id>]]]]'
    ```

3. Running tests: run the following. Note that you *do not* need to have the server running when running the tests; they run the server on their own.
    ```shell
    npm run-script test-demo -- test.js
    ```
## File structure
The demo consists of the following parts:
1. Server script: *server.js*
2. Web Based Party: Made from the following files:
    * *client.html*: UI for the browser.
    * *client.js*: Handlers for UI buttons and input validations.
3. Node.js-Based Party:
    * *party.js*: Main entry point. Parses input from the command line and initializes the computation.
4. The MPC protocol: Implemented in *mpc.js*. This file is used in both the browser and node.js versions of the demo.
5. test.js: mocha unit tests.
6. Documentation:
    * This *README.md* file.

