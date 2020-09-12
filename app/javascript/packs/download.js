/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
window.showDownloadMenu = function() {
  $(document).ready(function() {
    $(".dropbtn").click(function() {
      $(".dropdown-content").toggleClass("dropdown-show");
    })
  });
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  $(document).ready(function() {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("dropdown-show")) {
          openDropdown.classList.remove("dropdown-show");
        }
      }
    }
  });
};

window.downloadAll = function() {
  $(document).ready(function() {
    $("#downloadAll").click(function() {
      alert("You will be able to download json metadata of all articles");
    })
  });
};

window.downloadVisible = function() {
  $(document).ready(function() {
    $("#downloadVisible").click(function() {
      alert("You will be able to download json metadata of the visible articles");
    })
  });
};

window.downloadKmap = function(object) {
  $(document).ready(function() {
    $("#downloadKmap").click(function() {
      alert("You will be able to download the kmap json data");
    })
  });
};
