from flask import Blueprint, request, jsonify
from solana.keypair import Keypair # type: ignore
from solana.publickey import PublicKey
from nexa_coin_module import transfer_tokens, get_balance  # Import functions from renamed module

nexa_coin_bp = Blueprint('nexa_coin', __name__)

@nexa_coin_bp.route('/balance', methods=['GET'])
def balance():
    public_key = request.args.get('public_key')
    wallet_pubkey = PublicKey(public_key)
    
    balance = get_balance(wallet_pubkey)
    return jsonify({'balance': balance})

@nexa_coin_bp.route('/transfer', methods=['POST'])
def transfer():
    sender_key = request.json.get('sender_key')
    recipient_key = request.json.get('recipient_key')
    amount = request.json.get('amount')
    
    # Convert sender_key from list of ints or base58 string to bytes for Keypair
    if isinstance(sender_key, list):
        sender_bytes = bytes(sender_key)
    else:
        # Assuming base58 string
        import base58
        sender_bytes = base58.b58decode(sender_key)
    sender = Keypair.from_secret_key(sender_bytes)
    
    recipient_pubkey = PublicKey(recipient_key)
    
    txn_signature = transfer_tokens(sender, recipient_pubkey, amount)
    
    return jsonify({'status': 'success', 'message': 'Transfer successful', 'signature': txn_signature})
