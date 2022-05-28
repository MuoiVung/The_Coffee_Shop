
document.getElementById("click-description").onclick = function () {
    document.getElementById("description").style.display = 'block';
    document.getElementById("click-description").style.color = "#c7a17a"
    document.getElementById("trademark").style.display = 'none';
    document.getElementById("review").style.display = 'none';
};
document.getElementById("click-trademark").onclick = function () {
    document.getElementById("trademark").style.display = 'block';
    document.getElementById("description").style.display = 'none';
    document.getElementById("review").style.display = 'none';
};
document.getElementById("click-review").onclick = function () {
    document.getElementById("review").style.display = 'block';
    document.getElementById("description").style.display = 'none';
    document.getElementById("trademark").style.display = 'none';
};