/*
Project - EA
version 3.1
© 2018-2021 Dark Tornado, All rights reserved.
<설명>
 - EA는 '에아'라고 읽습니다.
 - 채팅 자동응답 봇, 메신저봇, 메신저봇R에서 작동한다고 가정하고 만들어진 봇입니다.
<가이드라인>
- 개발자의 허락 없이 소스 코드 무단 배포 금지. 들키면, 싸대기 퍽퍽.
- 소스 사용시 원작자를 밝혀주세요.
  ex) 이 봇은 Dark Tornado의 Project - EA의 소스를 사용하였습니다.
<라이선스>
 - 이 소스에는 GPL 3.0이 적용되어있습니다.
    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) 2018-2021 Dark Tornado
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
    VERSION: "3.0",
    DEVELOPER: "Dark Tornado"
};

const EA = {};
EA.COMPRESS = "\u200b".repeat(1000);
EA.say = function(msg, replier) {
    replier.reply("[EA] " + msg);
};
EA.debug = function(str) {
    try {
        Log.debug(str);
    } catch (e) {
        print(str);
    }
};
EA.toast = function(msg) {
    try {
        Api.UIThread(
            function() {
                var toast = android.widget.Toast.makeText(Api.getContext(), msg, android.widget.Toast.LENGTH_LONG);
                toast.show();
            });
    } catch (e) {
        Utils.toast(msg);
    }
};

Utils.getCurrentWeather = function() {
    try {
        var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨").get();
        data = data.select("div.lcl_lst").get(0).select("a");
        var result = [];
        for (var n = 0; n < data.size(); n++) {
            var dd = data.get(n).select("span");
            result.push(dd.get(0).text() + " : " + dd.get(4).text() + ", " + dd.get(1).text());
        }
        return result.join("\n");
    } catch (e) {
        EA.debug("날씨 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
        return "날씨 정보 불러오기 실패\n오류: " + e;
    }
};
Utils.getDustData = function() {
    try {
        var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=미세먼지").get();
        data = data.select("div.lcl_lst").text();
        data = data.split("미세먼지")[1].trim().split(" ");
        var result = "";
        for (var n = 0; n < data.length; n++) {
            if (n % 2 == 0) result += data[n] + " : ";
            else result += Utils.dustLevel(Number(data[n])) + " (" + data[n] + "μg/m³)\n";
        }
        return result.trim();
    } catch (e) {
        EA.debug("미세먼지 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
        return "미세먼지 정보 불러오기 실패\n오류: " + e;
    }
};
Utils.dustLevel = function(value) {
    if (value <= 30) return "좋음";
    if (value <= 80) return "보통";
    if (value <= 150) return "나쁨";
    return "매우나쁨";
};
Utils.getWeather = function(pos) {
    try {
        var data0 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query="+pos.replace(/ /g, "%20") + "%20날씨").get();
        var data = data0.select("li.today");
        var info = data.select("span.blind");
        var result = "상태 : " + info.get(0).text() + " -> " + info.get(1).text() + "\n";
        result += "온도 : " + data.select("strong.temperature").get(0).ownText().replace("°", "℃ ~").replace("°", "℃") + "\n";
        result += "습도 : " + data0.select("li.type_humidity").select("span.figure_result").text() + "%\n";
        result += "강수확률 : " + data.select("span.weather_percent").text().replace(" ", " -> ") + "\n";
        result += "바람 : " + data0.select("li.type_wind").select("span").text().replace(" ", "").replace(" ", ", ");
        return result;
    } catch (e) {
        return null;
    }
};
Utils.getBitcoinPrice = function() {
     return org.jsoup.Jsoup.connect("https://m.search.daum.net/kakao?w=tot&DA=SH1&q=%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8%20%EC%8B%9C%EC%84%B8%201%EC%9D%BC&rtmaxcoll=EMA").get().select("span.current_stock").get(0).text();
};
Utils.getMapleInfo = function(name) {
    try {
        var data = org.jsoup.Jsoup.connect("https://maple.gg/u/" + name).get().select("div.col-lg-8");
        var info = data.select("li.user-summary-item");
        var lv = info.get(0).text();
        var job = info.get(1).text();
        var pri = info.get(2).text();
        data = data.select("div.col-lg-2");
        var guild = data.select("a").text();
        var rank = data.get(1).select("span").get(0).text();
        var result = "[메이플스토리 캐릭터 정보]\n" +
            "닉네임 : " + name + "\n" +
            "레벨 : " + lv.replace("Lv.", "") + "\n" +
            "직업 : " + job + "\n" +
            pri.replace(" ", " : ") + "\n" +
            "랭크 : " + rank.replace(" 위", "위");
        if (guild += "") result += "\n길드 : " + guild;
        return result;
    } catch (e) {
        return null;
    }
};

var rooms = {};

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    if (preChat[room] == msg) return;
    preChat[room] = msg;
    if (rooms[room]) {
        if (msg.startsWith(".")) msg = msg.replace(".", "/");
        if (msg == "/ea" || msg == "/에아") {
            EA.say("명령어 목록은 '/ea help'로 확인하실 수 있습니다.", replier);
        }
        if (msg.startsWith("/ea ")) {
            procCmd(room, msg.replace("/ea ", ""), sender, isGroupChat, replier);
        }
    }
    if (msg == "/ea on" && !rooms[room]) {
        rooms[room] = true;
        EA.say("에아가 활성화되었습니다.", replier);
    }
    if (msg == "/ea off" && rooms[room]) {
        rooms[room] = false;
        EA.say("에아가 비활성화되었습니다.", replier);
    }

}

function procCmd(room, msg, sender, isGroupChat, r) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if (msg == "help") {
        EA.say("'EA'는 '에아'라고 읽습니다." + EA.COMPRESS + "\n\n<명령어 목록>\n" +
            " /ea 따라하기 [따라할말] : 해당 말을 따라합니다.\n" +
            " /ea 파싱 [url] : 해당 웹페이지의 소스를 긁어옵니다.\n" +
            " /ea 날씨 : 전국 날씨 정보를 띄웁니다.\n" +
            " /ea 날씨 [행정구역] : 해당 지역의 날씨를 불러옵니다.\n" +
            " /ea 호출 : 토스트 메시지를 이용하여 개발자를 부릅니다.\n" +
            " /ea 번역 [언어코드1] [언어코드2] [내용] : 해당 내용을 번역합니다.\n" +
            " /ea 시간 : 현재 시간을 출력합니다.\n" +
            " /ea 날짜 : 현재 날짜를 출력합니다.\n" +
            " /ea 주사위 : 랜덤으로 주사위를 던집니다.\n" +
            " /ea 미세먼지 : 현재 전국 미세먼지 현황을 띄웁니다.\n" +
            " /ea 검색 [내용] : 해당 내용을 검색합니다.\n" +
            " /ea 비트코인 : 현재 비트코인 시세를 불러옵니다.\n" +
            " /ea 메이플 [닉네임] : 해당 닉네임을 가진 플레이어의 정보를 불러옵니다.\n" +
            " /ea on : 봇을 활성화시킵니다.\n" +
            " /ea off : 봇을 비활성화시킵니다.\n" +
            " /ea info : 봇 정보를 띄웁니다.\n" +
            " /ea help : 도움말을 띄웁니다.", r);
    }
    if (msg == "info") {
        EA.say("'EA'는 '에아'라고 읽습니다.\n봇 이름 : " + BotData.NAME + "\n버전 : " + BotData.VERSION + "\n제작자 : " + BotData.DEVELOPER + "\n라이선스 : GPL 3.0\n원작자 : Dark Tornado", r);
    }
    if (cmd == "따라하기") {
        EA.say("따라하기 결과 : " + data, r);
    }
    if (cmd == "파싱") {
        var result = Utils.getWebText(data);
        EA.say("파싱 결과입니다.\n" + result, r);
    }
    if (msg == "날씨") {
        var result = Utils.getCurrentWeather();
        EA.say("현재 날씨입니다.\n" + result, r);
    } else if (cmd == "날씨") {
        var result = Utils.getWeather(data);
        if (result == null) EA.say("날씨 정보 불러오기 실패", r);
        else EA.say("[" + data + " 날씨 정보]\n" + result, r);
    }
    if (msg == "호출") {
        EA.toast(room + "에서 " + sender + "(이)가 당신을 불렀습니다.");
        EA.say("개발자를 호출하였습니다.", r);
    }
    if (cmd == "번역") {
        var data2 = data.split(" ");
        var lang1 = data2[0];
        var lang2 = data2[1];
        var value = data.replace(lang1 + " " + lang2 + " ", "");
        var result = Api.papagoTranslate(lang1, lang2, value);
        if (result == null) EA.say("번역 실패", r);
        else EA.say("번역 결과입니다.\n" + result, r);
    }
    if (msg == "시간") {
        var day = new Date();
        EA.say("지금은 " + day.getHours() + "시 " + day.getMinutes() + "분 " + day.getSeconds() + "초입니다.", r);
    }
    if (msg == "날짜") {
        var day = new Date();
        EA.say("오늘은 " + (day.getMonth() + 1) + "월 " + day.getDate() + "일 입니다.", r);
    }
    if (msg == "주사위") {
        var icon = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        EA.say(icon[Math.floor(Math.random() * 6)], r);
    }
    if (msg == "미세먼지") {
        EA.say("현재 미세먼지 정보입니다.\n" + Utils.getDustData(), r);
    }
    if (cmd == "검색") {
        EA.say("네이버 검색 결과입니다.\nhttps://m.search.naver.com/search.naver?query=" + data.replace(/ /g, "%20"), r);
    }
    if (msg == "비트코인") {
        var price = Utils.getBitcoinPrice();
        EA.say("비트코인 시세 : " + price + "원", r);
    }
    if (cmd == "메이플") {
        var result = Utils.getMapleInfo(data);
        if (result == null) EA.say("캐릭터 정보 불러오기 실패", r);
        else EA.say(result + "\nhttps://maple.gg/u/" + data, r);
    }
}
