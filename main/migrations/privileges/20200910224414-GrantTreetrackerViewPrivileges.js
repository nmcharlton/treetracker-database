'use strict';

var async = require('async');

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  async.series(
    [
      db.runSql.bind(db, 'GRANT SELECT ON active_tree_region TO treetracker')
    ],
    callback
  );
};

exports.down = function(db, callback) {
  async.series(
    [
      db.runSql.bind(db, 'REVOKE ALL PRIVILEGES ON active_tree_region FROM treetracker')
    ],
    callback
  );
};

exports._meta = {
  "version": 1
};
