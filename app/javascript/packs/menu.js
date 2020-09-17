import { saveAs } from 'file-saver';

window.openDropdown = function() {
  $(document).ready(function() {
    // If a link has a dropdown, add sub menu toggle.
    $("nav ul li a:not(:only-child)").click(function(e) {
      $(this).siblings(".nav-dropdown").toggle();
      // Close one dropdown when selecting another
      $(".nav-dropdown").not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $("html").click(function() {
      $(".nav-dropdown").hide();
    });
    // Toggle open and close nav styles on click
    $("#nav-toggle").click(function() {
      $("nav ul").slideToggle();
    });
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

// window.downloadKmap = function(object) {
//   $(document).ready(function() {
//     $("#download_kmap").click(function() {
//       let timestamp = createTimestamp();
//       let FileSaver = require('file-saver');
//       let blob = new Blob([JSON.stringify(object, null, 4)], {type: "application/json"});
//       FileSaver.saveAs(blob, timestamp + "_kmap.json");
//     })
//   });
// };
