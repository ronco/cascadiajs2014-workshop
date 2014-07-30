define(["backbone", "app/models/note", "backbone.localStorage"], function(Backbone, NoteModel){
  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage("bb-col-demo")
  });
  return NotesCollection;
});
