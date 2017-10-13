var page = require('webpage').create();

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36';

page.viewportSize = {
    width: 1400,
    height: 900
};

var webserver = require('webserver');
var server = webserver.create();
var service = server.listen('8080', function(request, response) {
    response.statusCode = 200;
    var url = decodeURIComponent(decodeURIComponent(request.url.replace(/\/(getDom|getImg)\?url=/,'')));
    if(/\/getDom/.test(request.url)){
        page.open(url, function(status) {
            //console.log(page.content)
            response.write(page.content);
            response.close();
        });
    }else if(/\/getImg/.test(request.url)){
        page.open(url, function(status) {
            //response.setHeader('Content-Type','image/png');
            response.write('<!DOCTYPE html><body><img src="data:image/png;base64,'+page.renderBase64('PNG')+'"></body></html>');
            response.close();
        });
    }else{
        response.write('');
        response.close();
    }
});
