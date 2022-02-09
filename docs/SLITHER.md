## Solidity Static Analysis (Slither)

We use the Trail of Bits Solidity static analyzer [Slither](https://github.com/crytic/slither).

### Local

#### Install

With Python 3 in your environment, install using the Python package manager `pip3`:

```shell
pip3 install slither-analyzer
```

#### Run

When at the project root, to run and exclude the `node_modules` path:

```shell
slither . --filter-paths "node_modules"
```

Alternatively to run using a `slither.json` config file:

```shell
slither . --config-file slither.json
```

### Docker

The Trail of Bits toolbox image contains a number of applications (including Slither).

#### Install

With Docker in your environment, install the image from DockerHub:

```shell
docker pull trailofbits/eth-security-toolbox
```

#### Run

To start a new container with your local source mounted/accessible within the container:
(replacing <ABSOLUTE_PATH_TO_WORKING_DIRECTORY> with the absolute path to the project working directory)

```shell
docker run -it --mount type=bind,source=<ABSOLUTE_PATH_TO_WORKING_DIRECTORY>,destination=/home/ethsec/test-me trailofbits/eth-security-toolbox
```

The container will automatically start and log you in, with the project code located in `test-me`.
Navigate into the `test-me` directory and run the static analysis:

```shell
cd test-me
slither . --filter-paths "node_modules"
```

Alternatively to run using a `slither.json` config file:

```shell
cd test-me
slither . --config-file slither.json
```
