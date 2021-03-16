from bit import Key, PrivateKeyTestnet
from bit.network import NetworkAPI, get_fee_cached, satoshi_to_currency_cached
import json

from sys import argv

def get_balance(address):
    
    balance = NetworkAPI.get_balance(address)
    return f'{balance}'

def new_key():

    key = Key()

    key_obj = {
        "WIF": key.to_wif(),
        "address": key.address
    }
    return key_obj

if __name__ == "__main__":

    args = len(argv)
    if args <= 1:
        print(json.dumps(new_key()), end = '')
    else:
        address = argv[1]
        print(get_balance(address), end = '')