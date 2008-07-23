/**
 * @author Ryan Johnson <http://saucytiger.com/>
 * @copyright 2008 PersonalGrid Corporation <http://personalgrid.com/>
 * @package LivePipe UI
 * @license MIT
 * @url http://livepipe.net/controls/hotkey/
 * @attribution http://www.quirksmode.org/js/cookies.html
 */

if(typeof(Prototype) == "undefined")
  throw "Cookie requires Prototype to be loaded."
if(typeof(Object.Event) == "undefined")
  throw "Cookie requires Object.Event to be loaded.";

var Cookie = {
  build: function() {
    return $A(arguments).compact().join("; ");
  },
  secondsFromNow: function(seconds) {
    var d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    return d.toGMTString();
  },
  set: function(name,value,seconds){
    Cookie.notify('set',name,value);
    var expiry = seconds ? 'expires=' + Cookie.secondsFromNow(seconds) : null;
    document.cookie = Cookie.build(name + "=" + value, expiry, "path=/");
  },
  get: function(name){
    Cookie.notify('get',name);
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++){
      var c = ca[i];
      while(c.charAt(0) == ' ')
        c = c.substring(1,c.length);
      if(c.indexOf(nameEQ) == 0)
        return c.substring(nameEQ.length,c.length);
    }
    return null;
  },
  unset: function(name){
    Cookie.notify('unset',name);
    Cookie.set(name,'',-1);
  }
};
Object.Event.extend(Cookie);