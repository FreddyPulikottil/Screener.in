"use strict";
jest.disableAutomock();
jest.mock('fetch-on-rest');
var api = require('../../api.js');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Peers = require('../peers.jsx');

describe('Peers tests', function () {
  var peerResults = {
    ratios: [],
    results: []
  };

  afterEach(function() {
    expect(api.getPending()).toEqual([]);
  });

  it('renders a peers table', function() {
    var props = {wid: 22, industry: 'Hi', short_name: 'hi'};
    api.setResponse('/api/company/22/peers/?industry=Hi',
      JSON.stringify(peerResults));
    var peers = TestUtils.renderIntoDocument(
      <Peers {...props} />
    );
    return peers._req.then(() => {
      var dom = ReactDOM.findDOMNode(peers);
      expect(dom.textContent).toContain('Peer Comparison ');
    })
  });
});
