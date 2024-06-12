/* globals MathJax, console */

var H5P = H5P || {};

/** @namespace H5P */
H5P.MathDisplay = (function () {
  'use strict';
  /**
   * Constructor.
   */
  function MathDisplay() {
    var that = this;

    this.isReady = false;
    this.mathjax = undefined;
    this.observer = undefined;
    this.updating = null;
    this.mathHasBeenAdded = false;

    // Initialize event inheritance
    H5P.EventDispatcher.call(that);

    /*
     * Initialize MathDisplay if document has loaded and thus H5PIntegration is set.
     * It might be faster to start loading MathJax/the renderer earlier, but in that
     * case we need a mechanism to detect the availability of H5PIntegration for
     * getting the source.
     */
    H5P.jQuery(document).ready(initialize);

    /**
     * Initialize MathDisplay with settings that host may have set in ENV
     */
    function initialize() {
      // Get settings from host
      that.settings = H5P.getLibraryConfig('H5P.MathDisplay');

      // Set default observers if none configured. Will need tweaking.
      if (!that.settings.observers || that.settings.observers.length === 0) {
        that.settings = that.extend({
          observers: [
            {name: 'mutationObserver', params: {cooldown: 500}},
            {name: 'domChangedListener'},
            //{name: 'interval', params: {time: 1000}},
          ]
        }, that.settings);
      }

      // Set MathJax using CDN as default if no config given.
      if (!that.settings.renderer || Object.keys(that.settings.renderer).length === 0) {
        that.settings = that.extend({
          renderer: {
            // See http://docs.mathjax.org/en/latest/options/index.html for options
            mathjax: {
              src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js',
              config: {
                extensions: ['tex2jax.js'],
                showMathMenu: false,
                jax: ['input/TeX','output/HTML-CSS'],
                tex2jax: {
                  // Important, otherwise MathJax will be rendered inside CKEditor
                  ignoreClass: "ckeditor"
                },
                messageStyle: 'none'
              }
            }
          }
        }, that.settings);
      }

      if (that.settings.parent !== undefined) {
        console.error('Beep bop! This was disabled since no one knew what it was actually used for @ H5P.MathDisplay');
      }

      // If h5p-container is not set, we're in an editor that may still be loading, hence document
      that.container = that.settings.container || document.getElementsByClassName('h5p-container')[0] || document;

      if (that.settings.renderer.mathjax) {
        // Load MathJax dynamically
        getMathJax(that.settings.renderer.mathjax, function (mathjax) {
          if (mathjax === undefined) {
            console.warn('Could not load Mathjax');
            return;
          }

          that.mathjax = mathjax; // TODO: How do we know this is the right one? Is this there any reason for having this? AFAIK there can only be one loaded and used per page.
          startObservers(that.settings.observers);

          // MathDisplay is ready
          that.isReady = true;

          // Update math content and resize
          that.update(that.container);
        });
      }
    }

    /**
     * Start observers.
     *
     * @param {object[]} observers - Observers to be used.
     */
    function startObservers(observers) {
      // Start observers
      observers.forEach(function (observer) {
        switch (observer.name) {
          case 'mutationObserver':
            that.startMutationObserver(observer.params);
            break;
          case 'domChangedListener':
            that.startDOMChangedListener(observer.params);
            break;
          case 'interval':
            that.startIntervalUpdater(observer.params);
            break;
        }
      });
    }

    /**
     * Get MathJax if available.
     *
     * For MathJax in-line-configuration options cmp.
     * https://docs.mathjax.org/en/latest/configuration.html#using-in-line-configuration-options
     *
     * @param {object} settings - MathJax in-line configuration options.
     * @param {function} callback - Callback function.
     * @return {function} Callback with params {object} mathjax and {string} error.
     */
    function getMathJax(settings, callback) {
      // Add MathJax script to document
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = settings.src;
      script.onerror = callback;
      script.onload = function () {
        var success = (typeof MathJax !== 'undefined');
        if (success) {
          MathJax.Hub.Config(settings.config);
        }
        callback(success ? MathJax: undefined);
      };

      document.body.appendChild(script);
    }
  }

  // Extends the event dispatcher
  MathDisplay.prototype = Object.create(H5P.EventDispatcher.prototype);
  MathDisplay.prototype.constructor = MathDisplay;

  /**
   * Start domChangedListener.
   *
   * @param {object} params - Parameters. Currently not used.
   * @return {boolean} True if observer could be started, else false.
   */
  MathDisplay.prototype.startDOMChangedListener = function () {
    var that = this;
    H5P.externalDispatcher.on('domChanged', function (event) {
      that.update(event.data.$target[0]);
    });
    return true;
  };

  /**
   * Start interval updater.
   *
   * @param {object} params - Parameters.
   * @param {number} params.time - Interval time.
   * @return {boolean} True if observer could be started, else false.
   */
  MathDisplay.prototype.startIntervalUpdater = function (params) {
    var that = this;

    if (!params || !params.time) {
      return false;
    }

    /**
     * Update math display in regular intervals.
     *
     * @param {number} time - Interval time.
     */
    function intervalUpdate(time) {
      setTimeout(function () {
        if (that.mathjax.Hub.queue.running + that.mathjax.Hub.queue.pending === 0) {
          that.update(document);
        }
        intervalUpdate(time);
      }, time);
    }

    intervalUpdate(params.time);

    return true;
  };

  /**
   * Start mutation observer.
   *
   * @param {object} params - Paremeters.
   * @param {number} params.cooldown - Cooldown period.
   * @return {boolean} True if observer could be started, else false.
   */
  MathDisplay.prototype.startMutationObserver = function (params) {
    var that = this;

    if (!this.container) {
      return false;
    }

    this.mutationCoolingPeriod = params.cooldown;

    this.observer = new MutationObserver(function (mutations) {
      if (includesMathJaxAdded(mutations)) {
        // We are only resize the content if MathJax was actually added as
        // constant resizing of the entire content is quite expensive.
        that.mathHasBeenAdded = true;
      }

      // Filter out elements that have nothing to do with the inner HTML.
      // TODO: There is probably a more efficient way of filtering out only
      // the relevant elements. E.g. Sometime we are actually processing the
      // <span> elements added as part of the MathJax formula here...
      mutations
        .filter(function (mutation) {
          return mutation.target.id.indexOf('MathJax') !== 0 &&
            (mutation.target.className.indexOf && mutation.target.className.indexOf('MathJax') !== 0) &&
            mutation.target.tagName !== 'HEAD' &&
            mutation.addedNodes.length > 0;
        })
        .forEach(function (mutation) {
          that.update(mutation.target);
        });
    });

    this.observer.observe(this.container, {childList: true, subtree: true});
    return true;
  };

  /**
   * Update the DOM by MathJax.
   *
   * @param {object[]} [elements] - DOM elements to be updated.
   */
  MathDisplay.prototype.update = function (elements) {
    const self = this;
    if (!this.isReady) {
      return;
    }

    // TODO: There is really no need to call update() until the H5P instance's
    // attach() has finished running.(MathJax should probably attach on an
    // instance level instead of the entire page?)
    // There seems to be a bit of redundant processing going on.

    /**
     * Triggered when MathJax has finished rendering
     */
    const callback = function () {
      if (self.mathHasBeenAdded) {
        self.mathHasBeenAdded = false;
        resizeH5PContent();
      }
    };

    if (this.observer) {
      /*
       * For speed reasons, we only add the elements to MathJax's queue that
       * have been passed by the mutation observer instead of always parsing
       * the complete document. We could always put everything on MathJax's queue
       * and let it work doen the queue, but this can become pretty slow.
       * Instead, we use the cooldown period to ignore further elements.
       * If elements may have been missed, we once update the complete document.
       */
      if (!this.updating) {
        this.mathjax.Hub.Queue(["Typeset", this.mathjax.Hub, elements], callback);
        this.updating = setTimeout(function () {
          self.updating = null;
          if (self.missedUpdates) {
            self.missedUpdates = false;
            self.mathjax.Hub.Queue(["Typeset", self.mathjax.Hub, document], callback); // TODO: Do we need to specify document? I believe the entire pages is the default
          }
        }, this.mutationCoolingPeriod);
      }
      else {
        this.missedUpdates = true;
        // TODO: Should we have kept track of the elements that was missed
        // instead of running the whole document again?
        // Alternatively, always determine the common parent? Could be relevant
        // for the foreach in the MutationObserver callback as well to reduce
        // processing time.
      }
    }
    else {
      // TODO: Determine if this is really needed or used? Most likely it has
      // not been tested in a while and has no way of actually detecting if
      // MathJax did add something and trigger a resize on the content.
      this.mathjax.Hub.Queue(["Typeset", self.mathjax.Hub, elements], callback);
    }
  };

  /**
   * Extend an array just like jQuery's extend.
   * @param {...Object} arguments - Objects to be merged.
   * @return {Object} Merged objects.
   */
  MathDisplay.prototype.extend = function () {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          if (typeof arguments[0][key] === 'object' &&
              typeof arguments[i][key] === 'object') {
            this.extend(arguments[0][key], arguments[i][key]);
          }
          else {
            arguments[0][key] = arguments[i][key];
          }
        }
      }
    }
    return arguments[0];
  };

  /**
   * Help determine if the observed mutations contained any insertion of
   * MathJax formulas.
   *
   * @param {MutationRecord[]} mutations
   * @return {Boolean}
   */
  const includesMathJaxAdded = function (mutations) {
    for (let i = 0; i < mutations.length; i++) {
      for (let j = 0; j < mutations[i].addedNodes.length; j++) {
        const node = mutations[i].addedNodes[j];
        if (node instanceof HTMLElement && (node.classList.contains('MathJax') || node.classList.contains('MathJax_Display'))) {
          return true;
        }
      }
    }

    return false;
  };

  /**
   * Trigger resize of the first H5P content on the page.
   *
   * TODO: Should only resize the content that had MathJax added.
   */
  const resizeH5PContent = function () {
    try {
      H5P.instances[0].trigger('resize');
    }
    catch (e) {
      // Do nothing if it fails
    }
  };

  return MathDisplay;
})();

// Fire up the MathDisplay
new H5P.MathDisplay();
