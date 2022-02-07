# EdgeStore Command Line Reference

You can interact with the EdgeStore node using the **Query Commands** and **Data/File Commands**.

## Query Commands

After the EdgeStore node is up and running, you can query the status of the node with the following commands

```shell
cd ~/edge-store-playground

# Query version
./bin/edgestore query version

# Query status
./bin/edgestore query status

# Query peers
./bin/edgestore query peers
```

When you are running a multi-node network on your local computer, you can choose a particular node to interact with by querying against its RPC port with the `EDGESTORERPCENDPOINT` env variable. For example, assuming you are running the multi-node private network following the [steps here](./SETUP.md#launch-a-multi-node-edgestore-private-network), you can query the peers of each node with the following commands. Note that the RPC server of the three nodes are running at 19888, 19889, and 19890 respectively as specified by the `rest.port` config in their `config.yaml` files.

```shell
# Query the peers of the 1st node whose RPC runs at port 19888
EDGESTORERPCENDPOINT=http://127.0.0.1:19888/rpc ./bin/edgestore query peers

# Query the peers of the 2nd node whose RPC runs at port 19889
EDGESTORERPCENDPOINT=http://127.0.0.1:19889/rpc ./bin/edgestore query peers

# Query the peers of the 3rd node whose RPC runs at port 19890
EDGESTORERPCENDPOINT=http://127.0.0.1:19890/rpc ./bin/edgestore query peers
```

## Data and File Commands

The data/file commands allows you to upload/download data to/from the EdgeStore network.

```shell
# Put data (as a string)
./bin/edgestore data put --val="<data string>"

# Get data with the key returned by the previous command
./bin/edgestore data get --key=<key>

# Upload a file or a directory. The directory can have multiple levels. It will be processed recursively.
./bin/edgestore file put --path=<path>

# Retrieve a file or a directory. This will retrieve and reassemble the file/directory. The command returns the path of the reassembled file/directory.
./bin/edgestore file get --key=<key>
```

To interact with a particular node, execute the data commands against its RPC port with the `EDGESTORERPCENDPOINT` env variable. For example, assuming you are running the multi-node private network, you can put the text data string from the 1st node, and then get the data from the 2nd and 3rd node:

```shell
# Upload data to the 1st node whose RPC runs at port 19888 (assuming you are running the multi-node private network)
EDGESTORERPCENDPOINT=http://127.0.0.1:19888/rpc ./bin/edgestore data put --val="Hello World"
# The above command should return the following response
# {
#     "key": "0x022d5ed71ca8f872cc2a3a34976aaad77be8e18ee50268c213abed79e113c618",
#     "success": true
# }

# Retrieve the data from the 2nd node whose RPC runs at port 19889
EDGESTORERPCENDPOINT=http://127.0.0.1:19889/rpc ./bin/edgestore data get --key=0x022d5ed71ca8f872cc2a3a34976aaad77be8e18ee50268c213abed79e113c618
# The above command should return the following response
# {
#     "val": "Hello World"
# }

# Retrieve the data from the 3rd node whose RPC runs at port 19890 
EDGESTORERPCENDPOINT=http://127.0.0.1:19890/rpc ./bin/edgestore data get --key=0x022d5ed71ca8f872cc2a3a34976aaad77be8e18ee50268c213abed79e113c618
# The above command should return the following response
# {
#     "val": "Hello World"
# }
```

In the following example, we upload a file to the EdgeNode network through the first node, and retrieve it from the third node.

```shell
# Upload a directory `data` containing two image files `smiley_explorer.png` and `theta_network.jpg` to the EdgeStore network through the first node
EDGESTORERPCENDPOINT=http://127.0.0.1:19888/rpc ./bin/edgestore file put --path="theta-edge-store-demos/demos/image/data"
# The above command should return the following response
# {
#     "key": "0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4",
#     "relpath": "data",
#     "success": true
# }

# Retrieve the `data` folder along with the two images files from the third node
EDGESTORERPCENDPOINT=http://127.0.0.1:19890/rpc ./bin/edgestore file get --key=0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4
# The above command should return the following response, which means the two image files are downloaded and stored 
# under the `privatenet/multi-node/node3/storage/file_cache/0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4/data` folder
# {
#     "path": "privatenet/multi-node/node3/storage/file_cache/0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4/data"
# }

ls privatenet/multi-node/node3/storage/file_cache/0xdacc9a23035a458f21aa0cb51189d715cb5c43d7ff4c0227cca5c25eeef3d5b4/data
# The above `ls` command should list the following two files
# smiley_explorer.png theta_network.jpg
```

For more examples, please check out the [demos](../demos) we prepared. In addtion to the CLI commands, you can also interact with a EdgeStore node through its RPC and REST APIs. For more details, please check out the [API References](API.md#edgestore-api-reference).
