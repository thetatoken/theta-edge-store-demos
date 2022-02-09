# EdgeStore Setup

This guide provides the instructions to setup Theta EdgeStore and the steps to launch private EdgeStore networks. Note that the binaries we currently provide is just an Alpha preview version with **NO** guarantees. We expect frequent future updates, some of which might **NOT** be backward compatible. Hence, it should **NOT** be used in a production environment. However, we encougage developers to play with it and provide feedback.

### Dowload the EdgeStore demos

Please follow the steps below to download the EdgeStore demos:

```shell
mkdir -p ~/edge-store-playground/bin

# download the demos
cd ~/edge-store-playground
git clone https://github.com/thetatoken/theta-edge-store-demos
```

### Download the EdgeStore binary (Alpha preview)

Please follow the steps below to download the proper EdgeStore binary for your Operating System.

```shell
cd ~/edge-store-playground

# For macOS. Note that we need to grant permission to the binary.
wget -O bin/edgestore https://theta-downloader.s3.amazonaws.com/edgestore/alpha-preview/macos/edgestore
chmod +x bin/edgestore
sudo spctl --add ./bin/edgestore

# For Ubuntu Linux
wget -O bin/edgestore https://theta-downloader.s3.amazonaws.com/edgestore/alpha-preview/linux/edgestore
chmod +x bin/edgestore

# For Windows
wget -O bin/edgestore.exe https://theta-downloader.s3.amazonaws.com/edgestore/alpha-preview/windows/edgestore.exe
```

### Launch a single-node EdgeStore private network

Please follow the steps below to launch a single-node EdgeNode private network.

```shell
cd ~/edge-store-playground
mkdir -p privatenet/single-node

# Copy over the configs. This should copy the `config.yaml` file we prepared to the config folder `privatenet/single-node/node`:
cp -r ./theta-edge-store-demos/configs/single-node/node privatenet/single-node

# Start the edgestore. Its RPC runs at port 19888
./bin/edgestore start --config=./privatenet/single-node/node --password=qwertyuiop

# Open a second terminal to query the node status
cd ~/edge-store-playground
./bin/edgestore query status
```

### Launch a multi-node EdgeStore private network

Before launching the multi-node EdgeNode private network, please make sure to stop the single-node EdgeNode private network with `Ctrl+C` to avoid HTTP/P2P port conflicts. Next, following the commands below to launch the multi-node EdgeNode private network.

```shell
cd ~/edge-store-playground
mkdir -p privatenet/multi-node

# Copy over the `config.yaml` files for the three nodes
cp -r ./theta-edge-store-demos/configs/multi-node/* privatenet/multi-node

# Start the 1st edgestore node in terminal #1. Its RPC runs at port 19888
cd ~/edge-store-playground
./bin/edgestore start --config=./privatenet/multi-node/node1 --password=qwertyuiop

# Start the 2nd edgestore node in terminal #2. Its RPC runs at port 19889
cd ~/edge-store-playground
./bin/edgestore start --config=./privatenet/multi-node/node2 --password=qwertyuiop

# Start the 3rd edgestore node in terminal #3. Its RPC runs at port 19890
cd ~/edge-store-playground
./bin/edgestore start --config=./privatenet/multi-node/node3 --password=qwertyuiop
```

Next, check out the [CLI commands](./CLI.md#edgestore-command-line-reference) with which you can interact with the EdgeStore network.
