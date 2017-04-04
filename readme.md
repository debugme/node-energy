# Introduction
This application demonstrates an approach to building a business domain agnostic
command interpreter that has been specialised for the energy comparison business domain.

# Architecture
The application is made up of a driver, a processor, commands and formats. These components
are intentionally decoupled from each other. This provides the benefits listed below:
* the driver can decide what commands and formats should form the vocabulary of the processor
* the processor can be used across different business domains with no code change
* the command is simple to reason about as it is stateless and single-purpose
* the format can be easily reused between commands to allow for different possible outputs

## Driver
The purpose of the driver is to provide an entry point into the application.
It creates a processor and finds suitable commands and formats. The commands
and formats are injected into the processor to build the final application.

## Processor
The purpose of the processor is to respond to queries by invoking a handler.
The processor composes command-format pairs into handlers. If a query is made
that can be processed by a handler, that handler delegates the processing of
the query to its command and the formatting of that command's output to its format.

## Command
The purpose of the command is to calculate the answer to a business domain question.
It is highly coupled to the business domain and its specifics. By designing it as a
stateless, functional component, it becomes simple to think about, change and test.

## Format
The purpose of the format is to decide how a value should be displayed. Like the command,
it is a stateless, functional component that is single-purpose in nature. This makes it
simple to understand, modify and write tests for.

# Install Steps
* Install [Node 7.8.0](https://nodejs.org/en/)

# Build Steps
Open up a command line
```
$
```

Install the project dependencies
```
$ npm install
```

# Run Steps

Confirm application works correctly as an executable
```
$ chmod u+x ./bin/comparison
$ diff ./data/expected_output <(./bin/comparison ./data/plans.json < ./data/inputs)
```

Confirm application works correctly as a REPL
```
$ npm start ./data/plans.json
```

# Test Steps
Run the tests
```
$ npm test
```
View the test results in your browser
```
$ open coverage/lcov-report/index.html
```

# Technology Stack
* [Node](https://nodejs.org/en/) - used to write the energy plan comparison engine