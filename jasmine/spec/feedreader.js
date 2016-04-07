/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* First Test Suite
    */
    describe('RSS Feeds', function() {
        /* Testeto make sure that the allFeeds variable has been 
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not 
         * empty.
         */
        it('have non-empty URLs', function() {
            for (var i=0; i < allFeeds.length; i++) {
                expect(allFeeds[0].url).toBeDefined();
                expect(allFeeds[0].url.length).not.toBe(0);
            }
        });


        /* Test that loops through each feed in the allFeeds object 
         * and ensures it has a name defined and that the name is 
         * not empty.
         */
        it('have non-empty Names', function() {
            for (var i=0; i < allFeeds.length; i++) {
                expect(allFeeds[0].name).toBeDefined();
                expect(allFeeds[0].name.length).not.toBe(0);
            }
        });

    });

    /* Second Test Suite
    */
    describe('The menu', function() {
        /* Test that ensures the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

         /* Test that ensures the menu changes visibility when the 
          * menu icon is clicked. This test has two 
          * expectations: does the menu display when clicked and 
          * does it hide when clicked again.
          */
        it('changes when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($("body").hasClass("menu-hidden")).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });

    /* Third Test Suite
    */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed function is called and 
         * completes its work, there is at least a single .entry element 
         * within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('have at least one entry', function(done) {
            expect($('.feed').length).toBeGreaterThan(0);
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Fourth Test Suite
    */
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded by the loadFeed 
         * function that the content actually changes.
         */

        var contentOne;
        var contentTwo;

        beforeEach(function(done) {
            loadFeed(0, function() {
                contentOne = $('.header-title').html();
                loadFeed(1, done);
            });
        });

        it('has new content', function(done) {
            contentTwo = $('.header-title').html();
            expect(contentOne).not.toBe(contentTwo);
            done();
        });

    });

}());
