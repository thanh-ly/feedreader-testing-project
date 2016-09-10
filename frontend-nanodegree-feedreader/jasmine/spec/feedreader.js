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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('has at least 1 feed', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('Menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggle function works', function() {
        var menuButton = $('.menu-icon-link');
        //clicks and checks the menu is open
        menuButton.click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        //clicks and checks the menu is hidden
        menuButton.click();
        expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         //loads feed
         beforeEach(function(done) {
            loadFeed(0, done);
        });
        //check to see if there is at least 1 feed
        it('contains at least 1 feed', function(){
            expect($('.feed').length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" 
    written with help from JohnMav on this topic on the Udacity forums*/
    describe('New Feed Selection', function(done) {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            // load feeds, caches the first feed's title and then loads the second feed
            loadFeed(0, function() {
                title = $(".feed .entry h2").html();  
                loadFeed(1, function() {
                    done(); 
                });
            });
        });
        it('content title changes betweeen feeds', function(done) {
            // compare feed titles
            expect($(".feed .entry h2").html()).not.toBe(title); 
            done(); 
        }); 

        // restore original state 
        afterAll(function(done) {
            loadFeed(0, done); 
        });
    });

}());


