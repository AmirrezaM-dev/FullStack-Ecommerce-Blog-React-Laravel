$(document).on("click", ".solo_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-solo)").collapse("hide")).done(() => {
		$("#accordion-1-solo").collapse("show");
	});
});
$(document).on("click", ".rank_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-rank)").collapse("hide")).done(() => {
		$("#accordion-1-rank").collapse("show");
	});
});
$(document).on("click", ".duo_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-duo)").collapse("hide")).done(() => {
		$("#accordion-1-duo").collapse("show");
	})
});
$(document).on("click", ".win_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-win)").collapse("hide")).done(() => {
		$("#accordion-1-win").collapse("show");
	})
});
$(document).on("click", ".placement-matches_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-placement-matches)").collapse("hide")).done(() => {
		$("#accordion-1-placement-matches").collapse("show");
	})
});
$(document).on("click", ".coaching_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-coaching)").collapse("hide")).done(() => {
		$("#accordion-1-coaching").collapse("show");
	})
});
$(document).on("click", ".clash_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-clash)").collapse("hide")).done(() => {
		$("#accordion-1-clash").collapse("show");
	})
});
$(document).on("click", ".normal-matches_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-normal-matches)").collapse("hide")).done(() => {
		$("#accordion-1-normal-matches").collapse("show");
	})
});
$(document).on("click", ".unrated-matches_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-unrated-matches)").collapse("hide")).done(() => {
		$("#accordion-1-unrated-matches").collapse("show");
	})
});
$(document).on("click", ".champion-mastery_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-champion-mastery)").collapse("hide")).done(() => {
		$("#accordion-1-champion-mastery").collapse("show");
	})
});
$(document).on("click", ".leveling_collapser", () => {
	$.when($(".panel-collapse.show:not(#accordion-1-leveling)").collapse("hide")).done(() => {
		$("#accordion-1-leveling").collapse("show");
	})
});
$(document).on("click", ".uncollapser", () => {
	$(".panel-collapse.show").collapse("hide");
});
$(document).on("click", ".collapser", (e) => {
	if ($(e.target).prop("tagName") === "A") {
		$(".panel-collapse.show").collapse("hide");
		$("#" + $(e.target).parent().next().attr("id")).collapse("show");
	} else if ($(e.target).prop("tagName") === "IMG") {
		$(".panel-collapse.show").collapse("hide");
		$("#" + $(e.target).parent().parent().next().attr("id")).collapse("show");
	}
});