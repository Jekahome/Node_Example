#!/bin/bash
# sudo apt install jq

if [[ $3 ]];then
tolang='ru-en';
  if [[ $3 = 'ru' ]];then
    tolang='en-ru'
  fi
 echo $( curl  -d "text=$2&lang=$tolang&key=$1" -X  POST https://translate.yandex.net/api/v1.5/tr.json/translate  | jq '.text[0]' )
fi
# {"code":200,"lang":"en-ru","text":["Привет мир"]}