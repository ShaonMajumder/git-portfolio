# Network Speed Test Package

[![npm version](https://img.shields.io/npm/v/network-speed-test.svg)](https://www.npmjs.com/package/network-speed-test)
[![License](https://img.shields.io/npm/l/network-speed-test.svg)](https://github.com/ShaonMajumder/networkspeed/blob/main/LICENSE)

A network speed test package that allows users to measure their network connection speed, including download and upload speeds. It provides methods to initiate speed tests, calculate average speeds, and offers customization options such as selecting servers and test file sizes.

## Installation

You can install the package using npm:

```bash
npm install network-speed-test
```

## Usage
```bash
const SpeedTest = require('network-speed-test');

const speedTest = new SpeedTest();

speedTest.startTest()
  .then(result => {
    console.log('Speed Test Result:', result);
  })
  .catch(error => {
    console.error('Speed Test Error:', error);
  });
```

# API
new SpeedTest(serverUrl)
Creates a new instance of the SpeedTest class.

serverUrl (optional): The URL of the server to use for the speed test. Defaults to 'http://speedtest.net/speedtest/random350x350.jpg'.
startTest()
Starts the speed test and returns a promise that resolves to the test result.

The test result object has the following properties:

downloadSpeed: The measured download speed in kilobytes per second (KB/s).
uploadSpeed: The measured upload speed in kilobytes per second (KB/s).

# Customization
You can customize the speed test by providing a different serverUrl when creating the SpeedTest instance. This allows you to test against different servers or endpoints.
```bash
const speedTest = new SpeedTest('http://example.com/testfile.jpg');
```

# Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

# License
This package is licensed under the MIT License.