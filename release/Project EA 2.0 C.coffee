###
Project - EA
version 2.0 C
© 2018 Dark Tornado, All rights reserved.
<설명>
 - EA는 '에아'라고 읽습니다.
 - Dark Tornado가 만든 카카오톡 봇 및 Nusty에 내장된 카카오톡 봇을 기준으로 작성된 소스입니다.
<가이드라인>
 - 개발자의 허락 없이 소스 코드 무단 배포 금지. 들키면, 싸대기 퍽퍽.
 - 소스 사용시 원작자를 밝혀주세요.
   ex) 이 봇은 Dark Tornado의 Project - EA 소스를 사용하였습니다.
<라이선스>
 - 이 소스에는 GPL 3.0이 적용되어있습니다.
    <one line to give the program's name and a brief idea of what it does.>
    Project EA Copyright (C) 2018  Dark Tornado
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
###

preChat = [];

BotData = 
    NAME: "EA"
    VERSION: "2.0"
    DEVELOPER: "Dark Tornado" 
    SUPPORT_BOT_TYPE: ["Dark Tornado", "Nusty"]

Bot.say = (msg, replier) -> replier.reply "[EA] " + msg;

Utils.getCurrentWeather = () -> 
    try
        data = Utils.getHtmlFromWeb("https://m.search.naver.com/search.naver?query=날씨")
        data = data.split("전국날씨</strong>")[1].split("<span class=\"date\"")[0].split("특보")[0].replace(/(<([^>]+)>)/g, "")
        data = data.trim().replace(/도씨/g, "℃").split("  ").sort()
        result = ""
        result += data2.trim() + "\n" for data2 in data
        return result.trim()
    catch e
        print "날씨 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber
        "날씨 정보 불러오기 실패\n오류: " + e
Utils.getDustData = () -> 
    try
        data = Utils.getHtmlFromWeb("https://m.search.naver.com/search.naver?query=미세먼지")
        data = data.split("미세먼지</strong>")[1].split("예측영상")[0].replace(/(<([^>]+)>)/g, "")
        data = data.split("단위")[0].trim().split("  ")
        n = 0
        for ccc in data
          cc = ccc.trim().split(" ")
          data[n] = cc[0] + " : " + Utils.dustLevel(Number(cc[1])) + " (" + cc[1] + "μg/m³)"
          n++
        data2 = data.shift()
        data.sort()
        data.unshift(data2)
        return data.join("\n")
    catch e
        print "미세먼지 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber
        "미세먼지 정보 불러오기 실패\n오류: " + e
Utils.dustLevel = (value) -> 
    return "좋음" if value <= 30
    return "보통" if value <= 80
    return "나쁨" if value <= 150
    "매우나쁨"

botOn = on

response = (room, msg, sender, isGroupChat, replier) -> 
    return if preChat[room] is msg
    preChat[room] = msg;
    if msg.indexOf("/ea ") is 0
        data = msg.replace("/ea ", "");
        procCmd room, data, sender, isGroupChat, replier if botOn
    if msg is "/ea on"
        botOn = on;
        Bot.say "에아가 활성화되었습니다", replier
    if msg is "/ea off"
        botOn = off;
        Bot.say "에아가 비활성화되었습니다", replier

procCmd = (room, msg, sender, isGroupChat, r) -> 
    cmd = msg.split(" ")[0]
    data = msg.replace(cmd + " ", "")
    if msg is "help"
        Bot.say "'EA'는 '에아'라고 읽습니다.\n\n<명령어 목록>\n" +
            " /ea 따라하기 [따라할말] : 해당 말을 따라합니다.\n" +
            " /ea 파싱 [url] : 해당 웹페이지의 소스를 긁어옵니다.\n" +
            " /ea 날씨 : 전국 날씨를 띄웁니다.\n" +
            " /ea 호출 : 토스트 메시지를 이용하여 개발자를 부릅니다.\n" +
            " /ea 번역 [언어코드1] [언어코드2] [내용] : 해당 내용을 번역합니다.\n" +
            " /ea 시간 : 현재 시간을 출력합니다.\n" +
            " /ea 날짜 : 현재 날짜를 출력합니다.\n" +
            " /ea 주사위 : 랜덤으로 주사위를 던집니다.\n" +
            " /ea 미세먼지 : 현재 전국 미세먼지 현황을 띄웁니다.\n" +
            " /ea 검색 [내용] : 해당 내용을 검색합니다.\n" +
            " /ea on : 봇을 활성화시킵니다.\n" +
            " /ea off : 봇을 비활성화시킵니다.\n" +
            " /ea info : 봇 정보를 띄웁니다.\n" +
            " /ea help : 도움말을 띄웁니다.", r
    if msg is "info"
        Bot.say "'EA'는 '에아'라고 읽습니다.\n봇 이름 : " + BotData.NAME + "\n버전 : " + BotData.VERSION + "\n제작자 : " + BotData.DEVELOPER + "\n\n원작자 : Dark Tornado\n라이선스 : GPL 3.0", r
    if cmd is "따라하기"
        Bot.say data, r
    if cmd is "파싱"
        result = Utils.getHtmlFromWeb data
        Bot.say "파싱 결과입니다.\n" + result, r
    if msg is "날씨"
        result = Utils.getCurrentWeather()
        Bot.say "현재 날씨입니다.\n" + result, r
    if msg is "호출"
        Utils.toast room + "에서 " + sender + "(이)가 당신을 불렀습니다."
        Bot.say "개발자를 호출하였습니다만, 무시할 가능성도 있습니다?", r
    if cmd is "번역"
        data2 = data.split(" ")
        lang1 = data2[0]
        lang2 = data2[1]
        value = data.replace(lang1 + " " + lang2 + " ", "")
        result = Utils.translate lang1, lang2, value
        Bot.say "번역 결과입니다.\n" + result, r
    if msg is "시간"
        day = new Date()
        Bot.say "지금은 " + day.getHours() + "시 " + day.getMinutes() + "분 " + day.getSeconds() + "초입니다.", r
    if msg is "날짜"
        day = new Date()
        Bot.say "오늘은 " + (day.getMonth() + 1) + "월 " + day.getDate() + "일입니다.", r
    if msg is "주사위"
        icon = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]
        Bot.say icon[Math.floor(Math.random() * 6)], r
    if msg is "미세먼지"
        day = new Date();
        Bot.say "현재 미세먼지 정보입니다.\n" + Utils.getDustData(), r
    if cmd is "검색"
        day = new Date();
        Bot.say "네이버 검색 결과입니다.\nhttps://m.search.naver.com/search.naver?query=" + data.replace(/ /g, "%20"), r
    
