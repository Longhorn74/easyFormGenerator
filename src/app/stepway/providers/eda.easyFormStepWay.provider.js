/**
 *  ------------------------------------------------------
 *  module core : injects core "non app modules"
 *  ------------------------------------------------------
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

(function(){
	'use strict';
	
	angular
		.module('eda.easyFormSteWayConfigProvider', [])
		.provider('easyFormSteWayConfig', easyFormSteWayConfigFct);
		
		easyFormSteWayConfigFct.$inject = [];
		
		function easyFormSteWayConfigFct(){
			var _configuration 					=  defaultConfig();
			var _controlsList						=  controlsList();
			/* jshint validthis:true */
			this.$get 									= easyFormSteWayConfig;
			this.setModalAnimation 			= setModalAnimation;
			this.getModalAnimation			= getModalAnimation;
			this.configuration 					= _configuration;
			this.getListEnabledControl 	= getListEnabledControl;
			this.setControls						= setControls;
    	
			
			
		
			//set default config
			function defaultConfig(){
				var _defaultConfiguration = {
					modalAnimated : false
				};
				return _defaultConfiguration;
			}
		
			function controlsList(){
				var controls = [
					{name: 'empty', 					enabled: true},
					{name: 'Header', 					enabled: true},
					{name: 'TextInput', 			enabled: true},
					{name: 'Password', 				enabled: true},
					{name: 'Date', 						enabled: true},
					{name: 'Texarea',	 				enabled: true},
					{name: 'RichTextEditor', 	enabled: true},
					{name: 'Radio', 					enabled: true},
					{name: 'Checkbox', 				enabled: true},
					{name: 'BasicSelect', 		enabled: true},
					{name: 'GroupedSelect', 	enabled: true}
				];
					
				return controls;
			}
			
			function setModalAnimation(flagConfig){
				var valueToApply = (flagConfig === true) ? 
														  flagConfig  
														: (flagConfig === false ? 
															  flagConfig 
															: _configuration.modalAnimated);
																	
				_configuration.modalAnimated = valueToApply;
			}

			function getModalAnimation(){																	
				return _configuration.modalAnimated;
			}		
			
			
			function getListEnabledControl(){
				return _controlsList;
			}
			
			
			function setControls(controls){	
				if (angular.isObject(controls)) {
					angular.forEach(controls.name, function(aControl){
						if(angular.isObject(controlValid(aControl))){
							angular.extend(_controlsList, {
								name 		: aControl.name,
								enabled : aControl.enabled
							})		
						}
					});
				}else{
					throw 'disabledTheseControls needs an object as parameter';
				}
			}
			
			/**
			 * returns validcontrol (same case as reference) if control has good properties
			 * or returns empty object if not valid 
			 * */			
			function controlValid(thisContrl){
				var validControl = null;
				if (angular.isString(thisContrl.name) &&
						(thisContrl.enabled === true || thisContrl.enabled === false)){
							angular.forEach(_controlsList, function(aControlRef){
								if (aControlRef.name.toLocaleLowerCase === thisContrl.name.toLocaleLowerCase) {
										validControl.name 		= aControlRef.name;
										validControl.enabled  = aControlRef.enabled;
								}
							})
						}
				return validControl;
			}
			
			
		
			//$get implementation :
			easyFormSteWayConfig.$inject = [];
			function easyFormSteWayConfig(){
													
				var service = {
					setModalAnimation 			: setModalAnimationFct,
					getModalAnimationValue 	: getModalAnimationValue
				};
				return service;
				
				
				function getModalAnimationValue(){
					return _configuration.modalAnimated;
				}				
				
				function setModalAnimationFct(value){
					setModalAnimation(value);
				}
				

				
			}
		
		}
		
		
		
})();