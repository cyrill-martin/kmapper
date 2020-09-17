import { saveAs } from 'file-saver';

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
window.showDownloadMenu = function() {
  $(document).ready(function() {
    $(".menu_item").click(function() {
      console.log("hallo");
      $(this).find(".menu_content").toggleClass("menu_content_show");
      // $(".menu_content").toggleClass("menu_content_show");
    })
  });
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  $(document).ready(function() {
    if (!event.target.matches(".menu_item")) {
      let dropdowns = document.getElementsByClassName("menu_content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("menu_content_show")) {
          openDropdown.classList.remove("menu_content_show");
        }
      }
    }
  });
};

function createTimestamp() {
  let now = new Date();
  let timeString = now.getFullYear().toString() 
    + (now.getMonth() +1).toString() 
    + now.getDate().toString() 
    + now.getHours().toString() 
    + now.getMinutes().toString();
  return timeString;
};

window.downloadAll = function(object) {
  $(document).ready(function() {
    $("#download_all").click(function() {
      let timestamp = createTimestamp();
      let FileSaver = require('file-saver');
      let blob = new Blob([JSON.stringify(object, null, 4)], {type: "application/json"});
      FileSaver.saveAs(blob, timestamp + "_all_articles.json");
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
    $("#download_visible").click(function() {
      let ids = [];
      $('.article[data-clicked="true"]').each(function() {
         ids.push(parseInt(this.id.slice(8,11)));
      });

      if (ids.length == 0) {
        $("#download_all").click();
      } else {
        let timestamp = createTimestamp();
        let newObject = createNewObject(object, ids);
        let FileSaver = require('file-saver');
        let blob = new Blob([JSON.stringify(newObject, null, 4)], {type: "application/json"});
        FileSaver.saveAs(blob, timestamp + "_visible_articles.json");
      }
    })
  });
};

window.downloadKmap = function(object) {
  $(document).ready(function() {
    $("#download_kmap").click(function() {
      let timestamp = createTimestamp();
      let FileSaver = require('file-saver');
      let blob = new Blob([JSON.stringify(object, null, 4)], {type: "application/json"});
      FileSaver.saveAs(blob, timestamp + "_kmap.json");
    })
  });
};
