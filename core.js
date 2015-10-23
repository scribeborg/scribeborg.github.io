/**
 * Created by dunlord on 11/07/2014.
 */
(function() {


    var app = angular.module("sb", []);

    app.controller("SbController", ['$http', '$scope', function ($http, $scope) {

        //this.code = "{\n    \"head\":\"run\",\n    \"modifiers\":[\"present\"],\n    \"phraseType\":\"Verb\",\n    \"complements\":[\n        {\n            \"modifiers\":[\"indefinite\", \"feminine\"],\n            \"phraseType\":\"Noun\",\n                \"head\":\"boy\"\n        }\n    ]\n}";
        this.code = "v:run.d\n    the n:boy.a";
        this.translated = "";
        this.lang = "";

        var self = this;
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/clouds");
//        editor.getSession().setMode("ace/mode/json");
        editor.setValue(this.code, -1);
        editor.getSession().on('change', function(e) {
            self.code = editor.getValue();
            self.lang = "";
            self.translated = "";
            $scope.$apply();
        });
        editor.focus();

        this.select = function(newLang) {

            this.lang = newLang;
            this.translated = "...";
            var self = this;
            var promise = sjs.Main().ws($http, {
                url: "http://docker.bryghts.com/scribes/" + newLang,
                //url: "http://localhost:9001/scribes/" + newLang,
                method: "POST",
                data: this.code,
                headers: {
                    'Content-Type': 'application/scribescript'
                }
            });

            promise.success(function(data){
                //self.translated = data;
                sjs.Main().setTranslated(self, data);
            });

            promise.error(function(data){
                console.info(data)
                self.translated = "ERROR";
            });
        };

        this.isSelected = function(self) {
            return this.lang === self;
        }

    }]);



})();
