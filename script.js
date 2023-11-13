function openNav() {
    var sideNav = document.getElementById("mySidenav");
    if (sideNav.style.left === "0px") {
        sideNav.style.left = "-250px";
        document.getElementsByClassName("content")[0].style.marginLeft = "40px";
    } else {
        sideNav.style.left = "0px";
        document.getElementsByClassName("content")[0].style.marginLeft = "250px";
    }
}

