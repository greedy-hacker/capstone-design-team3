import requests
import json

def string2Json(raw):
    return json.loads(raw)

def error(raw):
    result = string2Json(raw)
    try:
        temp = result["error"]
    except KeyError:
        return True
    return False

def WalletHistory(account):
    #r = requests.get("https://api.blockcypher.com/v1/btc/main/addrs/34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo")
    r = requests.get("https://api.blockcypher.com/v1/btc/main/addrs/"+account+"/full")
    if error(r.text):
        return string2Json(r.text)
    r = requests.get("https://api.blockcypher.com/v1/eth/main/addrs/"+account+"/full")
    if error(r.text):
        return string2Json(r.text)
    r = requests,get("https://api.blockcypher.com/v1/ltc/main/addrs/"+account+"/full")
    if error(r.text):
        return string2Json(r.text)
    r = request.get("https://api.blockcypher.com/v1/doge/main/addrs/"+account+"/full")
    if error(r.text):
        return string2Json(r.text)
    r = request.get("https://api.blockcypher.com/v1/dash/main/addrs/"+account+"/full")
    if error(r.text):
        return string2Json(r.text)
    print(r.text)
    return string2Json(r.text)


result = WalletHistory("39329431fdeaf6dd46Da2495B8f01641b7Fd24C2")
print(result)