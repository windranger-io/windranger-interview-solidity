import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@openzeppelin/hardhat-upgrades'

/*
 * You need to export an object to set up your config
 * Go to https://hardhat.org/config/ to learn more
 *
 * At time of authoring 0.8.4 was the latest version supported by Hardhat
 */
export default {
    networks: {
        hardhat: {
            chainId: 33133,
            allowUnlimitedContractSize: true,
            loggingEnabled: false
        },
        local: {
            url: 'http://localhost:8545',
            chainId: 33133,
            allowUnlimitedContractSize: true,
            loggingEnabled: true
        }
    },
    solidity: {
        compilers: [
            {
                version: '0.7.6',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            },
            {
                version: '0.8.4',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            }
        ]
    },
    etherscan: {
        apiKey: ''
    }
}
