var fs = require('fs');
var http = require('http')

// http://localhost:8082/api/v1/file?key=0xabf21ab7cd613e7b5f1d964234004f459ad06d4a0448e229e21599afe16a914e&relpath=demo_stream&pathonly=true
function downloadStreamFromNetworkIfNeeded(key, hlsFolder, edgeStorePort) {
  const options = {
    hostname: '127.0.0.1',
    port: parseInt(edgeStorePort, 10),
    path: '/api/v1/file?key=' + key + "&relpath=" + hlsFolder + "&pathonly=true",
    method: 'GET',
  };

  const req = http.request(options, res => {
    //console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      //process.stdout.write(d);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.end()
}

function startHLSServer(fileCacheDir, hlsFolder, key, edgeStorePort) {
  downloadStreamFromNetworkIfNeeded(key, hlsFolder, edgeStorePort)
  const hlsRootPath = fileCacheDir + "/" + key + "/" + hlsFolder

  console.log("Serving HLS stream from folder:", hlsRootPath)

  http.createServer(function (request, response) {
    var filePath = hlsRootPath + request.url;
    console.log("serving:", filePath)

    fs.readFile(filePath, function(error, content) {
        response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.end(content, 'utf-8');
        }
    });
  }).listen(7001);

  console.log("")
  console.log("HLS server running...")
  console.log("")
  console.log("-------------------------------------------------------------------------------------")
  console.log(" To playback the HLS stream:                                                         ")
  console.log("    1. First open this HLS playback tool in a browser: https://www.hlsplayer.net/    ")
  console.log("    2. Next, enter this URL `http://127.0.0.1:7001/main.m3u8` in the input box, and  ")
  console.log("       press the 'Play' button.                                                      ")
  console.log("-------------------------------------------------------------------------------------")
  console.log("")
}

//
// __MAIN__
//

if (process.argv && process.argv.length != 6) {
  console.log("Usage:");
  console.log("  node serv.js <path/to/file_cache/dir> <key> <hls_folder> <edge_store_port>");
  console.log("");
  process.exit(1);
} else {
  fileCacheDir = process.argv[2];
  hlsFolder = process.argv[3];
  key = process.argv[4];
  edgeStorePort = process.argv[5];
  startHLSServer(fileCacheDir, key, hlsFolder, edgeStorePort);
}
