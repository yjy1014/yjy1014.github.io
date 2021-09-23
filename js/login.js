// 로그인
document.loginFrm.onsubmit = e => {
    // json에서 js 객체로 변환. 멤버객체배열 memberList에 담음
    const memberList = JSON.parse(localStorage.getItem('memberList')) || [];

    for(let i = 0; i < memberList.length; i++){
        if(userId.value == memberList[i].userId && pwd.value == memberList[i].pwd){
            alert("로그인 성공!")
            return true;
        }
    }
    alert(`아이디 또는 비밀번호가 잘못 입력 되었습니다.
아이디와 비밀번호를 정확히 입력해 주세요.`);
    //폼 초기화
    document.loginFrm.reset();
    return false;
}