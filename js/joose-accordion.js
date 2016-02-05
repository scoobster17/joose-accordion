/*
Joose Accordion Component
@author Phil Gibbins

Depends on Joose.utils
*/

;var joose = window.joose || {};
joose.accordion = (function(js) {
    
    "use strict";

    // set config for accordions
    var config = {
        expandedClass: 'open'
    };

    // accordion constructor
    var Accordion = function(containerId, type) {

        // set the container element
        this.container = document.getElementById(containerId);

        // cancel if no container found
        if (!this.container) return false;

        // store whether this is a single or multi-view accordion, default to single
        this.multiView = type || false;

        // store the accordion triggers
        this.triggers = this.container.querySelectorAll('[aria-controls]');
        this.noOfSections = this.triggers.length;

        // perform initial setup of the accordion
        this.init();

    };

    // set common properties for accordions
    Accordion.prototype = {

        // open or collapse the relevant section
        toggleSection: function(sectionId) {
            
            // get the section to open
            var sectionToOpen = this.container.querySelector('#' + sectionId);

            // if the section exists
            if (sectionToOpen) {

                // close all other open sections if is a single view accordion
                if (!this.multiView) this.collapseAll();

                // open the selected section
                joose.utils.toggleClass(sectionToOpen.previousElementSibling, config.expandedClass);

            }
        },

        // collapse all open sections
        collapseAll: function() {
            var expandedSections = this.container.querySelectorAll('.' + config.expandedClass);
            var noOfExpandedSections = expandedSections.length;
            for (var i=0; i<noOfExpandedSections; i++) {
                joose.utils.removeClass(expandedSections[i], config.expandedClass);
            }
        },

        // bind click event to triggers to open relevant section
        bindEvents: function() {
            for (var i=0; i<this.noOfSections; i++) {
                var accordion = this;
                this.triggers[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    accordion.toggleSection(this.getAttribute('aria-controls'));
                });
            }
        },

        // initialise the accordion
        init: function() {
            // apply data attribute for styling if not already present
            if (!this.container.hasAttribute('data-component')) {
                this.container.setAttribute('data-component', 'accordion');
            };

            // bind events to this accordion
            this.bindEvents();
        }
    };

    // find any instances of accordions on the page, and initialise those found
    var init = function() {

        // make accordion constructor publicly available
        joose.classes.Accordion = Accordion;

        // find all accordions on the page not manually initialised
        var accordions = document.querySelectorAll('[data-component="accordion"]');
        var noOfAccordions = accordions.length;
        
        // if there are accordions we want to initialise them individually
        if (noOfAccordions > 0) {

            for (var i=0; i<noOfAccordions; i++) {

                // get the accordion details
                var accordionId = accordions[i].getAttribute('id');
                var allowMultiView = accordions[i].getAttribute('data-multiView');

                // default the id if none supplied
                if (!accordionId) {
                    accordionId = 'accordion-' + i;
                    accordions[i].setAttribute('id', accordionId);
                }

                // default to single view if no type supplied
                if (!allowMultiView) {
                    allowMultiView = false;
                }

                // convert the type to a boolean
                allowMultiView = (allowMultiView === 'true') ? true : false;

                // record instance of accordion to variable
                joose.accordion[accordionId] = new Accordion(accordionId, allowMultiView);
            }
        }
    };

    return {
        init: init
    }

})(joose);

// initialise accordion functionality
joose.accordion.init();

// remove public method
delete joose.accordion.init;