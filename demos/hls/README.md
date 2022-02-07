# HLS Stream Storage and Serving

This simple example demonstrates how to upload/retrieve an HLS video stream to/from a local multi-node EdgeStore Network. This illustrates how to use the EdgeStore network as a decentralized content delivery network (dCDN) for HLS video streams.

## Upload and Retrieve Video Files

This sections shows you how to setup a local multi-node EdgeStore network, and then upload a HLS VoD stream to the network through the first node, and playback the stream from the third node.

### Launch a multi-node EdgeStore private network

If you haven't done so, please follow [this guide](../../docs/SETUP.md#edgestore-setup) to setup the EdgeStore environment, and launch a [multi-node network]((../../docs/SETUP.md#launch-a-multi-node-edgestore-private-network)) on your local computer.

### Upload and Playback an HLS video stream

#### Upload the HLS VoD stream

Use the following commands to upload the `demo_stream` HLS video stream, which composed of the `main.m3u8` playlist and a few `.ts` files under the `720` folder. Note that as we specified the 19888 RPC port, the video stream will be uploaded to the network through the first node.

```shell
cd ~/edge-store-playground
EDGESTORERPCENDPOINT=http://127.0.0.1:19888/rpc ./bin/edgestore file put --path="theta-edge-store-demos/demos/hls/data/demo_stream"

# the command should return the following
# {
#     "key": "0xabf21ab7cd613e7b5f1d964234004f459ad06d4a0448e229e21599afe16a914e",
#     "relpath": "demo_stream",
#     "success": true
# }
```

#### Start the HLS server

Now, start the HLS server. Note that the REST server of the 3rd node is running at port 8082, and we thus pass in 8082. This way the HLS server will be able to call the RPC api of the third node to download the HLS video stream from the EdgeStore network.

```shell
cd ~/edge-store-playground/theta-edge-store-demos/demos/hls
node serv.js ../../../privatenet/multi-node/node3/storage/file_cache 0xabf21ab7cd613e7b5f1d964234004f459ad06d4a0448e229e21599afe16a914e demo_stream 8082
```

#### Playback the HLS stream
To playback the HLS stream, first open the following HLS playback tool in a browser:

https://www.hlsplayer.net/

Next, enter this URL `http://127.0.0.1:7001/main.m3u8` in the input box, and press the "Play" button.

## Multi-Node Network over the Internet

To setup a multi-node network over the Internet, simply modify the `p2p.seeds` config in the `config.yaml` file for the nodes. For example, you can deploy three nodes on three different cloud instances. The nodes do not need to be on the same network. For example, you can run one node in GCP, another in AWS, and the third on your local computer. However, you would need to configure the firewall rules properly to allow inbound/outbound traffics on the `p2p.port`, so that the nodes can communicate with each other. Once the firewall rules are set up, you can run the EdgeStore nodes with commands similar to the above. They should be able to connect to each other and forms a unified permanent storage network. In our implementation, each EdgeStore node also caches the popular contents locally. Therefore, the network also acts as a decentralized content delivery network (dCDN) for any type of file.
