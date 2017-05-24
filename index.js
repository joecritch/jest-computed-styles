const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const walkDOM = function(node, cb) {
  cb(node);
  node = node.firstChild;
  while (node) {
    walkDOM(node, cb);
    node = node.nextSibling;
  }
};

const prepareDocument = (htmlFile, cssFile) => {
  const html = fs.readFileSync(
    path.normalize(__dirname + '/' + htmlFile),
    'utf8'
  );
  const css = fs.readFileSync(
    path.normalize(__dirname + '/' + cssFile),
    'utf8'
  );
  const { window } = new JSDOM(html);
  const { document } = window;
  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
  return { window, document };
};

const parsePage = (...args) => {
  const results = [];
  const { window, document } = prepareDocument(...args);

  walkDOM(document.body, node => {
    const props = {};
    if (node.nodeType === 1) {
      const computedStyle = window.getComputedStyle(node);
      const styleLength = computedStyle.length;
      for (let i = 0; i < styleLength; i++) {
        const prop = computedStyle[i];
        const val = computedStyle.getPropertyValue(prop);
        props[prop] = val;
      }
      results.push({
        node,
        computedStyle: props,
      });
    }
  });
  return results;
};

module.exports = {
  parsePage,
};
