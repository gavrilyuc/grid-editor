(function( $ ){

$.fn.gridEditor = function( options ) {

	var self = this;
	var grideditor = self.data('grideditor');
	
	/** Methods **/
	
	if (arguments[0] == 'getHtml') {
		if (grideditor) {
			grideditor.deinit();
			var html = self.html();
			grideditor.init();
			return html;
		} else {
			return self.html();
		}
	}
	
	if (arguments[0] == 'remove') {
		if (grideditor) {
			grideditor.remove();
		}
		return;
	} 
	
	/** Initialize plugin */

	self.each(function(baseIndex, baseElem) {
		baseElem = $(baseElem);

		var displayModes = ['x4l', 'x3l', 'xxl', 'xl', 'lg', 'sm', 'xs'];
		var colClasses = ['col-x4l-', 'col-x3l-', 'col-xxl-', 'col-xl-', 'col-lg-', 'col-sm-', 'col-xs-'];
		var curColClassIndex = 0; // Index of the column class we are manipulating currently
		var MAX_COL_SIZE = 36;

		var settings = $.extend({
			'new_row_layouts': [
				[36],
				[18, 18],
				[12, 24],
				[24, 12],
				[12, 12, 12],
				[9, 18, 9],
				[3, 30, 3],
				[6, 24, 6],
				[9, 9, 9, 9],
				[6, 6, 6, 6, 6, 6],
			],
			'row_classes': [
//				{ label: '4xl flex', cssClass: 'd-x4l-flex' },
//				{ label: '3xl flex', cssClass: 'd-x3l-flex' },
//				{ label: '2xl flex', cssClass: 'd-xxl-flex' },
//				{ label: 'xl flex', cssClass: 'd-xl-flex' },
//				{ label: 'lg flex', cssClass: 'd-lg-flex' },
//				{ label: 'md flex', cssClass: 'd-md-flex' },
//				{ label: 'sm flex', cssClass: 'd-sm-flex' },
//				{ label: 'xs flex', cssClass: 'd-xs-flex' },
//				{ label: 'flex', cssClass: 'd-flex' },
//
//				{ label: '4xl justify content start', cssClass: 'justify-content-x4l-start' },
//				{ label: '4xl justify content end', cssClass: 'justify-content-x4l-end' },
//				{ label: '4xl justify content center', cssClass: 'justify-content-x4l-center' },
//				{ label: '4xl justify content between', cssClass: 'justify-content-x4l-between' },
//				{ label: '4xl justify content around', cssClass: 'justify-content-x4l-around' },
//
//				{ label: '3xl justify content start', cssClass: 'justify-content-x3l-start' },
//				{ label: '3xl justify content end', cssClass: 'justify-content-x3l-end' },
//				{ label: '3xl justify content center', cssClass: 'justify-content-x3l-center' },
//				{ label: '3xl justify content between', cssClass: 'justify-content-x3l-between' },
//				{ label: '3xl justify content around', cssClass: 'justify-content-x3l-around' },
//
//				{ label: '2xl justify content start', cssClass: 'justify-content-xxl-start' },
//				{ label: '2xl justify content end', cssClass: 'justify-content-xxl-end' },
//				{ label: '2xl justify content center', cssClass: 'justify-content-xxl-center' },
//				{ label: '2xl justify content between', cssClass: 'justify-content-xxl-between' },
//				{ label: '2xl justify content around', cssClass: 'justify-content-xxl-around' },
//
//				{ label: 'xl justify content start', cssClass: 'justify-content-xl-start' },
//				{ label: 'xl justify content end', cssClass: 'justify-content-xl-end' },
//				{ label: 'xl justify content center', cssClass: 'justify-content-xl-center' },
//				{ label: 'xl justify content between', cssClass: 'justify-content-xl-between' },
//				{ label: 'xl justify content around', cssClass: 'justify-content-xl-around' },
//
//				{ label: 'lg justify content start', cssClass: 'justify-content-lg-start' },
//				{ label: 'lg justify content end', cssClass: 'justify-content-lg-end' },
//				{ label: 'lg justify content center', cssClass: 'justify-content-lg-center' },
//				{ label: 'lg justify content between', cssClass: 'justify-content-lg-between' },
//				{ label: 'lg justify content around', cssClass: 'justify-content-lg-around' },
//
//				{ label: 'md justify content start', cssClass: 'justify-content-md-start' },
//				{ label: 'md justify content end', cssClass: 'justify-content-md-end' },
//				{ label: 'md justify content center', cssClass: 'justify-content-md-center' },
//				{ label: 'md justify content between', cssClass: 'justify-content-md-between' },
//				{ label: 'md justify content around', cssClass: 'justify-content-md-around' },
//
//				{ label: 'sm justify content start', cssClass: 'justify-content-sm-start' },
//				{ label: 'sm justify content end', cssClass: 'justify-content-sm-end' },
//				{ label: 'sm justify content center', cssClass: 'justify-content-sm-center' },
//				{ label: 'sm justify content between', cssClass: 'justify-content-sm-between' },
//				{ label: 'sm justify content around', cssClass: 'justify-content-sm-around' },
//
//				{ label: 'xs justify content start', cssClass: 'justify-content-xs-start' },
//				{ label: 'xs justify content end', cssClass: 'justify-content-xs-end' },
//				{ label: 'xs justify content center', cssClass: 'justify-content-xs-center' },
//				{ label: 'xs justify content between', cssClass: 'justify-content-xs-between' },
//				{ label: 'xs justify content around', cssClass: 'justify-content-xs-around' },
//
//				{ label: 'justify content start', cssClass: 'justify-content-start' },
//				{ label: 'justify content end', cssClass: 'justify-content-end' },
//				{ label: 'justify content center', cssClass: 'justify-content-center' },
//				{ label: 'justify content between', cssClass: 'justify-content-between' },
//				{ label: 'justify content around', cssClass: 'justify-content-around' },
//
//				{ label: '4xl align items start', cssClass: 'align-items-x4l-start' },
//				{ label: '4xl align items end', cssClass: 'align-items-x4l-end' },
//				{ label: '4xl align items center', cssClass: 'align-items-x4l-center' },
//				{ label: '4xl align items baseline', cssClass: 'align-items-x4l-baseline' },
//				{ label: '4xl align items stretch', cssClass: 'align-items-x4l-stretch' },
//
//				{ label: '3xl align items start', cssClass: 'align-items-x3l-start' },
//				{ label: '3xl align items end', cssClass: 'align-items-x3l-end' },
//				{ label: '3xl align items center', cssClass: 'align-items-x3l-center' },
//				{ label: '3xl align items baseline', cssClass: 'align-items-x3l-baseline' },
//				{ label: '3xl align items stretch', cssClass: 'align-items-x3l-stretch' },
//
//				{ label: '2xl align items start', cssClass: 'align-items-xxl-start' },
//				{ label: '2xl align items end', cssClass: 'align-items-xxl-end' },
//				{ label: '2xl align items center', cssClass: 'align-items-xxl-center' },
//				{ label: '2xl align items baseline', cssClass: 'align-items-xxl-baseline' },
//				{ label: '2xl align items stretch', cssClass: 'align-items-xxl-stretch' },
//
//				{ label: 'xl align items start', cssClass: 'align-items-xl-start' },
//				{ label: 'xl align items end', cssClass: 'align-items-xl-end' },
//				{ label: 'xl align items center', cssClass: 'align-items-xl-center' },
//				{ label: 'xl align items baseline', cssClass: 'align-items-xl-baseline' },
//				{ label: 'xl align items stretch', cssClass: 'align-items-xl-stretch' },
//
//				{ label: 'lg align items start', cssClass: 'align-items-lg-start' },
//				{ label: 'lg align items end', cssClass: 'align-items-lg-end' },
//				{ label: 'lg align items center', cssClass: 'align-items-lg-center' },
//				{ label: 'lg align items baseline', cssClass: 'align-items-lg-baseline' },
//				{ label: 'lg align items stretch', cssClass: 'align-items-lg-stretch' },
//
//				{ label: 'md align items start', cssClass: 'align-items-md-start' },
//				{ label: 'md align items end', cssClass: 'align-items-md-end' },
//				{ label: 'md align items center', cssClass: 'align-items-md-center' },
//				{ label: 'md align items baseline', cssClass: 'align-items-md-baseline' },
//				{ label: 'md align items stretch', cssClass: 'align-items-md-stretch' },
//
//				{ label: 'sm align items start', cssClass: 'align-items-sm-start' },
//				{ label: 'sm align items end', cssClass: 'align-items-sm-end' },
//				{ label: 'sm align items center', cssClass: 'align-items-sm-center' },
//				{ label: 'sm align items baseline', cssClass: 'align-items-sm-baseline' },
//				{ label: 'sm align items stretch', cssClass: 'align-items-sm-stretch' },
//
//				{ label: 'xs align items start', cssClass: 'align-items-xs-start' },
//				{ label: 'xs align items end', cssClass: 'align-items-xs-end' },
//				{ label: 'xs align items center', cssClass: 'align-items-xs-center' },
//				{ label: 'xs align items baseline', cssClass: 'align-items-xs-baseline' },
//				{ label: 'xs align items stretch', cssClass: 'align-items-xs-stretch' },
//
//				{ label: 'align items start', cssClass: 'align-items-start' },
//				{ label: 'align items end', cssClass: 'align-items-end' },
//				{ label: 'align items center', cssClass: 'align-items-center' },
//				{ label: 'align items baseline', cssClass: 'align-items-baseline' },
//				{ label: 'align items stretch', cssClass: 'align-items-stretch' },
//
//				{ label: '4xl order 0', cssClass: 'order-x4l-0' },
//				{ label: '3xl order 0', cssClass: 'order-x3l-0' },
//				{ label: '2xl order 0', cssClass: 'order-xxl-0' },
//				{ label: 'xl order 0', cssClass: 'order-0' },
//				{ label: 'lg order 0', cssClass: 'order-0' },
//				{ label: 'md order 0', cssClass: 'order-0' },
//				{ label: 'sm order 0', cssClass: 'order-0' },
//				{ label: 'xs order 0', cssClass: 'order-0' },
//				{ label: 'order 0', cssClass: 'order-0' },
//				{ label: '4xl order 1', cssClass: 'order-x4l-1' },
//				{ label: '3xl order 1', cssClass: 'order-x3l-1' },
//				{ label: '2xl order 1', cssClass: 'order-xxl-1' },
//				{ label: 'xl order 1', cssClass: 'order-1' },
//				{ label: 'lg order 1', cssClass: 'order-1' },
//				{ label: 'md order 1', cssClass: 'order-1' },
//				{ label: 'sm order 1', cssClass: 'order-1' },
//				{ label: 'xs order 1', cssClass: 'order-1' },
//				{ label: 'order 1', cssClass: 'order-1' },
//				{ label: '4xl order 2', cssClass: 'order-x4l-2' },
//				{ label: '3xl order 2', cssClass: 'order-x3l-2' },
//				{ label: '2xl order 2', cssClass: 'order-xxl-2' },
//				{ label: 'xl order 3', cssClass: 'order-3' },
//				{ label: 'lg order 3', cssClass: 'order-3' },
//				{ label: 'md order 3', cssClass: 'order-3' },
//				{ label: 'sm order 3', cssClass: 'order-3' },
//				{ label: 'xs order 3', cssClass: 'order-3' },
//				{ label: 'order 3', cssClass: 'order-3' },

			],
			'col_classes': [
//				{ label: '4xl align self start', cssClass: 'align-self-x4l-start' },
//				{ label: '4xl align self end', cssClass: 'align-self-x4l-end' },
//				{ label: '4xl align self center', cssClass: 'align-self-x4l-center' },
//				{ label: '4xl align self baseline', cssClass: 'align-self-x4l-baseline' },
//				{ label: '4xl align self stretch', cssClass: 'align-self-x4l-stretch' },
//
//				{ label: '3xl align self start', cssClass: 'align-self-x3l-start' },
//				{ label: '3xl align self end', cssClass: 'align-self-x3l-end' },
//				{ label: '3xl align self center', cssClass: 'align-self-x3l-center' },
//				{ label: '3xl align self baseline', cssClass: 'align-self-x3l-baseline' },
//				{ label: '3xl align self stretch', cssClass: 'align-self-x3l-stretch' },
//
//				{ label: '2xl align self start', cssClass: 'align-self-xxl-start' },
//				{ label: '2xl align self end', cssClass: 'align-self-xxl-end' },
//				{ label: '2xl align self center', cssClass: 'align-self-xxl-center' },
//				{ label: '2xl align self baseline', cssClass: 'align-self-xxl-baseline' },
//				{ label: '2xl align self stretch', cssClass: 'align-self-xxl-stretch' },
//
//				{ label: 'xl align self start', cssClass: 'align-self-xl-start' },
//				{ label: 'xl align self end', cssClass: 'align-self-xl-end' },
//				{ label: 'xl align self center', cssClass: 'align-self-xl-center' },
//				{ label: 'xl align self baseline', cssClass: 'align-self-xl-baseline' },
//				{ label: 'xl align self stretch', cssClass: 'align-self-xl-stretch' },
//
//				{ label: 'lg align self start', cssClass: 'align-self-lg-start' },
//				{ label: 'lg align self end', cssClass: 'align-self-lg-end' },
//				{ label: 'lg align self center', cssClass: 'align-self-lg-center' },
//				{ label: 'lg align self baseline', cssClass: 'align-self-lg-baseline' },
//				{ label: 'lg align self stretch', cssClass: 'align-self-lg-stretch' },
//
//				{ label: 'md align self start', cssClass: 'align-self-md-start' },
//				{ label: 'md align self end', cssClass: 'align-self-md-end' },
//				{ label: 'md align self center', cssClass: 'align-self-md-center' },
//				{ label: 'md align self baseline', cssClass: 'align-self-md-baseline' },
//				{ label: 'md align self stretch', cssClass: 'align-self-md-stretch' },
//
//				{ label: 'sm align self start', cssClass: 'align-self-sm-start' },
//				{ label: 'sm align self end', cssClass: 'align-self-sm-end' },
//				{ label: 'sm align self center', cssClass: 'align-self-sm-center' },
//				{ label: 'sm align self baseline', cssClass: 'align-self-sm-baseline' },
//				{ label: 'sm align self stretch', cssClass: 'align-self-sm-stretch' },
//
//				{ label: 'xs align self start', cssClass: 'align-self-xs-start' },
//				{ label: 'xs align self end', cssClass: 'align-self-xs-end' },
//				{ label: 'xs align self center', cssClass: 'align-self-xs-center' },
//				{ label: 'xs align self baseline', cssClass: 'align-self-xs-baseline' },
//				{ label: 'xs align self stretch', cssClass: 'align-self-xs-stretch' },
//
//				{ label: 'align items start', cssClass: 'align-items-start' },
//				{ label: 'align items end', cssClass: 'align-items-end' },
//				{ label: 'align items center', cssClass: 'align-items-center' },
//				{ label: 'align items baseline', cssClass: 'align-items-baseline' },
//				{ label: 'align items stretch', cssClass: 'align-items-stretch' },
			],
			'row_tools': [
				{
					title: 'Flex container',
					iconClass: 'fa-solid fa-bars',
					click: function(row) {
						setClassFor(row, 'd-flex', 'd-', '-flex');
					}
				},
				{
					title: 'Inline flex container',
					iconClass: 'fa-regular fa-snowflake',
					click: function(row) {
						setClassFor(row, 'd-inline-flex', 'd-', '-inline-flex');
					}
				},
				{
					title: 'Justify content start',
					iconClass: 'fa-solid fa-gears',
					click: function(row) {
						setClassFor(row, 'justify-content-start', 'justify-content-', '-start');
					}
				},
				{
					title: 'Justify content end',
					iconClass: 'fa-solid fa-tree',
					click: function(row) {
						setClassFor(row, 'justify-content-end', 'justify-content-', '-end');
					}
				},
				{
					title: 'Justify content center',
					iconClass: 'fa-solid fa-font',
					click: function(row) {
						setClassFor(row, 'justify-content-center', 'justify-content-', '-center');
					}
				},
				{
					title: 'Justify content between',
					iconClass: 'fa-solid fa-lemon',
					click: function(row) {
						setClassFor(row, 'justify-content-between', 'justify-content-', '-between');
					}
				},
				{
					title: 'Justify content around',
					iconClass: 'fa-regular fa-lemon',
					click: function(row) {
						setClassFor(row, 'justify-content-around', 'justify-content-', '-around');
					}
				},
			],
			'col_tools': [],
			'custom_filter': '',
			'content_types': ['tinymce'],
			'valid_col_sizes': [
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
				20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
			],
			'source_textarea': ''
		}, options);


		// Elems
		var canvas,
			mainControls,
			wrapper, // controls wrapper
			addRowGroup,
			htmlTextArea
		;
		
		// Copy html to sourceElement if a source textarea is given
		if (settings.source_textarea) {
			var sourceHtml = $(settings.source_textarea).val();
			if(sourceHtml.length > 0 && $('<div>'+sourceHtml+'</div>').find('.row').addBack('.row').length == 0) {
				var row = createRow();
				var column = createColumn(12).appendTo(row);
				column.find('.ge-content').html(sourceHtml);
				sourceHtml = column.html();
			} 
			baseElem.html(sourceHtml);
		}
		
		// Wrap content if it is non-bootstrap
		if (baseElem.children().length && !baseElem.find('div.row').length) {
			var children = baseElem.children();
			var newRow = $('<div class="row"><div class="col-12"/></div>').appendTo(baseElem);
			newRow.find('.col-12').append(children);
		}

		setup();
		init();

		function setup() {
			/* Setup canvas */
			canvas = baseElem.addClass('ge-canvas');
			
			htmlTextArea = $('<textarea class="ge-html-output"/>').insertBefore(canvas);

			/* Create main controls*/
			mainControls = $('<div class="ge-mainControls" />').insertBefore(htmlTextArea);
			wrapper = $('<div class="ge-wrapper ge-top" />').appendTo(mainControls);

			// Add row
			addRowGroup = $('<div class="ge-addRowGroup btn-group" />').appendTo(wrapper);
			$.each(settings.new_row_layouts, function(j, layout) {
				var btn = $('<a class="btn btn-sm btn-primary" />')
					.attr('title', 'Add row ' + layout.join('-'))
					.on('click', function() {
						var row = createRow().appendTo(canvas);
						layout.forEach(function(i) {
							createColumn(i).appendTo(row);
						});
						init();
						if (row[0].scrollIntoView) row[0].scrollIntoView({behavior: 'smooth'});
					})
					.appendTo(addRowGroup)
				;

				btn.append('<i class="fa fa-plus"></i>');

				var layoutName = layout.join(' - ');
				var icon = '<div class="row ge-row-icon">';
				layout.forEach(function(i) {
					icon += '<div class="column col-' + i + '"/>';
				});
				icon += '</div>';
				btn.append(icon);
			});

			// Buttons on right
			var layoutDropdown = $('<div class="dropdown pull-right ge-layout-mode">' +
				'<button type="button" id="geLayoutMode" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Desktop 4XL</button>' +
					'<div class="dropdown-menu" aria-labelledby="geLayoutMode">' +
						'<a class="dropdown-item" href="#" data-width="auto" title="col-x4l classes">Desktop 4XL</a>'+
						'<a class="dropdown-item" href="#" title="col-x3l classes">Desktop 3XL</a>'+
						'<a class="dropdown-item" href="#" title="col-xxl classes">Desktop 2XL</a>' +
						'<a class="dropdown-item" href="#" title="col-xl classes">Desktop XL</a>'+
						'<a class="dropdown-item" href="#" title="col-lg classes">Large Tablet</a>' +
						'<a class="dropdown-item" href="#" title="col-md classes">Tablet</a>' +
						'<a class="dropdown-item" href="#" title="col-sm classes">Phone</a>' +
						'<a class="dropdown-item" href="#" title="col-xs classes">Phone XS</a>' +
					'</div>' +
				'</div>')
				.on('click', 'a', function() {
					var a = $(this);
					switchLayout(a.index());
					layoutDropdown.find('button').text(a.text());
				})
				.appendTo(wrapper)
			;
			var btnGroup = $('<div class="btn-group pull-right"/>')
				.appendTo(wrapper)
			;
			var htmlButton = $('<button title="Edit Source Code" type="button" class="btn btn-sm btn-primary gm-edit-mode"><i class="fa fa-chevron-left"></i><i class="fa fa-chevron-right"></i></span></button>')
				.on('click', function() {
					if (htmlButton.hasClass('active')) {
						canvas.empty().html(htmlTextArea.val()).show();
						init();
						htmlTextArea.hide();
					} else {
						deinit();
						htmlTextArea
							.height(0.8 * $(window).height())
							.val(canvas.html())
							.show()
						;
						canvas.hide();
					}

					htmlButton.toggleClass('active btn-danger');
				})
				.appendTo(btnGroup)
			;
			var previewButton = $('<button title="Preview" type="button" class="btn btn-sm btn-primary gm-preview"><i class="fa fa-eye"></i></button>')
				.on('click', function() {
					previewButton.toggleClass('active btn-danger');
					canvas.toggleClass('ge-editing');
				})
				.appendTo(btnGroup)
			;

			// Make controls fixed on scroll
			$(window).on('scroll', onScroll);

			/* Init RTE on click */
			canvas.on('click', '.ge-content', initRTE);
		}

		function onScroll(e) {
			var $window = $(window);
			
			if (
				$window.scrollTop() > mainControls.offset().top &&
				$window.scrollTop() < canvas.offset().top + canvas.height()
			) {
				if (wrapper.hasClass('ge-top')) {
					wrapper
						.css({
							left: wrapper.offset().left,
							width: wrapper.outerWidth(),
						})
						.removeClass('ge-top')
						.addClass('ge-fixed')
					;
				}
			} else {
				if (wrapper.hasClass('ge-fixed')) {
					wrapper
						.css({ left: '', width: '' })
						.removeClass('ge-fixed')
						.addClass('ge-top')
					;
				}
			}
		}

		function initRTE(e) {
			if ($(this).hasClass('ge-rte-active')) { return; }
			
			var rte = getRTE($(this).data('ge-content-type'));
			if (rte) {
				$(this).addClass('ge-rte-active', true);
				rte.init(settings, $(this));
			}
		}

		function reset() {
			deinit();
			init();
		}

		function init() {
			runFilter(true);
			canvas.addClass('ge-editing');
			addAllColClasses();
			wrapContent();
			createRowControls();
			createColControls();
			makeSortable();
			switchLayout(curColClassIndex);
		}

		function deinit() {
			canvas.removeClass('ge-editing');
			var contents = canvas.find('.ge-content').removeClass('ge-rte-active').each(function() {
				var content = $(this);
				getRTE(content.data('ge-content-type')).deinit(settings, content);
			});
			canvas.find('.ge-tools-drawer').remove();
			removeSortable();
			runFilter(false);
		}

		function remove() {
			deinit();
			mainControls.remove();
			htmlTextArea.remove();
			$(window).off('scroll', onScroll);
			canvas.off('click', '.ge-content', initRTE);
			canvas.removeData('grideditor');
		}

		function createRowControls() {
			canvas.find('.row').each(function() {
				var row = $(this);
				if (row.find('> .ge-tools-drawer').length) { return; }

				var drawer = $('<div class="ge-tools-drawer" />').prependTo(row);
				createTool(drawer, 'Move', 'ge-move', 'fa fa-arrows-alt');
				createTool(drawer, 'Settings', '', 'fa fa-cog', function() {
					details.toggle();
				});
				settings.row_tools.forEach(function(t) {
					createTool(drawer, t.title || '', t.className || '', t.iconClass || 'fa fa-wrench', function() {
						t.click(row);
					});
				});
				createTool(drawer, 'Remove row', '', 'fa fa-trash-alt', function() {
					if (window.confirm('Delete row?')) {
						row.slideUp(function() {
							row.remove();
						});
					}
				});
				createTool(drawer, 'Add column', 'ge-add-column', 'fa fa-plus-circle', function() {
					row.append(createColumn(MAX_COL_SIZE));
					init();
				});

				var details = createDetails(row, settings.row_classes).appendTo(drawer);
			});
		}

		function createColControls() {
			canvas.find('.column').each(function() {
				var col = $(this);
				if (col.find('> .ge-tools-drawer').length) { return; }

				var drawer = $('<div class="ge-tools-drawer" />').prependTo(col);

				createTool(drawer, 'Move', 'ge-move', 'fa fa-arrows-alt');

				createTool(drawer, 'Make column narrower\n(hold shift for min)', 'ge-decrease-col-width', 'fa fa-minus', function(e) {
					var colSizes = settings.valid_col_sizes;
					var curColClass = colClasses[curColClassIndex];
					var curColSizeIndex = colSizes.indexOf(getColSize(col, curColClass));
					var newSize = colSizes[clamp(curColSizeIndex - 1, 0, colSizes.length - 1)];
					if (e.shiftKey) {
						newSize = colSizes[0];
					}
					setColSize(col, curColClass, Math.max(newSize, 1));
				});

				createTool(drawer, 'Make column wider\n(hold shift for max)', 'ge-increase-col-width', 'fa fa-plus', function(e) {
					var colSizes = settings.valid_col_sizes;
					var curColClass = colClasses[curColClassIndex];
					var curColSizeIndex = colSizes.indexOf(getColSize(col, curColClass));
					var newColSizeIndex = clamp(curColSizeIndex + 1, 0, colSizes.length - 1);
					var newSize = colSizes[newColSizeIndex];
					if (e.shiftKey) {
						newSize = getColSize(col) + getColumnSpare(col.parent());
					}
					setColSize(col, curColClass, Math.min(newSize, MAX_COL_SIZE));
				});

				createTool(drawer, 'Settings', '', 'fa fa-cog', function() {
					details.toggle();
				});

				settings.col_tools.forEach(function(t) {
					createTool(drawer, t.title || '', t.className || '', t.iconClass || 'fa fa-wrench', function() {
						t.click(col);
					});
				});

				createTool(drawer, 'Remove col', '', 'fa fa-trash-alt', function() {
					if (window.confirm('Delete column?')) {
						col.animate({
							opacity: 'hide',
							width: 'hide',
							height: 'hide'
						}, 400, function() {
							col.remove();
						});
					}
				});

				createTool(drawer, 'Add row', 'ge-add-row', 'fa fa-plus-circle', function() {
					var row = createRow();
					col.append(row);
					row.append(createColumn(6)).append(createColumn(6));
					init();
				});

				var details = createDetails(col, settings.col_classes).appendTo(drawer);
			});
		}

		function getColumnSpare(row) {
			return MAX_COL_SIZE - getColumnSizes(row);
		}

		function getColumnSizes(row) {
			var layout = colClasses[curColClassIndex];
			var size = 0;
			row.find('> [class*="'+layout+'"]').each(function(){
				size += getColSize($(this));
			});
			return size;
		}

		function createTool(drawer, title, className, iconClass, eventHandlers) {
			var tool = $('<a title="' + title + '" class="' + className + '"><i class="' + iconClass + '"></i></a>')
				.appendTo(drawer);
			if (typeof eventHandlers == 'function') {
				tool.on('click', eventHandlers);
			}
			if (typeof eventHandlers == 'object') {
				$.each(eventHandlers, function(name, func) {
					tool.on(name, func);
				});
			}
		}

		function createDetails(container, cssClasses) {
			var detailsDiv = $('<div class="ge-details" />');

			$('<input class="ge-id" />')
				.attr('placeholder', 'id')
				.val(container.attr('id'))
				.attr('title', 'Set a unique identifier')
				.appendTo(detailsDiv)
				.change(function() {
					container.attr('id', this.value);
				})
			;

			var classGroup = $('<div class="btn-group" />').appendTo(detailsDiv);
			cssClasses.forEach(function(rowClass) {
				var btn = $('<a class="btn btn-sm btn-default" />')
					.html(rowClass.label)
					.attr('title', rowClass.title ? rowClass.title : 'Toggle "' + rowClass.label + '" styling')
					.toggleClass('active btn-primary', container.hasClass(rowClass.cssClass))
					.on('click', function() {
						btn.toggleClass('active btn-primary');
						container.toggleClass(rowClass.cssClass, btn.hasClass('active'));
					})
					.appendTo(classGroup)
				;
			});

			return detailsDiv;
		}

		function addAllColClasses() {
			canvas.find('.column, div[class*="col-"]').each(function() {
				var col = $(this);

				var size = 2;
				var sizes = getColSizes(col);
				if (sizes.length) {
					size = sizes[0].size;
				}

				var elemClass = col.attr('class');
				colClasses.forEach(function(colClass) {
					if (elemClass.indexOf(colClass) == -1) {
						col.addClass(colClass + size);
					}
				});

				col.addClass('column');
			});
		}

		/**
		 * Return the column size for colClass, or a size from a different
		 * class if it was not found.
		 * Returns null if no size whatsoever was found.
		 */
		function getColSize(col, colClass) {
			var sizes = getColSizes(col);
			for (var i = 0; i < sizes.length; i++) {
				if (sizes[i].colClass == colClass) {
					return sizes[i].size;
				}
			}
			if (sizes.length) {
				return sizes[0].size;
			}
			return null;
		}

		function getColSizes(col) {
			var result = [];
			colClasses.forEach(function(colClass) {
				var re = new RegExp(colClass + '(\\d+)', 'i');
				if (re.test(col.attr('class'))) {
					result.push({
						colClass: colClass,
						size: parseInt(re.exec(col.attr('class'))[1])
					});
				}
			});
			return result;
		}

		function setColSize(col, colClass, size) {
			var re = new RegExp('(' + colClass + '(\\d+))', 'i');
			var reResult = re.exec(col.attr('class'));
			if (reResult && parseInt(reResult[2]) !== size) {
				col.switchClass(reResult[1], colClass + size, 50);

			} else {
				col.addClass(colClass + size);
			}
		}

		function makeSortable() {
			canvas.find('.row').sortable({
				items: '> .column',
				connectWith: '.ge-canvas .row',
				handle: '> .ge-tools-drawer .ge-move',
				start: sortStart,
				tolerance: 'pointer',
				helper: 'clone',
			});
			canvas.add(canvas.find('.column')).sortable({
				items: '> .row, > .ge-content',
				connectWith: '.ge-canvas, .ge-canvas .column',
				handle: '> .ge-tools-drawer .ge-move',
				start: sortStart,
				helper: 'clone',
			});

			function sortStart(e, ui) {
				ui.placeholder.css({ height: ui.item.outerHeight()});
			}
		}

		function removeSortable() {
			canvas.add(canvas.find('.column')).add(canvas.find('.row')).sortable('destroy');
		}

		function createRow() {
			return $('<div class="row" />');
		}

		function createColumn(size) {
			return $('<div/>')
				.addClass(colClasses.map(function(c) { return c + size; }).join(' '))
				.append(createDefaultContentWrapper().html(
					getRTE(settings.content_types[0]).initialContent)
				)
			;
		}

		/**
		 * Run custom content filter on init and deinit
		 */
		function runFilter(isInit) {
			if (settings.custom_filter.length) {
				$.each(settings.custom_filter, function(key, func) {
					if (typeof func == 'string') {
						func = window[func];
					}

					func(canvas, isInit);
				});
			}
		}

		/**
		 * Wrap column content in <div class="ge-content"> where neccesary
		 */
		function wrapContent() {
			canvas.find('.column').each(function() {
				var col = $(this);
				var contents = $();
				col.children().each(function() {
					var child = $(this);
					if (child.is('.row, .ge-tools-drawer, .ge-content')) {
						doWrap(contents);
					} else {
						contents = contents.add(child);
					}
				});
				doWrap(contents);
			});
		}
		function doWrap(contents) {
			if (contents.length) {
				var container = createDefaultContentWrapper().insertAfter(contents.last());
				contents.appendTo(container);
				contents = $();
			}
		}

		function createDefaultContentWrapper() {
			return $('<div/>')
				.addClass('ge-content ge-content-type-' + settings.content_types[0])
				.attr('data-ge-content-type', settings.content_types[0])
			;
		}

		function switchLayout(colClassIndex) {
			curColClassIndex = colClassIndex;

			var layoutClasses = ['x4l', 'x3l', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
			layoutClasses.forEach(function(cssClass, i) {
				canvas.toggleClass(cssClass, i == colClassIndex);
			});
		}

		function getRTE(type) {
			return $.fn.gridEditor.RTEs[type];
		}

		function clamp(input, min, max) {
			return Math.min(max, Math.max(min, input));
		}

		function setClassFor(row, className, begin, end) {
			var display = displayModes[curColClassIndex];
			var displayClassName = begin + display + end;

			var del = row.hasClass(displayClassName);
			if (del) {
				row.removeClass(displayClassName);
				return;
			}

			row.addClass(displayClassName);

			var all = true;
			for (var i = 0; i < displayModes.length; i++) {
				var cur = displayModes[i];
				var curDisplay = begin + cur + end;
				if (!row.hasClass(curDisplay)) {
					all = false;
				}
			}
			if (all) {
				for (var i = 0; i < displayModes.length; i++) {
					var cur = displayModes[i];
					var curDisplay = begin + cur + end;
					row.removeClass(curDisplay);
				}
				row.addClass(className);
			} else if (row.hasClass(className)) {
				row.removeClass(className);
			}
		}

		baseElem.data('grideditor', {
			init: init,
			deinit: deinit,
			remove: remove,
		});

	});

	return self;

};

$.fn.gridEditor.RTEs = {};

})(jQuery);

(function($) {
	$.fn.gridEditor.RTEs.tinymce = {
		init: function(settings, contentAreas) {
			if (!window.tinymce) {
				console.error('tinyMCE not available! Make sure you loaded the tinyMCE js file.');
			}
			if (!contentAreas.tinymce) {
				console.error('tinyMCE jquery integration not available! Make sure you loaded the jquery integration plugin.');
			}
			var self = this;
			contentAreas.each(function() {
				var contentArea = $(this);
				if (!contentArea.hasClass('active')) {
					if (contentArea.html() == self.initialContent) {
						contentArea.html('');
					}
					contentArea.addClass('active');
					var configuration = $.extend(
						{},
						(settings.tinymce && settings.tinymce.config ? settings.tinymce.config : {}),
						{
							inline: true,
							oninit: function(editor) {
								// Bring focus to text field
								$('#' + editor.settings.id).focus();
								
								// Call original oninit function, if one was passed in the config
								var callback;
								try {
									callback = settings.tinymce.config.oninit;
								} catch (err) {
									// No callback passed
								}
								
								if (callback) {
									callback.call(this);
								}
							}
						}
					);
					var tiny = contentArea.tinymce(configuration);
				}
			});
		},

		deinit: function(settings, contentAreas) {
			contentAreas.filter('.active').each(function() {
				var contentArea = $(this);
				var tiny = contentArea.tinymce();
				if (tiny) {
					tiny.remove();
				}
				contentArea
					.removeClass('active')
					.removeAttr('id')
					.removeAttr('style')
					.removeAttr('spellcheck')
				;
			});
		},

		initialContent: '<p>Lorem ipsum dolores</p>',
	};
})(jQuery);
