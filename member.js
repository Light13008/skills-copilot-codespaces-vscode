function addSkillMember() {
    var skill = document.getElementById("skill").value;
    var member = document.getElementById("member").value;
    var data = {
        skill: skill,
        member: member
    };
    $.ajax({
        type: 'POST',
        url: '/addSkillMember',
        data: data,
        success: function (data) {
            alert(data);
        }
    });
}