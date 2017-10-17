define([
    "skylarkjs",
	"text!./templates/home.html"
],function(skylark,tpl){
    var spa = skylark.spa,
        $ = skylark.query;

	return spa.RouteController.inherit({
        klassName: "HomeController",

        rendering:function(e) {
            e.content = tpl;
        },

    	exited:function(e) {
            console.log('good bye Home');
    	}
	})

});
