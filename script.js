'use strict';

/* © Sergey Roganov aka belomir, 2019 */
/* © Ро́ганов Сергей aka Беломир, 2019 */

(function(){

	var alias = {
		_currentScreen: 'splashScreen',
		get currentScreen(){return this._currentScreen;},
		set currentScreen(newValue){
			document.querySelector(`#${this._currentScreen}`).dataset.isCurrent = false;
			this._currentScreen = newValue;
			document.querySelector(`#${this._currentScreen}`).dataset.isCurrent = true;
		},
		_gameIsOn: false,
		get gameIsOn(){return this._gameIsOn},
		set gameIsOn(newValue){
			this._gameIsOn = newValue;
			if(this._gameIsOn){
				document.querySelector('#resumeGameButton').removeAttribute('disabled');
				document.querySelector('#newGameButton').classList.add('yellow');
			}else{
				document.querySelector('#resumeGameButton').setAttribute('disabled', 'true');
				document.querySelector('#newGameButton').classList.add('green');
			}
		},
		helpButton(){
			this.currentScreen = 'helpScreen';
		},
		backToMainMenuButton(){
			this.currentScreen = 'mainMenuScreen';
		},
		/*newGameButton(){
			this.currentScreen = 'newGameScreen';
		},*/
		init(){
			document.addEventListener('DOMContentLoaded', evt=>{
				document.querySelectorAll('button').forEach((e)=>{
					e.addEventListener('click', ev=>{
						this[ev.currentTarget.id]();
					});
				});
				this.gameIsOn = false;
			});
			window.addEventListener('load', evt=>{
				alias.currentScreen = 'mainMenuScreen';
			});
		},
	};
	alias.init();
})(this);