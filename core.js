/**
 * Created by dunlord on 11/07/2014.
 */
(function() {


    var app = angular.module("sb", []);

    app.controller("SbController", ['$http', function ($http) {

        this.code = "{\n    \"head\":\"run\",\n    \"modifiers\":[\"present\"],\n    \"phraseType\":\"Verb\",\n    \"complements\":[\n        {\n            \"type\":\"Subject\",\n            \"body\": {\n                \"modifiers\":[\"indefinite\", \"feminine\"],\n                \"phraseType\":\"Noun\",\n                \"head\":\"boy\"\n            }\n        }\n    ]\n}";
        this.translated = "";

        var self = this;
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/clouds");
        editor.getSession().setMode("ace/mode/json");
        editor.setValue(this.code, -1);
        editor.getSession().on('change', function(e) {
            self.code = editor.getValue();
            self.lang = null;
        });
        editor.focus();

        this.select = function(newLang) {

            this.lang = newLang;
            this.translated = "...";
            var self = this;
            var promise = $http({
                url: "http://scribeborg.bryghts.com/scribe/" + newLang + "/",
                method: "POST",
                data: this.code,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            promise.success(function(data){
                self.translated = data;
            });
            promise.error(function(data){
                self.translated = "ERROR";
            });
        };

        this.isSelected = function(self) {
            return this.lang === self;
        }
    }]);



})();