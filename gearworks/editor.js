function toggleSideBar() {
    if (document.getElementsByClassName('side-bar-control')[0].textContent === "◀") {
        document.getElementsByClassName('side-bar')[0].classList.add('side-bar-in');
        document.getElementsByClassName('side-bar')[0].classList.remove('side-bar-out');
        document.getElementsByClassName('side-bar-control')[0].textContent = "▶";

    } else {
        document.getElementsByClassName('side-bar')[0].classList.add('side-bar-out');
        document.getElementsByClassName('side-bar')[0].classList.remove('side-bar-in');
        document.getElementsByClassName('side-bar-control')[0].textContent = "◀";

    }
}
