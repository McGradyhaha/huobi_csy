import requests
import time
import json

from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/send_message', methods=['POST'])
def send_message():
    currency_list=request.get_json(force=True)["currency_list"]
    
    result = []
    find = False
    check_list = ["huobipro", "binance", "okex", "gate"]
    for e in currency_list:
        i = 0
        while i < 4:
            print(e,i)
            data = get_info(e, check_list[i])
            if data:
                find = True
                break
            i += 1

        if find:
            l = parse_info(data)
            l["source"] = check_list[i]
            l["name"] = e
            result.append(l)
        else:
            print("not found!")
        
        final_result = {
            "list": result
        }

    return jsonify(final_result)

def get_info(text1, text2):
    posturl="https://www.aicoin.net.cn/api/chart/kline/data/period"
    headers={
        "Cookie": "HWWAFSESID=38d4d8e4195fbeeaeb; HWWAFSESTIME=1561898775731; Hm_lvt_3c606e4c5bc6e9ff490f59ae4106beb4=1561898778; _pk_ses.2.cac6=1; _ga=GA1.3.676113398.1561898779; _gid=GA1.3.1341400620.1561898779; Hm_lpvt_3c606e4c5bc6e9ff490f59ae4106beb4=1561900619; _pk_id.2.cac6=df073ea1ce829166.1561898778.1.1561900620.1561898778.; aicoin_session=eyJpdiI6InVBT3NlclA4OXlGM0d1RXl5T3dxWlE9PSIsInZhbHVlIjoiTXkxa3VKNkprODNNRVFlT3d4elVjeEU3T3ZZMkF4N0tLUWxMbys4TkZXclkzR3h4OVZmdWN0SjZoSzFHR1pXMk5KQTZpOXF0dXRrVDJwTndoRXFCUHc9PSIsIm1hYyI6IjI2ZDljYWIwYTAwYjViNmQ4MDcxYjg3ZGQ1YmM2NjYwMTM4MGFkM2NlMDRkMWQ1ZDg1ZWUxOTA0ODY4N2RhMDgifQ%3D%3D; _gat_gtag_UA_108140256_2=1",
        "Host":"www.aicoin.net.cn",
        "Origin":"https://www.aicoin.net.cn",
        "Referer":"https://www.aicoin.net.cn/chart/" + text2 + "_" + text1.replace("/",""),
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
    }
    data={
        "symbol":text1.replace("/","") + ":" + text2,
        "period":"1440",
        "open_time":"24"
    }
    r = requests.post(posturl,headers=headers,data=data)
    r.encoding = r.apparent_encoding

    raw_data = r.json()

    if raw_data["status"] == 200:
        data = raw_data["data"]["kline_data"]
        return data
    else:
        return None

def parse_info(data_list):
    latest_data=data_list[-1]
    latest_kaipan=latest_data[1]
    latest_shoupan=latest_data[-2]
    latest_zhangfu=-(latest_shoupan-latest_kaipan)*100/latest_kaipan


    kaipan_threedays=data_list[-3][1]
    zhangfu_threedays=(latest_shoupan-kaipan_threedays)*100/kaipan_threedays

    kaipan_sevendays = data_list[-7][1]
    zhangfu_sevendays = (latest_shoupan-kaipan_sevendays)*100 / kaipan_sevendays

    kaipan_month = data_list[-30][1]
    zhangfu_month = (latest_shoupan-kaipan_month)*100 / kaipan_month
  
    list_temp = {
        'latest': latest_zhangfu,
        'three_day': zhangfu_threedays,
        'seven_day': zhangfu_sevendays,
        'month': zhangfu_month
    }

    return list_temp


if __name__ == '__main__':
    app.run()
