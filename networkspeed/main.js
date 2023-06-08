const http = require('http');
const { promisify } = require('util');

class SpeedTest {
  constructor(serverUrl = 'http://speedtest.net/speedtest/random350x350.jpg') {
    this.serverUrl = serverUrl;
    this.downloadDataSize = 1024 * 1024 * 10; // 10MB
    this.uploadDataSize = 1024 * 1024 * 5; // 5MB

    this.httpGet = promisify(http.get);
  }

  async startTest() {
    const downloadSpeed = await this.measureDownloadSpeed();
    const uploadSpeed = await this.measureUploadSpeed();

    return {
      downloadSpeed,
      uploadSpeed
    };
  }

  async measureDownloadSpeed() {
    const startTime = Date.now();
    let receivedBytes = 0;

    try {
      const response = await this.httpGet(this.serverUrl);
      response.on('data', chunk => {
        receivedBytes += chunk.length;
      });

      await new Promise(resolve => response.on('end', resolve));
    } catch (error) {
      console.error('Download Speed Test Error:', error);
      return 0;
    }

    const endTime = Date.now();
    const duration = endTime - startTime;
    const downloadSpeed = receivedBytes / (duration / 1000) / 1024; // Kilobytes per second

    return downloadSpeed.toFixed(2);
  }

  async measureUploadSpeed() {
    const startTime = Date.now();

    const uploadData = Buffer.alloc(this.uploadDataSize, 'x');

    try {
      const response = await this.httpGet(this.serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': this.uploadDataSize
        }
      });

      await new Promise((resolve, reject) => {
        response.on('error', reject);
        response.on('end', resolve);
        response.resume();

        response.write(uploadData);
        response.end();
      });
    } catch (error) {
      console.error('Upload Speed Test Error:', error);
      return 0;
    }

    const endTime = Date.now();
    const duration = endTime - startTime;
    const uploadSpeed = this.uploadDataSize / (duration / 1000) / 1024; // Kilobytes per second

    return uploadSpeed.toFixed(2);
  }
}

module.exports = SpeedTest;
