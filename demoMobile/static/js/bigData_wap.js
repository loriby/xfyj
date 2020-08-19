/**
 * Created by songshuang on 2019/12/2.
 */
var _dgt = _dgt || [];
window._dgt = _dgt;
(function () {
    _dgt.push(['enableh5tag']);
    _dgt.push(['setSiteId', '5a74801e30f2b4fc']);
    var d = document, g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript'; g.async = true;
    g.defer = true;
    g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'bigdata-data.artron.net/dgt.js';
    s.parentNode.insertBefore(g, s);
})();