import urllib.request
import helper.directory
import json

def get_yomi(character):
    # convert character to he x unicode
    letter_a = str(character)
    decimal_a = ord(letter_a)
    hex_A = hex(decimal_a)

    # insert into api request format
    request_url = "https://mojikiban.ipa.go.jp/mji/q?UCS=*"
    request_url = request_url.replace('*', hex_A)

    req = urllib.request.Request(request_url)

    with urllib.request.urlopen(req) as res:
        body = json.load(res)

    return body['results'][0]['読み']

print(get_yomi('蛇'))
{'音読み': ['ジャ', 'ダ', 'タ', 'シャ', 'チ', 'イ', 'ヤ', 'ジ'], '訓読み': ['へび']}