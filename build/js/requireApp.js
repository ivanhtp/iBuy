var appVersion =  '0.0.1';require.config({baseUrl:"js",urlArgs:"v="+appVersion,waitSeconds:0,paths:{app:"app",angular:"../vendors/angular/angular.min","angular-route":"../vendors/angular-route/angular-route.min","angular-resource":"../vendors/angular-resource/angular-resource.min","angular-messages":"../vendors/angular-messages/angular-messages.min","angular-animate":"../vendors/angular-animate/angular-animate.min","angular-sanitize":"../vendors/angular-sanitize/angular-sanitize.min","angular-css":"../vendors/angular-css/angular-css.min","angular-bootstrap":"../vendors/angular-bootstrap/ui-bootstrap-tpls.min","angular-toast":"../vendors/ngtoast/dist/ngToast.min",bootstrap:"../vendors/bootstrap-sass/assets/javascripts/bootstrap.min",jquery:"../vendors/jquery/dist/jquery.min"},shim:{angular:{exports:"angular"},"angular-route":{deps:["angular"]},"angular-messages":{deps:["angular"]},"angular-animate":{deps:["angular"]},"angular-sanitize":{deps:["angular"]},"angular-bootstrap":{deps:["angular","bootstrap"]},"angular-toast":{deps:["angular","bootstrap","angular-sanitize"]},bootstrap:{deps:["jquery"]},app:{deps:["bootstrap","angular","angular-route","angular-messages","angular-animate","angular-bootstrap","angular-toast"]}}});require(["app","services/authApp","directives/ptFocusMe","controllers/toolbar","controllers/sidenav"],function(App){angular.bootstrap(document,["App"])});