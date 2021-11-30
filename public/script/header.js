const navBar = document.querySelector("#navigationBar");

function navigateTo() {
    var navigateTo = navBar.value;
    window.location.assign("/" + `${navigateTo}`)
}