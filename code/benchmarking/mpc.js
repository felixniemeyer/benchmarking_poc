(function (exports, node) {
  var saved_instance;

  /**
   * Connect to the server and initialize the jiff instance
   */
  exports.connect = function (hostname, computation_id, options) {
    var opt = Object.assign({}, options);
    opt.crypto_provider = true;

    if (node) {
      // eslint-disable-next-line no-undef
      JIFFClient = require('../../../jiff/lib/jiff-client');
    }

    // eslint-disable-next-line no-undef
    saved_instance = new JIFFClient(hostname, computation_id, opt);
    return saved_instance;
  };

  /**
   * The MPC computation
   */

  exports.computeWithSort = function (input, jiff_instance) {
    function oddEvenSort(a, lo, n) {
      if (n > 1) {
        var m = Math.floor(n/2);
        oddEvenSort(a, lo, m);
        oddEvenSort(a, lo+m, m);
        oddEvenMerge(a, lo, n, 1);
      }
    }

    // lo: lower bound of indices, n: number of elements, r: step
    function oddEvenMerge(a, lo, n, r) {
      var m = r * 2;
      if (m < n) {
        oddEvenMerge(a, lo, n, m);
        oddEvenMerge(a, lo+r, n, m);

        for (var i = (lo+r); (i+r)<(lo+n); i+=m)  {
          compareExchange(a, i, i+r);
        }
      } else {
        compareExchange(a,lo,lo+r);
      }
    }

    function compareExchange(a, i, j) {
      if (j >= a.length || i >= a.length) {
        return;
      }

      var x = a[i];
      var y = a[j];

      var cmp = x.gt(y);
      a[i] = cmp.if_else(x, y);
      a[j] = cmp.if_else(y, x);
    }

    if (jiff_instance == null) {
      jiff_instance = saved_instance;
    }

    var shares = jiff_instance.share(input);

    var vals = [];
    var ranks = [];
    for (var i = 0; i < jiff_instance.party_count; i++) {
      vals[i] = shares[i + 1];
      ranks[i] = 0;
    }

    oddEvenSort(vals, 0, vals.length);

    for (var i = 0; i < vals.length; i++) {
      for (var j = 0; j < vals.length; j++) {
        var cmp = vals[i].seq(shares[j + 1]);
        ranks[j] = cmp.if_else(i + 1, ranks[j]);
      }
    }

    var promises = [];
    for (var i = 0; i < jiff_instance.party_count; i++) {
      promises[i] = jiff_instance.open(ranks[i], [i + 1]);
    }

    return Promise.all(promises);
  };

  exports.computeCompare = function (input, jiff_instance) {
    if (jiff_instance == null) {
      jiff_instance = saved_instance;
    }

    var shares = jiff_instance.share(input);

    var vals = [];
    var ranks = [];
    for (var i = 0; i < jiff_instance.party_count; i++) {
      vals[i] = shares[i + 1];
      ranks[i] = vals[i].ssub(vals[i]);
      ranks[i] = ranks[i].cadd(1);
    }

    for (var i = 0; i < vals.length; i++) {
      var current_share = vals[i];
      for (var j = 0; j < vals.length; j++) {
        var cmp = current_share.slt(vals[j]);
        ranks[i] = cmp.if_else(ranks[i].cadd(1), ranks[i]);
      }
    }

    var promises = [];
    for (var i = 0; i < jiff_instance.party_count; i++) {
      promises[i] = jiff_instance.open(ranks[i], [i + 1]);
    }

    return Promise.all(promises);
  };
}((typeof exports === 'undefined' ? this.mpc = {} : exports), typeof exports !== 'undefined'));
