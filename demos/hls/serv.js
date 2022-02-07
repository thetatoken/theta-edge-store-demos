var HLSServer = require('hls-server')
var http = require('http')
 
var fs = require('fs');
var http = require('http');

// http://localhost:8082/api/v1/file?key=0x6f53fee958b163734dffe22270c14eb72348ce99475f197b2020c6738d4b98f1cl&relpath=720&pathonly=true
function getFilesFromNetworkIfNeeded(key, hlsFolder, edgeStorePort) {
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
  //console.log("Serving files from folder:", fileCacheDir + "/" + key + "/" + hlsFolder)
  //console.log("")
  const filePath = fileCacheDir + "/" + key + "/" + hlsFolder + "/" + req.url

  getFilesFromNetworkIfNeeded(key, hlsFolder, edgeStorePort)

  var server = http.createServer()
  var hls = new HLSServer(server, {
    path: '/streams',  // Base URI to output HLS streams
    dir: filePath  // Directory that input files are stored
  })
  server.listen(7001)

  console.log("")
  console.log("HLS server running...")
  console.log("")
  console.log("----------------------------------------------------------------")
  console.log(" Check out the HLS VoD stream at: http://127.0.0.1:7001/streams ")
  console.log("----------------------------------------------------------------")
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
