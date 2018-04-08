
// savenote button click
$(document).on("click", "#savenote", function () {
  // Get the id for the article
  var noteId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + noteId,
    data: {
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function (data) {
      $("#noteList").empty();
      for (var i = 0; i < data.notes.length; i++) {
        $("#noteList").append("<li id='" + data.notes[i]._id + "'>" + data.notes[i].body + " " + "<button data-id='" + data.notes[i]._id +
          "' id='deletenote'>Delete</button></li>");
      }
    });
  // Clear the note entry
  $("#bodyinput").val("");
});

// Get notes button click
$(document).on("click", "#notesButton", function () {
  // Clear notes
  $("#notes").empty();

  var articleId = $(this).attr("data-id");
  $("#articleID").text(articleId);
  $.ajax({
    method: "GET",
    url: "/articles/" + articleId
  })
    .done(function (data) {
      $("#notes").append("<p id='articleNotes'></p>");
      if (data.notes) {
        $("#articleNotes").append("<ul id='noteList'>");
        for (var i = 0; i < data.notes.length; i++) {
          $('#noteList').append("<li id='" + data.notes[i]._id + "'>" + data.notes[i].body + " " +
            "<button data-id='" + data.notes[i]._id +
            "' id='deletenote'>Delete</button></li>");
        }
        $('#articleNotes').append("</ul>");
      }
      // Note text to add
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // Submit new note
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
    });
});

// deletenote button click
$(document).on("click", "#deletenote", function () {
  // Get id for the note
  var noteId = $(this).attr("data-id");
  // delete the note
  $.ajax({
    method: "GET",
    url: "/notes/" + noteId,
  })
    .done(function (data) {
      $("#" + data._id).remove();
    });
});