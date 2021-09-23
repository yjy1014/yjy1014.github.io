var userId = document.getElementById("userId");
var pwd = document.getElementById("pwd");
var pwdCheck = document.getElementById("pwdCheck");
var userName = document.getElementById("userName");
var email = document.getElementById("email");
var birthday = document.getElementById("birthday");
var phone = document.getElementById("phone");
var termsSms = document.getElementById("termsSms");
var termsEmail = document.getElementById("termsEmail");

// 검사 결과
var userIdValid = 0;
var pwdValid = 0;
var pwdCheckValid = 0;
var userNameVaild = 0;
var emailVaild = 0;
var phoneVaild = 0;

// 아이디 검사
// 6~20자의 영문 소문자, 숫자만 사용 가능
userId.addEventListener("blur", e => {
    const regExp = /^[a-z0-9]{6,20}$/g;
    if(!regExp.test(e.target.value)){
        e.target.nextElementSibling.style.display = "block";
        userIdValid = 0;
    }
    else{
        e.target.nextElementSibling.style.display = "none";
        userIdValid = 1;
    }
});

// 아이디 존재여부 검사
userId.addEventListener("blur", e => {
    // parse -> json에서 js object로 변환
    // 로컬스토리지에 memberList 존재하지 않을 경우 배열 생성
    // 존재할 경우 멤버객체배열 memberList변수에 담음
    const memberList = JSON.parse(localStorage.getItem('memberList')) || [];

    e.target.nextElementSibling.nextElementSibling.style.display = "none";

    // 이미 존재하는 아이디인지 검사. 존재한다면 '이미 존재하는 아이디입니다' 출력
    for(let i = 0; i < memberList.length; i++){
        if(userId.value == memberList[i].userId){
            e.target.nextElementSibling.nextElementSibling.style.display = "block";
            userIdValid = 0;
            break;
        }
    }
});


// 비밀번호 검사
// 8~16자의 숫자, 영문자, 특수문자(*!&)를 각 1개 이상 사용
pwd.addEventListener("blur", e => {
    // const regExpArr = [/^.{8,16}$/, /\d/, /[a-zA-Z]/, /[\*!&]/];
    const regExp1 = /^.{8,16}$/;
    const regExp2 = /\d/;
    const regExp3 = /[a-zA-Z]/;
    const regExp4 = /[\*!&]/;
    if(!regExp1.test(e.target.value) || !regExp2.test(e.target.value) || !regExp3.test(e.target.value) || !regExp4.test(e.target.value)){
        e.target.nextElementSibling.style.display = "block";
        pwdValid = 0;
    }
    else{
        e.target.nextElementSibling.style.display = "none";
        pwdValid = 1;
    }
});

// 비밀번호 일치여부
pwdCheck.addEventListener("blur", e => {
    if(pwd.value !== e.target.value){
        e.target.nextElementSibling.style.display = "block";
        pwdCheckValid = 0;
    }
    else{
        e.target.nextElementSibling.style.display = "none";
        pwdCheckValid = 1;
    }
})

// 이름 검사
// 한글2글자 이상만 허용
userName.addEventListener("blur", e => {
    const regExp = /^[가-힣]{2,}$/;
    if(!regExp.test(e.target.value)){
        e.target.nextElementSibling.style.display = "block";
        userNameVaild = 0;
    }
    else{
        e.target.nextElementSibling.style.display = "none";
        userNameVaild = 1;
    }
})

// 이메일 검사
email.addEventListener("blur", e => {
    const regExp1 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regExp2 = /[ㄱ-ㅎ가-힣]/g;
    if(!regExp1.test(e.target.value) || regExp2.test(e.target.value)){
        e.target.nextElementSibling.style.display = "block";
        emailVaild = 0;
    }
    else{
        e.target.nextElementSibling.style.display = "none";
        emailVaild = 1;
    }
})

// 휴대전화 검사
phone.addEventListener("blur", e => {
    const regExp = /^01[0|1|6|7|8|9][0-9]{7,8}$/;
    if(!regExp.test(e.target.value)){
        e.target.nextElementSibling.style.display = "block";
        phoneVaild = 0;
    }
    else{
        e.target.nextElementSibling.style.display = "none";
        phoneVaild = 1;
    }
})

// 제출
document.memberFrm.onsubmit = e => {
    // 제출 전 비밀번호 & 비밀번호 확인 일치여부 검사
    if(pwd.value != pwdCheck.value) {
        pwdCheck.nextElementSibling.style.display = "block";
        return false;
    }
    else if(userIdValid && pwdValid && pwdCheckValid && emailVaild && phoneVaild){
        // 검사 통과

        // 생성자
        function Member(userId, pwd, userName, birthday, email, phone, receiveSms, receiveEmail){
            this.userId = userId;
            this.pwd = pwd;
            this.userName = userName;
            this.birthday = birthday;
            this.email = email;
            this.phone = phone;
            this.receiveSms = receiveSms;
            this.receiveEmail = receiveEmail;
        }

        // localStorage에 저장
        // 멤버 객체 생성
        const member = new Member(userId.value, pwd.value, userName.value, birthday.value, email.value, phone.value, termsSms.checked, termsEmail.checked);
        
         // parse -> json에서 js object로 변환
        // 로컬스토리지에 memberList 존재하지 않을 경우 배열 생성
        // 존재할 경우 멤버객체배열 memberList변수에 담음
        const memberList = JSON.parse(localStorage.getItem('memberList')) || [];

        //멤버객체배열 맨마지막에 멤버객체 추가
        memberList.push(member);

        // memberList json변환 후 저장
        localStorage.setItem('memberList', JSON.stringify(memberList));

        // 회원 가입 완료창 띄우기
        alert("가입 완료!");
        return true;

    }
    else{
        return false;
    }

};
