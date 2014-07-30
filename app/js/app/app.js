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
  "backbone",

  // Import and compile a HBS template.
  "hbs!app/templates/note",

  // Polyfill JSON for old browsers.
  "json2",
  "backbone.localStorage"
], function (
  $,
  Backbone,
  noteTmpl
) {
  "use strict";
  var console = window.console;

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

  var $note = $("<div><h1>My Notes</h1><div id='note' /></div>");

  var noteModel = notesCollection.at(0);
  var rendered = noteTmpl(noteModel.toJSON());
  $note.append(rendered);

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
      .append($note);
  });
});
