/**
 * Task client.
 */

'use strict';

/**
 * Initialize a new `Task` client.
 */

function Task(chronos) {
  this.chronos = chronos;
}

/**
 * Update task.
 */

Task.prototype.update = function(options, callback) {
  options = options || {};

  this.chronos._log(['debug', 'tasks', 'update'], options);

  if (!options.id) return callback(new Error('id required'));
  if (!options.hasOwnProperty('statusCode')) {
    return callback(new Error('statusCode required'));
  }

  var req = {
    path: { id: options.id },
    body: { statusCode: options.statusCode },
  };

  this.chronos._put('/task/{id}', req, function(err) {
    if (err) return callback(err);

    callback();
  });
};

/**
 * Kill tasks.
 */

Task.prototype.kill = function(options, callback) {
  options = options || {};

  this.chronos._log(['debug', 'tasks', 'kill'], options);

  if (!options.job) return callback(new Error('job required'));

  var req = {
    path: { job: options.job },
  };

  this.chronos._delete('/task/kill/{job}', req, function(err) {
    if (err) return callback(err);

    callback();
  });
};

/**
 * Module Exports.
 */

exports.Task = Task;