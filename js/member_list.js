const showMemberList = () => {
    const memberList = JSON.parse(localStorage.getItem("memberList"));
    const tbody = document.getElementsByTagName("tbody")[0];

    memberList.forEach(function(member, index){
        let tr = `<tr>
<td>${index + 1}</td>
<td>${member.userId}</td>
<td>${member.pwd}</td>
<td>${member.userName}</td>
<td>${member.birthday}</td>
<td>${member.email}</td>
<td>${member.phone}</td>
<td>${member.receiveSms ? "동의" : "미동의"}</td>
<td>${member.receiveEmail ? "동의" : "미동의"}</td>
</tr>`
        // 이후에 순수 자바스크립트로 고쳐보기
        $(tbody).append(tr);
    });
}