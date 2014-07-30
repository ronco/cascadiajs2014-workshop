// SKELETON
/**
 * Application.
 *
 * This file is usually the "binding" of all of the individual Backbone.js
 * components into a unified whole. It is also typically *not* unit tested
 * because it has side effects from just running it. So, here is the expected
 * place to also do things like start Backbone.js History, do `$()` DOM
 * manipulation, etc.
 */
define([
  "jquery",
  "underscore",
  "backbone",

  // Import and compile a HBS template.
  "hbs!app/templates/note",
  "hbs!app/templates/notes",

  // Polyfill JSON for old browsers.
  "json2",
  "backbone.localStorage"
], function (
  $,
  _,
  Backbone,
  noteTmpl,
  notesTmpl
) {
  "use strict";

  // --------------------------------------------------------------------------
  // Backbone.js Components.
  // --------------------------------------------------------------------------
  // Let's write a very simple Backbone model, and bind that with a template
  // to a view.

  var NoteModel = Backbone.Model.extend({
    urlRoot: "/notes", // :id
    defaults: { title: "", text: "*Add Note!*" }
  });

  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage("bb-col-demo")
  });

  var notesCollection = new NotesCollection();
  // CLEAR:
  // notesCollection.localStorage._clear();
  // FETCH: notesCollection.fetch({ reset: true });

  // _.each(["Hi", "Hello", "Hola"], function (msg) {
  //   notesCollection.create({ title: msg, text: msg });
  // });
  notesCollection.fetch();

  var $note = $("<div><h1>One Note</h1><div id='note' /></div>");
  var $notes = $("<div><h1>My Notes</h1><div id='notes' /></div>");

  var NoteView = Backbone.View.extend({
    template: noteTmpl,
    el: "#note",
    initialize: function(opts) {
      if (!this.model) {throw new Error("MODEL!!!"); }
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  var NotesView = Backbone.View.extend({
    template: notesTmpl,
    el: "#notes",
    initialize: function(opts) {
      if (!this.collection) {throw new Error("COLLECTION!!!"); }
      this.listenTo(this.collection, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.collection.toJSON()));
    }
  });



  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  // Actually wire up and kick everything off!
  //
  // **Note**: The `app.js` file is usually just comprised of **imports**
  // of the individual Backbone.js components above and the below function
  // on page load.
  $(function() {
    $("body")
      .append($note)
      .append($notes);
    var noteView = new NoteView({
      model: notesCollection.at(0)
    });
    noteView.render();

    var notesView = new NotesView({
      collection: notesCollection
    });
    notesView.render();
  });
});
