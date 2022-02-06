# EdgeStore API Reference

The EdgeStore node provides two set of APIs, namely, the RPC APIs and the REST APIs. The RPC APIs are mostly for interacting with the EdgeNode, e.g. query node state, upload/retrieve files. The REST APIs are primarily for content serving, e.g. serving a PNG image file or a PDF file. Below we provide the reference for these APIs.

### Table of Contents
1. [RPC APIs](#rpc-apis)
    1.1 [GetVersion](#getversion)
2. [REST APIs](#rest-apis)

## RPC APIs

We can interact with the EdgeStore node through its RPC API. The RPC server runs at port 19888 by default. It can be changes through the `rpc.port` config in the `config.yaml` file.

### GetVersion

This API returns the version of the EdgeStore node.

**method**: edgestore.GetVersion

**returns**: the version, git commit hash, and build time of the EdgeStore node.

#### Example

```shell
# Request
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"edgestore.GetVersion","params":[],"id":1}' http://localhost:19888/rpc

# Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"version": "0.0.1",
		"git_hash": "cf19ef60221f4b4ca70c9c2b55e6682930deb1ea",
		"timestamp": "Sun Feb  6 19:59:07 UTC 2022"
	}
}
```

### GetStatus

This API returns the status of the EdgeStore node.

**method**: edgestore.GetStatus

**returns**: the status of the EdgeStore node, including its ID.

#### Example

```shell
# Request
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"edgestore.GetStatus","params":[],"id":1}' http://localhost:19888/rpc

# Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"id": "0x3181485069e7f93f1EF83cA6F58dD07318291179",
		"current_time": "1644180133"
	}
}
```

### GetPeers

This API returns the peers of the EdgeStore node.

**method**: edgestore.GetPeers

**returns**: the IDs of the peers the EdgeStore node is currently connected to.

#### Example

```shell
# Request
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"edgestore.GetPeers","params":[],"id":1}' http://localhost:19888/rpc

# Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"peers": ["0x018132E076089494861983ba5df4D89450a6b9cF", "0xD1a42E20b586784FC04587eB96c7249C03d68DDa"]
	}
}
```

### PutData

This API allows a user to upload data (as a text string) to the EdgeStore network. The API returns the key for data retrieval.

**method**: edgestore.PutData

**returns**: the key for retrieving the uploaded data

#### Example

```shell
# Request: put data as a text string
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"edgestore.PutData","params":[{"val": "Hello World"}],"id":1}' http://localhost:19888/rpc

# Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"key": "0x022d5ed71ca8f872cc2a3a34976aaad77be8e18ee50268c213abed79e113c618",
		"success": true
	}
}
```

### GetData

This API allows a user retrieve the text data with the key.

**method**: edgestore.GetData

**returns**: the uploaded text data associated with the key

```shell
# Request: get data with the key returned by PutData
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"edgestore.GetData","params":[{"key": "0x022d5ed71ca8f872cc2a3a34976aaad77be8e18ee50268c213abed79e113c618"}],"id":1}' http://localhost:19888/rpc

# Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"val": "Hello World"
	}
}
```

### PutFile

This API allows a user to upload a file or a directory the EdgeStore network. The API returns the key for the file/directory retrieval. Note that the directory to be uploaded can have multiple levels of sub-directories. It will be processed recursively.

**method**: edgestore.PutFile

**returns**: the key for retrieving the uploaded data

#### Example 1: Upload a file

```shell
# Request: upload a file
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"edgestore.PutFile","params":[{"path": "image/data/smiley_explorer.png"}],"id":1}' http://localhost:19888/rpc

# Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"key": "0xbc0383809da9fb98c5755e3fa4f19f4ebc7e34308ab321246e4bb54e548fad04",
		"relpath": "smiley_explorer.png",
		"success": true
	}
}
```

#### Example 2: Upload a directory with files (or even subdirectories) under it

```shell
# Request: upload a directory of files. The directory can have multiple levels of sub-directories. It will be processed recursively.
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"edgestore.PutFile","params":[{"path": "image/data"}],"id":1}' http://localhost:19888/rpc

# Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"key": "0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4",
		"relpath": "data",
		"success": true
	}
}
```

### GetFile

This API allows a user retrieve the file/directory with the key. The API returns the path of the downloaded file/directory. In the case of directory retrival, this API will fetch and reassemble the directory with all the files and sub-directories underneath it. 

**method**: edgestore.GetFile

**returns**: the uploaded text data associated with the key

#### Example 1: Retrieve a file

```shell
# Rquest: retrieve a file (the smiley_explorer.png file we uploaded earlier)
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"edgestore.GetFile","params":[{"key": "0xbc0383809da9fb98c5755e3fa4f19f4ebc7e34308ab321246e4bb54e548fad04"}],"id":1}' http://localhost:19888/rpc

# Result 
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"path": "../data/edgestore/playground/single-node-network/node/storage/file_cache/0xbc0383809da9fb98c5755e3fa4f19f4ebc7e34308ab321246e4bb54e548fad04/smiley_explorer.png"
	}
}
```

#### Example 2: Retrieve a directory and all the files/sub-directories under it.

```shell
# Retrieve a directory. This will retrieve and reassemble the directory (all the files and sub-directories). The API returns the path of the reassembled directory.
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"edgestore.GetFile","params":[{"key": "0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4"}],"id":1}' http://localhost:19888/rpc

# Result
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"path": "../data/edgestore/playground/single-node-network/node/storage/file_cache/0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4/data"
	}
}
```

## REST APIs

In addition to the RPC server, the EdgeStore also runs an HTTP server to for file serving. The HTTP server runs at port 8080 by default. It can be changes through the `http.port` config in the `config.yaml` file.

### The File API

This API is used for file serving. The file can be retrieved by its key and its relative path.

**method**: GET

**resource**: `file`

**base route**: `api/v1/file`

**query parameters**: `api/v1/file?key=<key>&relpath=<relpath>&pathonly=<true|false>`
- `key`: A string, the key for the file/directory, e.g. `0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4`
- `relpath`: A string, the relative path of the file to be retrieved. If the file was uploaded as an individual file, the `relpath` should be the same as the file name,  e.g. `smiley_explorer.png`. If the file was uploaded as part of a directory, the `relpath` should be the relative path to the file from the directory, e.g., `data/theta_network.jpg`. Please see the examples below for more details.
- `pathonly`: A boolean flag indicating whether to return the path of the file or the file content

**examples**:
- browser link: http://localhost:8080/api/v1/file?key=0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4&relpath=data/theta_network.jpg
- curl command: `curl "http://localhost:8080/api/v1/file?key=0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4&relpath=data/theta_network.jpg&pathonly=true"`
