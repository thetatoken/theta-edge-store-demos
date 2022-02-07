var fs = require('fs');
var http = require('http');

// http://localhost:8080/api/v1/file?key=0x6f53fee958b163734dffe22270c14eb72348ce99475f197b2020c6738d4b98f1cl&relpath=site&pathonly=true
function downloadFilesFromNetworkIfNeeded(key, siteRootFolder, edgeStorePort) {
  const options = {
    hostname: '127.0.0.1',
    port: parseInt(edgeStorePort, 10),
    path: '/api/v1/file?key=' + key + "&relpath=" + siteRootFolder + "&pathonly=true",
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

function startServer(fileCacheDir, siteRootFolder, key, edgeStorePort) {
  //console.log("Serving files from folder:", fileCacheDir + "/" + key + "/" + siteRootFolder)
  //console.log("")

  downloadFilesFromNetworkIfNeeded(key, siteRootFolder, edgeStorePort);

  http.createServer(function (req, res) {
    downloadFilesFromNetworkIfNeeded(key, siteRootFolder, edgeStorePort);

    // Serve the request
    const filePath = fileCacheDir + "/" + key + "/" + siteRootFolder + "/" + req.url

    fs.readFile(filePath, function (err,data) {
      console.log(req.method, req.url);
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }).listen(7001);

  console.log("")
  console.log("Server running...")
  console.log("")
  console.log("------------------------------------------------------------")
  console.log(" Check out the website at: http://127.0.0.1:7001/index.html ")
  console.log("------------------------------------------------------------")
}

//
// __MAIN__
//

if (process.argv && process.argv.length != 6) {
    console.log("Usage:");
    console.log("  node serv.js <path/to/file_cache/dir> <key> <site_root_folder> <edge_store_port>");
    console.log("");
    process.exit(1);
} else {
    fileCacheDir = process.argv[2];
    siteRootFolder = process.argv[3];
    key = process.argv[4];
    edgeStorePort = process.argv[5];
    startServer(fileCacheDir, key, siteRootFolder, edgeStorePort);
}
