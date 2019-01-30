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
		_gameDurationType: 0,
		get gameDurationType(){return this._gameDurationType;},
		set gameDurationType(newValue){
			this._gameDurationType = newValue;
			document.querySelectorAll('#gameDurationType input')[this._gameDurationType].checked = true;
		},
		_roundDurations: {
			'15s': '15 сек.',
			'30s': '30 сек.',
			'45s': '45 сек.',
			'1m': '1 мин.',
			'1.5m': '1,5 мин.'
		},
		_roundDuration: '1m',
		get roundDuration(){return this._roundDuration},
		set roundDuration(newValue){
			if(newValue in this._roundDurations){
				this._roundDuration = newValue;
				document.querySelector('#roundDuration').querySelector(`#\\3${this._roundDuration}`).checked = true;
			}
		},
		_penalty: true,
		get penalty(){return this._penalty;},
		set penalty(newValue){
			this._penalty = newValue;
			document.querySelector('#penalty').checked = this._penalty;
		},
		_commonWords: false,
		get commonWords(){return this._commonWords;},
		set commonWords(newValue){
			this._commonWords = newValue;
			document.querySelector('#commonWords').checked = this._commonWords;
		},
		_waitLastWord: true,
		get waitLastWord(){return this._waitLastWord;},
		set waitLastWord(newValue){
			this._waitLastWord = newValue;
			document.querySelector('#waitLastWord').checked = this._waitLastWord;
		},
		_commonLastWord: true,
		get commonLastWord(){return this._commonLastWord;},
		set commonLastWord(newValue){
			this._commonLastWord = newValue;
			document.querySelector('#commonLastWord').checked = this._commonLastWord;
		},
		helpButton(){
			this.currentScreen = 'helpScreen';
		},
		backToMainMenuButton(){
			this.currentScreen = 'mainMenuScreen';
		},
		newGameButton(){
			this.currentScreen = 'newGameScreen';
		},
		init(){
			document.addEventListener('DOMContentLoaded', evt=>{
				for(let duration in this._roundDurations){
					var label = document.createElement('label');
					var input = document.createElement('input');
					input.type = 'radio';
					input.name = 'roundDuration';
					input.id = duration;
					input.value = duration;
					input.addEventListener('change', ev=>{
						if(ev.currentTarget.checked){
							this._roundDuration = ev.currentTarget.id;
						}
					});
					label.appendChild(input);
					var div = document.createElement('div');
					div.textContent = this._roundDurations[duration];
					label.appendChild(div);
					document.querySelector('#roundDuration > div').appendChild(label);
				}
				document.querySelectorAll('button').forEach((e)=>{
					e.addEventListener('click', ev=>{
						this[ev.currentTarget.id]();
					});
				});
				document.querySelectorAll('input[type="checkbox"]').forEach((e)=>{
					e.addEventListener('change', ev=>{
						this[`_${ev.currentTarget.id}`] = ev.currentTarget.checked;
					});
				});
				document.querySelector('#splashScreen').addEventListener('click', ev=>{this.currentScreen = 'mainMenuScreen';});
				this.gameIsOn = false;
				this.gameDurationType = 0;
				this.roundDuration = '1m';
				this.penalty = true;
				this.commonWords = false;
				this.waitLastWord = true;
				this.commonLastWord = true;
			});
			window.addEventListener('load', evt=>{
				alias.currentScreen = 'mainMenuScreen';
			});
		},
	};
	alias.init();
})(this);