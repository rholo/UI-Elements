/**
 * @version 0.1.9
 * @author Rodrigo Ahumada - Front-end | hola@rholo.cl
 * @description Framework to make some useful functions more easily work and give session params to Front-end Development
 * @param $j
 **/
$j = jQuery.noConflict();
init = {
		load: function(){
			init.settings();
			init.nav();
			init.collapse();
			init.tabs();
			init.tableSettings();
		},
		redirect: function () {
			window.location = 'http://rholo.cl';
		},
		settings: function() {
			$j(document).on('click', '[close-modal]', function () {
					$j('[ui="modal"]').fadeOut(200, function () {
						$j(this).remove();
						$j('html, body').css({
						    'overflow': 'auto',
						    'height': 'auto'
						});
					});
				});
			$j(document).on('click','[modal]', function () {
				var link = $j(this).attr('link');
				var title = $j(this).attr('title');
				var size = $j(this).attr('size');
				$j('[ui="modal"]').fadeOut(200,function () {
					$j(this).remove();
				});
				init.modalBox(link,title,size);
			});
			$j(document).on('hover', function () {
				$j(this).addClass('disabled');
			});
			//collapse option
		},
		tableSettings:function () {
			var table,rowCollapse,rowDelete;
			table = $j('[module="table"] table');
			rowCollapse = '';
			rowDelete = $j('[module="table"] table tr').find('[delete]');
			console.log(rowDelete);
			//deshabilitar elementos en tablas
			$j('[tr-disabled]').find('*').addClass('disabled').attr('disabled','disabled');
			//pintar fila seleccionada
			$j('[module="table"] table').on('click','input[type="checkbox"]', function (e) {
				$j(this).closest('tr').toggleClass('selected');
			});
		},
		collapse:function () {
			$j('[collapsed]').next('div').hide();
			$j('.collapse').click(function(){
			   $j(this).next('div').slideToggle('slow');
	   		});
		},
		nav:function () {
			$j('.main-nav ul').find('[disabled]').children('a').addClass('disabled');
			$j('.main-nav ul li').hover(function(){
				if (!$j(this).attr('disabled')) {
					$j(this).addClass('hover');
					$j('ul:first', this).fadeIn(100);
				}
			}, function(){
				$j(this).removeClass('hover');
				$j('ul:first', this).fadeOut(100);
			});
			$j('.main-nav li ul li:has(ul)').find('a:first').addClass('dropleft');
			$j('.main-nav li:has(ul)').find('a:first').addClass('dropdown');
		},
		tabs: function () {
			$j(document).on('click','[module="tabs"] ul li a', function () {
				$j(this).addClass('link-tab');
				$j(this).parent().siblings().children().removeClass('link-tab');
				var tab = $j(this).attr('tab');
				$j('#'+tab).fadeIn();
				$j('#'+tab).siblings('[tab]').css('display','none');
			});
		},
		modalBox:function (link,title,size) {
			//params header, content(get an HTML);

			if (link === '') {
				console.log('no-link');
				link = 'modal-error.html';
				title = 'No disponible';
				size = '30%';
			}
			var headerTitle, modalBckgd, modalWrap, modalHeader, modalContent;
			headerTitle = title;
			modalBckgd = $j('<div ui="modal">').appendTo('body');
			modalWrap = $j('<div ui="modal-box">').appendTo(modalBckgd);
			modalHeader = $j('<div ui="modal-box-header"><h4>'+ headerTitle +'</h4><i ui="close-modal" class="fa fa-close fa-2x" close-modal></i></div>').appendTo(modalWrap);
			modalContent = $j('<div ui="modal-box-content">').appendTo(modalWrap);
			if (size !== undefined) {
				$j('[ui="modal-box"]').css('width',size);
			}
			$j('[ui="modal-box-content"]').load('resources/templates/'+link);
			modalBckgd.fadeIn(200, function () {
				$j(this).show();
				$j('html, body').css({
				    'overflow': 'hidden',
				    'height': '100%'
				});
                $j('.calendar').datetimepicker({
                        lazyInit:true,
                        timepicker:false, //sin hora
                        format:'d/m/Y',
                        dayOfWeekStart:1, //LUNES
                        todayButton:false //home button
                });
				//deshabilito el tabulador
				$j('[ui="modal-box"]').keydown(function(objEvent) {
					if (objEvent.keyCode == 9) {
						objEvent.preventDefault();
					}
				});
			});

		},
	};
	//Load init & settings functions
//$j(document).ready(function(){location.hostname === 'rholo.cl' ? init.load(): init.redirect()});
$j(document).ready(function(){
	$j(window).load(function(){
		$j('#preloader').fadeOut('slow',function(){$j(this).remove();});
		init.load();
	});
	//init.load();
});
