/**
 */
define(['backbone','app/models/note'], function (Backbone, NoteModel) {
  describe("app/models/note", function () {
    beforeEach(function() {
      this.model = new NoteModel();
    });
    afterEach(function() {
      this.model = null;
    });
    it("should be a backbone model", function() {
      expect(this.model).to.be.an.instanceof(Backbone.Model);
    });
    it("should have expected defaults", function () {
      expect(this.model.get("title")).to.equal("");
      expect(this.model.get("text")).to.equal("*Add Note!*");
    });
    it("can set the title property", function() {
      this.model.set('title', 'new title');
      expect(this.model.get('title')).to.equal('new title');
    });
    it("can set the text property", function() {
      this.model.set('text', 'new text');
      expect(this.model.get('text')).to.equal('new text');
    });
  });
});
