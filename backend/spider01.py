#coding=utf-8

import requests
import time
import json


def get_info(posturl,referURL,symbol):
    headers={
        "Cookie": "HWWAFSESID=38d4d8e4195fbeeaeb; HWWAFSESTIME=1561898775731; Hm_lvt_3c606e4c5bc6e9ff490f59ae4106beb4=1561898778; _pk_ses.2.cac6=1; _ga=GA1.3.676113398.1561898779; _gid=GA1.3.1341400620.1561898779; Hm_lpvt_3c606e4c5bc6e9ff490f59ae4106beb4=1561900619; _pk_id.2.cac6=df073ea1ce829166.1561898778.1.1561900620.1561898778.; aicoin_session=eyJpdiI6InVBT3NlclA4OXlGM0d1RXl5T3dxWlE9PSIsInZhbHVlIjoiTXkxa3VKNkprODNNRVFlT3d4elVjeEU3T3ZZMkF4N0tLUWxMbys4TkZXclkzR3h4OVZmdWN0SjZoSzFHR1pXMk5KQTZpOXF0dXRrVDJwTndoRXFCUHc9PSIsIm1hYyI6IjI2ZDljYWIwYTAwYjViNmQ4MDcxYjg3ZGQ1YmM2NjYwMTM4MGFkM2NlMDRkMWQ1ZDg1ZWUxOTA0ODY4N2RhMDgifQ%3D%3D; _gat_gtag_UA_108140256_2=1",
        "Host":"www.aicoin.net.cn",
        "Origin":"https://www.aicoin.net.cn",
        "Referer":referURL,
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
    }
    data={
        "symbol":symbol,
        "period":"1440",
        "open_time":"24"
    }
    r=requests.post(posturl,headers=headers,data=data)
    r.encoding=r.apparent_encoding
    json_data=r.json()
    status=json_data["status"]
    if status==200:
        data=json_data["data"]
        kline_data=data["kline_data"]
        return kline_data
    else:
        return None

def parse_info(symbol,data_list):
    latest_data=data_list[-1]
    latest_date=latest_data[0]
    latest_kaipan=latest_data[1]
    latest_shoupan=latest_data[-2]
    latest_zhangfu=-(latest_shoupan-latest_kaipan)*100/latest_kaipan

    date_threedays=data_list[-3][0]
    kaipan_threedays=data_list[-3][1]
    shoupan_threedays=data_list[-3][-2]
    zhangfu_threedays=(latest_shoupan-kaipan_threedays)*100/kaipan_threedays

    date_sevendays = data_list[-7][0]
    kaipan_sevendays = data_list[-7][1]
    shoupan_sevendays = data_list[-7][-2]
    zhangfu_sevendays = (latest_shoupan-kaipan_sevendays)*100 / kaipan_sevendays

    date_month = data_list[-30][0]
    kaipan_month = data_list[-30][1]
    shoupan_month = data_list[-30][-2]
    zhangfu_month = (latest_shoupan-kaipan_month)*100 / kaipan_month

    type=symbol.split(":")[0]

    return (type,latest_zhangfu,zhangfu_threedays,zhangfu_sevendays,zhangfu_month)

def main():
    result=[]
    currency_list=["top/btc","top/usdt","new/btc","new/usdt"]
    for each in currency_list:
        symbol=each.replace("/","")+":huobipro"
        refererURL="https://www.aicoin.net.cn/chart/huobipro_"+each.replace("/","")
        url="https://www.aicoin.net.cn/api/chart/kline/data/period"
        l=parse_info(symbol, get_info(url, refererURL, symbol))
        result.append(l)
    print(result)


if __name__ == '__main__':
    # url="https://www.aicoin.net.cn/api/chart/kline/data/period"
    # refererURL="https://www.aicoin.net.cn/chart/huobipro_atombtc"
    # symbol="atombtc:huobipro"
    # r=[]
    # l=parse_info(symbol,get_info(url,refererURL,symbol))
    # r.append(l)
    # write_to_excel(r)
    main()

