// Start - Support direct Mocha run & debug
import 'hardhat'
import '@nomiclabs/hardhat-ethers'
// End - Support direct Mocha run & debug
import chai, {expect} from 'chai'
import {before} from 'mocha'
import {solidity} from 'ethereum-waffle'
import {Tub} from '../typechain-types'
import {deployContract, signer} from './framework/contracts'
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers'
import {successfulTransaction} from './framework/transaction'
import {verifyStoreEvent} from './contract/tub/verify-tub-events'

// Wires up Waffle with Chai
chai.use(solidity)

/*
 * The below comments are only for explaining the test layout.
 *
 * Actual tests do not need them, instead should practice code as documentation.
 */

// Start with the contract name as the top level descriptor
describe('Tub', () => {
    /*
     * Once and before any test, get a handle on the signer and observer
     * (only put variables in before, when their state is not affected by any test)
     */
    before(async () => {
        admin = await signer(0)
        observer = await signer(1)
    })

    // Before each test, deploy a fresh box (clean starting state)
    beforeEach(async () => {
        tub = await deployContract<Tub>('Tub')
    })

    // Inner describes use the name or idea for the function they're unit testing
    describe('store', () => {
        /*
         * Describe 'it', what unit of logic is being tested
         * Keep in mind the full composition of the name: Box > store > value
         */
        it('value', async () => {
            const value = 'An important collection of characters'

            const receipt = await successfulTransaction(tub.store(value))

            verifyStoreEvent(receipt, value)
            expect(await tub.value()).equals(value)
        })

        // Modifier checks contain the flattened and spaced modifier name
        it('only owner', async () => {
            await expect(tub.connect(observer).store('')).to.be.revertedWith(
                'Ownable: caller is not the owner'
            )
        })
    })

    /*
     * Top level IT describes complex interactions
     * Beyond the scope of a single function, closer to a use case flow than UT
     */
    it('owner overwrites initial value, with observer verifying', async () => {
        const valueOne = 'First selection of important characters'
        const receiptOne = await successfulTransaction(
            tub.connect(admin).store(valueOne)
        )

        verifyStoreEvent(receiptOne, valueOne)
        expect(await tub.connect(observer).value()).equals(valueOne)

        // Overwriting the stored value
        const valueTwo =
            'Second selection of important characters, overwriting the first'
        const receiptTwo = await successfulTransaction(
            tub.connect(admin).store(valueTwo)
        )

        verifyStoreEvent(receiptTwo, valueTwo)
        expect(await tub.connect(observer).value()).equals(valueTwo)
    })

    let admin: SignerWithAddress
    let observer: SignerWithAddress
    let tub: Tub
})
