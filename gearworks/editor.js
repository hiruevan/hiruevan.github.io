// Toggles sidebar (With css animation)
function toggleSideBar() {
    if (document.getElementsByClassName('side-bar-control')[0].textContent === "◀") {
        document.getElementsByClassName('side-bar')[0].classList.add('side-bar-in');
        document.getElementsByClassName('side-bar')[0].classList.remove('side-bar-out');
        document.getElementsByClassName('code-space')[0].classList.add('code-large');
        document.getElementsByClassName('code-space')[0].classList.remove('code-small');
        document.getElementsByClassName('side-bar-control')[0].textContent = "▶";

    } else {
        document.getElementsByClassName('side-bar')[0].classList.add('side-bar-out');
        document.getElementsByClassName('side-bar')[0].classList.remove('side-bar-in');
        document.getElementsByClassName('code-space')[0].classList.add('code-small');
        document.getElementsByClassName('code-space')[0].classList.remove('code-large');
        document.getElementsByClassName('side-bar-control')[0].textContent = "◀";

    }
}

// Text Editor Zoom code
// Coming soon (CSS is done)


// Lines in editor (Credit to stack overflow post https://stackoverflow.com/questions/60106046/how-to-display-row-number-next-to-each-row-on-contenteditable-div)
$(document).ready(function(){
    $('#edit').css('min-height', $('#edit').height());
    $('#edit').html('// Welcome to the Gear Works Editor!');
    var currentHeight = $('#edit').height();
    var lineHeight = currentHeight;
    $('#edit').keyup(function(){
      if($(this).height()!=currentHeight){
        currentHeight = $(this).height();
        var lines = currentHeight/lineHeight;
        $('#nums').html('')
        for (i = 1; i < lines+1; i++) {
          $('#nums').append('<span>'+i+'</span>')
        }
      }
    });
  });
