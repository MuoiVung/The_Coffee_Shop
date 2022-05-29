
// document.getElementById("click-description").onclick = function () {
//     document.getElementById("description").style.display = 'block';
//     document.getElementById("click-description").style.color = "#c7a17a"
//     document.getElementById("trademark").style.display = 'none';
//     document.getElementById("review").style.display = 'none';
// };
// document.getElementById("click-trademark").onclick = function () {
//     document.getElementById("trademark").style.display = 'block';
//     document.getElementById("description").style.display = 'none';
//     document.getElementById("review").style.display = 'none';
// };
// document.getElementById("click-review").onclick = function () {
//     document.getElementById("review").style.display = 'block';
//     document.getElementById("description").style.display = 'none';
//     document.getElementById("trademark").style.display = 'none';
// };






// hover search
const shop_item = Array.from(document.querySelectorAll(".products-item"))
const search_input_user = document.getElementById("search-input")


function search_click(e){
    e.preventDefault()
    // ấn hiện key
    shop_item.forEach(function(el){
        let text =  el.innerText.toLowerCase()
        if(text.indexOf(search_input_user.value)>-1){
            el.style.display=""
        }else{
            el.style.display="none"
        }
    })
}

document.getElementById("search-click-shop").addEventListener("submit",search_click)