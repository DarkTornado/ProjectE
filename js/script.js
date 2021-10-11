function download(isJs) {
    location.href = "https://github.com/DarkTornado/ProjectE/blob/master/release/Project%20EA%203.1."+(isJs?"js":"coffee");
}

function gotoGithub() {
    alert("구버전은 깃허브에서 확인이 가능합니다.");
    location.href = "https://github.com/DarkTornado/ProjectE/blob/master/README.md#배포용-버전-목록";
}