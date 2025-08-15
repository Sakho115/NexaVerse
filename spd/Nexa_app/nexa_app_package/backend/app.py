from solana.rpc.api import Client # type: ignore
from solana.publickey import PublicKey # type: ignore
from solana.keypair import Keypair
from solana.transaction import Transaction
from spl.token.instructions import transfer, get_associated_token_address

# Connect to Solana Devnet
client = Client("https://api.devnet.solana.com")

# Replace with your Nexa Coin token address
TOKEN_ADDRESS = PublicKey("7DbWrHcHATbFV1DqMGCuJJ3xDiEiiPfZQk3deEK6PzcL")

def transfer_tokens(sender: Keypair, recipient_pubkey: PublicKey, amount: int):
    # Get the sender's associated token address
    sender_token_account = get_associated_token_address(sender.public_key, TOKEN_ADDRESS)
    
    # Get the recipient's associated token address
    recipient_token_account = get_associated_token_address(recipient_pubkey, TOKEN_ADDRESS)

    # Build the transaction
    txn = Transaction()
    txn.add(
        transfer(
            source=sender_token_account,
            dest=recipient_token_account,
            owner=sender.public_key,
            amount=amount
        )
    )

    # Send the transaction
    response = client.send_transaction(txn, sender)
    return response['result']

def get_balance(wallet_pubkey: PublicKey):
    # Get the associated token address of the wallet
    token_account = get_associated_token_address(wallet_pubkey, TOKEN_ADDRESS)
    
    # Request the balance
    balance = client.get_token_account_balance(token_account)
    return balance['result']['value']['amount']
