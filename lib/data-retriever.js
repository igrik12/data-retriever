'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var DataRetreiver = function () {
    function DataRetreiver(url) {
        classCallCheck(this, DataRetreiver);

        this.url = url;
        this.index = 0;
        this.onData = null;
        this.inUpdate = false;
    }

    DataRetreiver.prototype.kick = function kick() {
        if (this.inUpdate || !this.onData) return;

        this.inUpdate = true;
        var that = this;
        var url = this.props.url + "/" + this.index;

        fetch(url).catch(function (e) {
            return;
        }).then(function (response) {
            if (typeof response === "undefined" || response.status >= 400) {
                that.inUpdate = false;
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            if (that.index === data.index) {
                that.inUpdate = false;
                return;
            }
            that.index = data.index;
            that.onData(data.blob);
            that.inUpdate = false;
        });
    };

    return DataRetreiver;
}();

exports.retriever = DataRetreiver;