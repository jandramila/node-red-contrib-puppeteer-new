const puppeteer = require('puppeteer')


module.exports = function (RED) {
  function PuppeteerBrowserLaunch (config) {
    RED.nodes.createNode(this, config)
    config.timeout = config.timeout == ""?0:config.timeout
    config.slowMo = config.slowMo == ""?0:config.slowMo
    config.debugport = config.debugport == ""?0:config.debugport 
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        this.status({fill:"green",shape:"dot",text:"Launching..."});
        msg.puppeteer = {browser:await puppeteer.launch( { 
          args: ['--no-sandbox',
        '--disable-setuid-sandbox'],
          timeout: config.timeout, slowMo: config.slowMo, headless: config.headless, debugport: config.debugport, devtools:config.devtools, defaultViewport: null, ignoreHTTPSErrors: true } )}
        msg.puppeteer.page = (await msg.puppeteer.browser.pages())[0]
        this.status({fill:"green",shape:"ring",text:"Launched"});
        this.send(msg)
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        this.error(e)
      } 
    })
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-timeout").val(config.timeout)
      $("#node-input-slowMo").val(config.slowMo)
      $("#node-input-headless").val(config.headless)
      $("#node-input-debugport").val(config.debugport)
      $("#node-input-devtools").val(config.devtools)
      $("#node-input-name").val(config.name)
    }
  }
  RED.nodes.registerType('puppeteer-browser-launch', PuppeteerBrowserLaunch)
}
