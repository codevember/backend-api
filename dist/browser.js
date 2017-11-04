'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var firebase = require('firebase');

var Api = function () {
  function Api() {
    _classCallCheck(this, Api);

    this.apiKey = 'apiKey';
    this.authDomain = 'authDomain';
    this.url = 'https://temp.firebaseio.com/';
    this.dbName = 'dbName';
    this.user = undefined;
  }

  _createClass(Api, [{
    key: 'init',
    value: function init(apiKey, authDomain, dbName) {
      this.apiKey = apiKey;
      this.authDomain = authDomain;
      this.url = 'https://' + dbName + '.firebaseio.com/';
      this.dbName = dbName;
      this.user = undefined;

      return this.initFirebase();
    }
  }, {
    key: 'initFirebase',
    value: function initFirebase() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        firebase.initializeApp({
          apiKey: _this.apiKey,
          authDomain: _this.authDomain,
          databaseURL: _this.url
        });

        _this.db = firebase.database();

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            _this.user = user;
          } else {
            _this.user = undefined;
          }

          resolve();
        });
      });
    }
  }, {
    key: 'checkExistence',
    value: function checkExistence(year, link) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.db.ref(year + '/contributions').once('value').then(function (snapshot) {
          var exists = false;

          var testLink = link.replace('https://', 'http://');
          testLink = testLink.replace('/pen/', '/full/');
          testLink = testLink.replace('/details/', '/full/');

          snapshot.forEach(function (data) {
            var dataUrl = data.val().url.replace('https://', 'http://');
            dataUrl = dataUrl.replace('/pen/', '/full/');
            dataUrl = dataUrl.replace('/details/', '/full/');

            if (testLink === dataUrl) {
              exists = true;
            }
          });

          resolve(exists);
        });
      });
    }
  }, {
    key: 'saveContribution',
    value: function saveContribution(value) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (!_this3.user) {
          reject('No user logged.');
          return;
        }

        _this3.checkExistence(value.year, value.url).then(function (exists) {
          if (exists === false) {
            value.slug = _this3.generateSlug(value);
            var newContrib = _this3.db.ref(value.year + '/contributions').push();
            newContrib.set(value);
          }

          resolve();
        });
      });
    }
  }, {
    key: 'generateSlug',
    value: function generateSlug(value) {
      var slug = '';
      var strDay = value.day;
      if (value.day < 10) {
        strDay = '0' + value.day;
      }
      slug += value.year + ' ' + strDay + ' ' + value.title + ' ' + value.author;
      slug = slug.replace(/\s/g, '-').toLowerCase();

      return slug;
    }
  }, {
    key: 'getContributionsOfDay',
    value: function getContributionsOfDay(year, day) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.ref(year + '/contributions').orderByChild('day').equalTo(day).once('value').then(function (snapshot) {
          var contribs = [];
          snapshot.forEach(function (data) {
            contribs.push(data.val());
          });
          resolve(contribs);
        });
      });
    }
  }, {
    key: 'getCurrentUser',
    value: function getCurrentUser() {
      if (this.user) {
        return this.user;
      }

      return firebase.auth().currentUser;
    }
  }, {
    key: 'signin',
    value: function signin(email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }
  }, {
    key: 'signout',
    value: function signout() {
      return firebase.auth().signOut();
    }
  }]);

  return Api;
}();

module.exports = new Api();
