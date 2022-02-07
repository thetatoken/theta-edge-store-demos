# Theta EdgeStore Demos

The Theta EdgeStore network is aiming to be an append-only, content-addressing, decentralized key/value storage network for the permanent web. It also acts as a decentralized content delivery network (dCDN) for any type of files.

## Setup

Please install the EdgeStore software and setup the environment following the [this guide](./docs/SETUP.md#edgestore-setup).

## Command Line Interface

You can interact with the EdgeStore network with CLI commands. Please check out [this guide](./docs/CLI.md#edgestore-command-line-reference) for more details.

## Demos

We provide a few [demos](./demos) to show case the capabilities of the EdgeStore network.

* [Demo #1](./demos/image): A simple example demonstrating a single node private network for image storage and serving.

* [Demo #2](./demos/mp4): A simple example demonstrating a single node private network for mp4 video file storage and serving.

* [Demo #3](./demos/hls): A simple example demonstrating a multi-node private network for HLS video storage and serving.

* [Demo #4](./demos/website): A full-fledged example showcasing how the EdgeStore network can serve as a permanent storage and a dCDN for Web Apps.

## API References

Please checkout the API references [here](./docs/API.md#edgestore-api-reference). In particular, the [RPC APIs](./docs/API.md#rpc-apis) and [REST APIs](./docs/API.md#rest-apis).
