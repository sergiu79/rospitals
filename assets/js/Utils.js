rospitals.Utils = function () {
    return {
        isNumeric: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        getBoolean: function (str) {
            if ("true".startsWith(str)) {
                return true;
            } else if ("false".startsWith(str)) {
                return false;
            } else {
                return null;
            }
        }
    };
}();