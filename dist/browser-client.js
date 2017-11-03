!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(1),a=function(){function e(){r(this,e),this.apiKey="apiKey",this.authDomain="authDomain",this.url="https://temp.firebaseio.com/",this.dbName="dbName",this.user=void 0}return i(e,[{key:"init",value:function(e,t,n){return this.apiKey=e,this.authDomain=t,this.url="https://"+n+".firebaseio.com/",this.dbName=n,this.user=void 0,this.initFirebase()}},{key:"initFirebase",value:function(){var e=this;return new Promise(function(t,n){u.initializeApp({apiKey:e.apiKey,authDomain:e.authDomain,databaseURL:e.url}),e.db=u.database(),u.auth().onAuthStateChanged(function(n){e.user=n||void 0,t()})})}},{key:"checkExistence",value:function(e,t){var n=this;return new Promise(function(r,i){n.db.ref(e+"/contributions").once("value").then(function(e){var n=!1,i=t.replace("https://","http://");e.forEach(function(e){var t=e.val().url.replace("https://","http://");i===t&&(n=!0)}),r(n)})})}},{key:"saveContribution",value:function(e){var t=this;return new Promise(function(n,r){if(!t.user)return void r();t.checkExsitance(e.year,e.url).then(function(r){if(!1===r){e.slug=t.generateSlug(e);t.db.ref(e.year+"/contributions").push().set(e)}n()})})}},{key:"generateSlug",value:function(e){var t="",n=e.day;return e.day<10&&(n="0"+e.day),t+=e.year+" "+n+" "+e.title+" "+e.author,t=t.replace(/\s/g,"-").toLowerCase()}},{key:"getContributionsOfDay",value:function(e,t){var n=this;return new Promise(function(r,i){n.db.ref(e+"/contributions").orderByChild("day").equalTo(t).once("value").then(function(e){var t=[];e.forEach(function(e){t.push(e.val())}),r(t)})})}},{key:"getCurrentUser",value:function(){return this.user?this.user:u.auth().currentUser}},{key:"signin",value:function(e,t){return u.auth().signInWithEmailAndPassword(e,t)}},{key:"signout",value:function(){return u.auth().signOut()}}]),e}();e.exports=new a},function(e,t){e.exports=firebase}]);