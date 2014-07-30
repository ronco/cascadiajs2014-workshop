// app/js/app/models/note.js
define(['backbone'], function(Backbone){
  var NoteModel = Backbone.Model.extend({
    urlRoot: "/notes", // :id
    defaults: { title: "", text: "*Add Note!*" }
  });
  return NoteModel;
});
