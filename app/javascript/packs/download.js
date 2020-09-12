import { saveAs } from 'file-saver';

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
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("dropdown-show")) {
          openDropdown.classList.remove("dropdown-show");
        }
      }
    }
  });
};

window.downloadAll = function(object) {
  $(document).ready(function() {
    $("#downloadAll").click(function() {
      let FileSaver = require('file-saver');
      let blob = new Blob([JSON.stringify(object, null, 4)], {type: "application/json"});
      FileSaver.saveAs(blob, "allArticles.json");
      // alert("You will be able to download json metadata of all articles");
    })
  });
};

function createNewObject(object, ary) {
  let copiedObject = Object.assign({}, object);

  console.log(ary);
  console.log("Passed object:")
  console.log(object);

  delete copiedObject.total;
  delete copiedObject.page;
  delete copiedObject.pageSize;
  delete copiedObject.next;
  delete copiedObject.last;

  let newResults = [];
  let i;
  for (i = 0; i < ary.length; ++i) {
    newResults.push(object.results[ary[i]]);
  }

  copiedObject.results = newResults;
  return copiedObject;
};

window.downloadVisible = function(object) {
  $(document).ready(function() {
    $("#downloadVisible").click(function() {
      // All --> download all
      // Else:
      let ids = [];
      $('.article[data-clicked="true"]').each(function() {
         ids.push(parseInt(this.id.slice(8,11)));
      });

      if (ids.length == 0) {
        $("#downloadAll").click();
      } else {
        let newObject = createNewObject(object, ids);
        let FileSaver = require('file-saver');
        let blob = new Blob([JSON.stringify(newObject, null, 4)], {type: "application/json"});
        FileSaver.saveAs(blob, "visibleArticles.json");
      }
    })
  });
};

window.downloadKmap = function(object) {
  $(document).ready(function() {
    $("#downloadKmap").click(function() {
      let FileSaver = require('file-saver');
      let blob = new Blob([JSON.stringify(object, null, 4)], {type: "application/json"});
      FileSaver.saveAs(blob, "kmap.json");
    })
  });
};
