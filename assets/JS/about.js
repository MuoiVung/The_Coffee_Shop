let input_gmail = document.getElementById("input_gmail")
let gmail_user = []


function click_gmail(e){
    e.preventDefault()
    alert("Đã nhận được Gmail của bạn!") 
    gmail_user[gmail_user.length - 1] = input_gmail.value
    console.log(gmail_user[gmail_user.length - 1])
}
// document.addEventListener("keyup",click_gmail)
document.getElementById("form_gmail").addEventListener("submit",click_gmail)