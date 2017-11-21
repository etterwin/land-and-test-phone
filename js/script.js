//Executes the functions when everything is ready
window.addEvent('ready', function() {

	do_countdown();

	//Triggers a form submit for each element with the class form_submit
	$$('.form_submit').addEvent('click', function() {
		$('page_submit').submit();
		return false;
	});

	//initalize questions
	var all_questions = $$('.questionblock');
	$('min_number').set('text', '1');
	$('max_number').set('text', all_questions.length)
	all_questions.each(function(element,index){
		//create question id's
		element.setProperty('id','question_'+index);
		if(index != 0) {
			element.fade('hide');
			element.addClass('hidden');
		}
		//clickevent answer
		$$('#question_'+index+' a').each(function(link){
			link.addEvent('click',function(){
				show_next_question(index);
			});
		});
	});
});



var show_next_question = function(index){
	var all_questions = $$('.questionblock');
	var pointer = '';
	if(index < all_questions.length - 1){
		fadeing($('question_'+index),$('question_'+(index+1)));
		fadeing($('question_headline'),$('question_headline'));
		$('min_number').set('text', index+2);

	}else{
		fadeing($('questions'),$('page_prozess'));
		setTimeout(function(){
			setTimeout(function(){
				fadeing($('prozess_status_1'),$('prozess_status_2'));
					setTimeout(function(){
						fadeing($('prozess_status_2'),$('prozess_status_3'));
						setTimeout(function(){
							window.location = $('target_link').get('href');
						},1800);
					},1800);
			},1800);
		},1800);
	}
}

var fadeing = function(object_out,object_in){
	object_in.fade('hide');
	object_out.fade('out');
	object_out.addClass('hidden');
	setTimeout(function(){
		object_in.removeClass('hidden');
		object_in.fade('in');
	},100);
}


/* Creates a countdown
 * usage: $('element').countdown(options);
 * options:
 *		duration: 60000,					// Coutdown Duration / ms
 *		output_scheme: '%mm%:%ss%:%ms%',	// How to display the countdown; %min% = min, %sec% = sec, %msec% = msec
 *		start_delay: 0,						// delay before the countdown starts / ms
 *		on_complete: fn 					// function to execute when countdown finishes
 */
Element.implement({
	countdown: function(options) {
		var self = this;
		var _defaults = {
			duration: 60000,
			output_scheme: '%mm%:%ss%',
			start_delay: 0,
			on_complete: function() {}
		};
		var _options,
			_interval,
			_milliseconds_str,
			_seconds_str,
			_minutes_str,
			_current_date,
			_end_date,
			_output_string;

		// puclic proporties
		self.milliseconds;
		self.seconds;
		self.minutes;
		self.remaining_time;				// Date Object

		var _init = function(options) {
			_options = (typeof options !== 'object') ? _defaults : Object.merge(_defaults, options);
			_start();
		}

		var _count = function() {
			self.remaining_time = _current_date = new Date(_end_date - new Date());

			if(_current_date.getTime() >= 0) {
				self.milliseconds = _current_date.getMilliseconds();
				self.seconds = _current_date.getSeconds();
				self.minutes = _current_date.getMinutes();

				_milliseconds_str =	((self.milliseconds < 100) ? '0' : '') + Math.floor(self.milliseconds / 10).toString();
				_seconds_str = ((self.seconds < 10) ? '0' : '') + self.seconds.toString();
				_minutes_str = ((self.minutes < 10) ? '0' : '') + self.minutes.toString();

				_output();
			} else {
				_stop();
				if(typeof _options.on_complete === 'function') {
					Function.attempt(_options.on_complete);
				}
			}
		}

		var _output = function() {
			_output_string = _options.output_scheme.replace('%min%', _minutes_str).replace('%sec%', _seconds_str).replace('%msec%', _milliseconds_str);
			self.set('html', _output_string);
		}

		var _start = function() {
			setTimeout(function() {
				_end_date = new Date(new Date().getTime() + _options.duration);
				_interval = setInterval(function() {
					_count();
				}, 10);
			}, _options.start_delay);
		}

		var _stop = function() {
			_milliseconds_str = '00';
			_output();
			clearInterval(_interval);
		}

		_init(options);
	}
});

// Countdown
var do_countdown = function() {
	if($('countdown')) {
		var initial_value = $('countdown').get('text').split(':');
		var seconds = (parseInt(initial_value[0]) * 60) + parseInt(initial_value[1]);
		var milliseconds = 0;
		if(seconds > 0) {
			milliseconds = seconds * 1000;
		} else {
			milliseconds = 1.5 * 60 * 1000;
		}
		$('countdown').countdown({
			duration: milliseconds,
			output_scheme: '%min%:%sec%',
			start_delay: 990,
			on_complete: function() {
				//
			}
		});
	}
}
