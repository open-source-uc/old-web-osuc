$(function() {
	let loading = {
		show: function() {
			$("body").append("<div class='main-loading'></div>");
		},
		hide: function() {
			$(".main-loading").remove();
		}
	}
	
	$("[data-bg]").each(function() {
		let $this = $(this),
				$bg = $this.attr("data-bg");

		$this.css({
			backgroundImage: 'url('+$bg+')',
			backgroundPosition: 'center',
			backgroundAttachment: 'fixed',
			backgroundSize: 'center'
		});
		$this.prepend("<div class='overlay'></div>");
	});

	$(".smooth-link").click(function() {
		let $this = $(this),
				$target = $($this.attr("href"));
		$("html, body").animate({
			scrollTop: $target.offset().top - ($(".main-navbar").outerHeight() - 1)
		});

		return false;
	});

	$(window).scroll(function() {
		let $this = $(this);
		if($this.scrollTop() > $(".hero").outerHeight() - 150) {
			$(".main-navbar").addClass("bg-dark");
		}else{
			$(".main-navbar").removeClass("bg-dark");
		}

		$("section").each(function() {
			if($this.scrollTop() >= ($(this).offset().top - $(".main-navbar").outerHeight())) {
				$(".smooth-link").parent().removeClass("active");
				$(".smooth-link[href='#"+$(this).attr("id")+"']").parent().addClass('active');
			}
		});
	});

	function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}

	$("[data-toggle=read]").click(function() {
		let $this = $(this),
				$id = $this.attr("id");
		
		var $project_id = $(this).attr("data-id") ; 

		let $element = '<div class="article-read">';
				$element += '<div class="article-read-inner">';
				$element += '<div class="article-back">';
				$element += '<a class="btn btn-outline-primary"><i class="ion ion-chevron-left"></i> Back</a>';
				$element += '</div>';
				$element += '<h1 class="article-title">{title}</h1>';
				$element += '<div class="article-metas">';
				$element += '<div class="meta">';
				$element += '	{date}';
				$element += '</div>';
				$element += '<div class="meta">';
				$element += '	{category}';
				$element += '</div>';
				$element += '<div class="meta">';
				$element += '	{author}';
				$element += '</div>';
				$element += '</div>';
				$element += '<figure class="article-picture"><img src="{picture}"></figure>';
				$element += '<div class="article-content">';
				$element += '{content}';
				$element += '</div>';
				$element += '</div>';
				$element += '</div>';

		$.ajax({
			url: "mock/article.json",
			dataType: 'json',
			beforeSend: function() {
				loading.show();
			},
			complete: function() {
				loading.hide();
			},
			success: function(data) {
				let reg = /{([a-zA-Z0-9]+)}/g,
						res = [],
						element = $element;

				console.debug($project_id);	
				var selectedObject = filterById(data.projects, $project_id);
				
				console.debug(data.projects);	
				console.debug(data.projects[$project_id-1]);	
				console.debug(selectedObject);	

				if(selectedObject === undefined) {
					console.debug("selectedObject is undefined, can't find a matching id in article.json");		
					return false;							
				} else {
					$("body").css({
						overflow: "hidden"
					});					
					while(match = reg.exec($element)) {
						element = element.replace('{' + match[1] + '}', selectedObject[match[1]]);
					}

					$("body").prepend(element);
					$(".article-read").fadeIn();
					$(document).on("click", ".article-back .btn", function() {
						$(".article-read").fadeOut(function() {
							$(".article-read").remove();
							$("body").css({
								overflow: 'auto'
							});
						});
						return false;
					});
				}
			}
		});

		return false;
	});
});
