/*
Project - EA
version 1.0 D
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

*/

const preChat = {};

const BotData = {
    NAME: "EA",
    VERSION: "1.0",
    DEVELOPER: "Dark Tornado",
    SUPPORT_BOT_TYPE: ["Dark Tornado", "Nusty"]
};

Bot.say = function(msg, replier) {
    replier.reply("[EA] " + msg);
};
Bot.toast = function(msg) {
    Api.UIThread(
        function() {
            var toast = android.widget.Toast.makeText(Api.getContext(), msg, android.widget.Toast.LENGTH_LONG);
            toast.show();
        });
}

Utils.getCurrentWeather = function() {
    try {
        var data = Utils.getHtmlFromWeb("https://m.search.naver.com/search.naver?query=날씨");
        data = data.split("전국날씨</strong>")[1].split("<span class=\"date\"")[0].replace(/(<([^>]+)>)/g, "");
        data = data.trim().replace(/도씨/g, "℃").split("  ");
        var result = data[0].trim();
        for (var n = 1; n < data.length; n++) {
            result += data[n].trim() + "\n";
        }
        return result;
    } catch (e) {
        print("날씨 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
        return "날씨 정보 불러오기 실패\n오류: " + e;
    }
};

var botOn = true;

function response(room, msg, sender, isGroupChat, replier) {
    if (preChat[room] == msg) return;
    preChat[room] = msg;
    if (msg.indexOf("/ea ") == 0) {
        var data = msg.replace("/ea ", "");
        if (botOn) procCmd(room, data, sender, isGroupChat, replier);
    }
    if (msg == "/ea on") {
        botOn = true;
        Bot.say("에아가 활성화되었습니다.", replier);
    }
    if (msg == "/ea off") {
        botOn = false;
        Bot.say("에아가 비활성화되었습니다.", replier);
    }

}

function procCmd(room, msg, sender, isGroupChat, r) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (msg == "help") {
        Bot.say("'EA'는 '에아'라고 읽습니다.\n\n<명령어 목록>\n" +
            " /ea 따라하기 [따라할말] : 해당 말을 따라합니다.\n" +
            " /ea 파싱 [url] : 해당 웹페이지의 소스를 긁어옵니다.\n" +
            " /ea 날씨 : 전국 날씨를 띄웁니다.\n" +
            " /ea 호출 : 토스트 메시지를 이용하여 개발자를 부릅니다.\n" +
            " /ea 번역 [언어코드1] [언어코드2] [내용] : 해당 내용을 번역합니다.\n" +
            " /ea 시간 : 현재 시간을 출력합니다.\n" +
            " /ea on : 봇을 활성화시킵니다.\n" +
            " /ea off : 봇을 비활성화시킵니다.\n" +
            " /ea info : 봇 정보를 띄웁니다.\n" +
            " /ea help : 도움말을 띄웁니다.", r);
    }
    if (msg == "info") {
        Bot.say("'EA'는 '에아'라고 읽습니다.\n봇 이름 : " + BotData.NAME + "\n버전 : " + BotData.VERSION + "\n제작자 : " + BotData.DEVELOPER + "\n\n원작자 : Dark Tornado\n라이선스 : GPL 3.0", r);
    }
    if (cmd == "따라하기") {
        Bot.say(data, r);
    }
    if (cmd == "파싱") {
        var result = Utils.getHtmlFromWeb(data);
        Bot.say("파싱 결과입니다.\n" + result, r);
    }
    if (cmd == "날씨") {
        var result = Utils.getCurrentWeather();
        Bot.say("현재 날씨입니다.\n" + result, r);
    }
    if (cmd == "호출") {
        Utils.toast(room + "에서 " + sender + "(이)가 당신을 불렀습니다.");
        Bot.say("개발자를 호출하였습니다만, 무시할 가능성도 있습니다?", r);
    }
    if (cmd == "번역") {
        var data2 = data.split(" ");
        var lang1 = data2[0];
        var lang2 = data2[1];
        var value = data.replace(lang1 + " " + lang2 + " ", "");
        var result = Utils.translate(lang1, lang2, value);
        Bot.say("번역 결과입니다.\n" + result, r);
    }
    if (cmd == "시간") {
        var day = new Date();
        Bot.say("지금은 " + day.getHours() + "시 " + day.getMinutes() + "분 " + day.getSeconds() + "초입니다.", r);
    }

}

