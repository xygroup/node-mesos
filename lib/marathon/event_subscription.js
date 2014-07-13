/**
 * Event subscription client
 */

'use strict';

/**
 * Initialize a new `EventSubscription` client.
 */

function EventSubscription(marathon) {
  this.marathon = marathon;
}

/**
 * Register a callback URL as an event subscriber.
 */

EventSubscription.prototype.register = function(options, callback) {
  if (typeof options === 'string') {
    options = { url: options };
  }

  this.marathon._log(['debug', 'eventSubscriptions', 'register'], options);

  if (!options.url) return callback(new Error('url required'));

  var req = {
    query: { callbackUrl: options.url },
  };

  this.marathon._post('/eventSubscriptions', req, function(err) {
    if (err) return callback(err);

    callback();
  });
};

/**
 * List all event subscriber callback URLs.
 */

EventSubscription.prototype.list = function(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  this.marathon._log(['debug', 'eventSubscriptions', 'list'], options);

  this.marathon._get('/eventSubscriptions', function(err, res) {
    if (err) return callback(err);

    callback(null, res.body.callbackUrls);
  });
};

/**
 * Unregister a callback URL from the event subscribers list.
 */

EventSubscription.prototype.unregister = function(options, callback) {
  if (typeof options === 'string') {
    options = { url: options };
  }

  this.marathon._log(['debug', 'eventSubscriptions', 'unregister'], options);

  if (!options.url) return callback(new Error('url required'));

  var req = {
    query: { callbackUrl: options.url },
  };

  this.marathon._delete('/eventSubscriptions', req, function(err) {
    if (err) return callback(err);

    callback();
  });
};

/**
 * Module Exports.
 */

exports.EventSubscription = EventSubscription;