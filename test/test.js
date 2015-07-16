var expect = require("chai").expect;
var mainModule = require("../index.js");

describe("Main Module", function(){
    describe("Add Notifications", function() {
        it("should add notifications", function() {
            expect(mainModule.addNotifications(["Test"])).equal(undefined);
            expect(mainModule.getNotifications().indexOf("Test")).equal(0);
        });
        it("should call observer", function(done) {
            before(function() {
                mainModule.addNotifications(["Test"]);
            });

            mainModule.notificationCenter.subscribe("Test", function() {
                done();
            });

            mainModule.notificationCenter.dispatch("Test");
        });
    });
});