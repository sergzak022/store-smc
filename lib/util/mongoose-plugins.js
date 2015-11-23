exports.setRequiredObjectFields = function (schema, options) {
    options = options || {};

    var name = options.name;

    if (!name) {
        return;
    }

    var keys = Object.keys(schema.tree[name]);

    if (options.exclude) {
        kyes = keys.filter(function(key) {
            return options.exclude.indexOf(key) < 0;
        });
    }

    keys.forEach(function(attrName) {
        schema.path(name + '.' + attrName).isRequired = true;
    });
};