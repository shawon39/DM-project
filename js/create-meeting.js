$(document).ready(function() {
	let obj = {
		agendas: [],
		participants: []
	};

	$("#next1").on("click", function(e) {
		e.preventDefault();
		infoToAgenda();
	});

	$("#next2").on("click", function(e) {
		e.preventDefault();
		agendaToParticipants();
	});

	$("#next3").on("click", function(e) {
		e.preventDefault();
		participantsToPublish();
	});

	$("#add-agenda").on("click", function(e) {
		e.preventDefault();
		$("#agenda-box").empty();

		obj.agendas.push(createAgenda());

		obj.agendas.sort(function(a, b) {
			return parseInt(a.order) - parseFloat(b.order);
		});

		obj.agendas.map(function(agenda) {
			$("#agenda-box").append(generateTemplate(agenda));
		});
	});

	$("#addAll").on("click", function(e) {
		e.preventDefault();
		$(".case").prop("checked", true);
	});

	$(document).on("click", ".del", function(e) {
		let elementId = $(this)
			.parent()
			.attr("data-field");

		obj.agendas = obj.agendas.filter(function(item) {
			return item.id != elementId ? true : false;
		});

		$("#agenda-box").empty();

		obj.agendas.map(function(item) {
			$("#agenda-box").append(generateTemplate(item));
		});
	});

	function infoToAgenda() {
		// Changing View
		$("#tabsJustified")
			.find("a.nav-link.active")
			.removeClass("active show");
		$("#tabsJustified")
			.find("a.nav-link.agenda")
			.addClass("active show");
		$("#tabsJustifiedContent")
			.find("div.tab-pane")
			.removeClass("active show");
		$("#tabsJustifiedContent")
			.find("div.tab-pane.agenda")
			.addClass("active show");

		// Updating object info
		(obj.meetingTitle = $("#meetingTitle").val()),
			(obj.meetingType = $("#meetingType").val()),
			(obj.venue = $("#venue").val()),
			(obj.meetingDetails = $("#meetingDetails").val()),
			(obj.notes = $("#notes").val());
	}

	function agendaToParticipants() {
		// Changing View
		$("#tabsJustified")
			.find("a.nav-link.active")
			.removeClass("active show");
		$("#tabsJustified")
			.find("a.nav-link.participants")
			.addClass("active show");
		$("#tabsJustifiedContent")
			.find("div.tab-pane")
			.removeClass("active show");
		$("#tabsJustifiedContent")
			.find("div.tab-pane.participants")
			.addClass("active show");
	}

	function participantsToPublish() {
		// Changing View

		$("#tabsJustified")
			.find("a.nav-link.active")
			.removeClass("active show");
		$("#tabsJustified")
			.find("a.nav-link.publish")
			.addClass("active show");
		$("#tabsJustifiedContent")
			.find("div.tab-pane")
			.removeClass("active show");
		$("#tabsJustifiedContent")
			.find("div.tab-pane.publish")
			.addClass("active show");

		$(".case:checkbox:checked").each(function() {
			let people = {
				id: $(this).attr("data-id"),
				name: $(this)
					.parent()
					.next()
					.attr("data-name"),
				email: $(this)
					.parent()
					.next()
					.next()
					.attr("data-email")
			};

			obj.participants.push(people);
		});

		console.log(obj);
	}

	function createAgenda() {
		let agenda = {};

		agenda.title = $("#agenda-title").val();
		agenda.summary = $("#agenda-summary").val();
		agenda.order = $("#agenda-order").val();
		agenda.file = $("#uploadAgenda").val();
		agenda.allowComment = $("#allow").is(":checked");
		agenda.id = createRandomWord();

		return agenda;
	}

	function createRandomWord(length = 7) {
		var consonants = "bcdfghjlmnpqrstv",
			vowels = "aeiou",
			rand = function(limit) {
				return Math.floor(Math.random() * limit);
			},
			i,
			word = "",
			length = parseInt(length, 10),
			consonants = consonants.split(""),
			vowels = vowels.split("");
		for (i = 0; i < length / 2; i++) {
			var randConsonant = consonants[rand(consonants.length)],
				randVowel = vowels[rand(vowels.length)];
			word += i === 0 ? randConsonant.toUpperCase() : randConsonant;
			word += i * 2 < length - 1 ? randVowel : "";
		}
		return word;
	}

	function generateTemplate(item) {
		return `
            <div class="col-md-6">
                <div class="card border-primary mb-3">
                    <div class="card-header d-flex justify-content-between">
                        <h5 style="margin: 5px 0px"><a data-toggle="collapse" href="#${
													item.id
												}">${item.order}. ${item.title}</a></h5>
                        <div class="btn-group" data-field="${
													item.id
												}" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-secondary"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            <button type="button" class="btn btn-secondary del"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div class="collapse" id="${item.id}">
                        <div class="card-body">
                            <p class="card-text text-primary">${
															item.summary
														}</p>
                            <div class="d-flex justify-content-between">
                                <a href="${
																	item.file
																}" class="text-dark"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a>
                                <p class="m-0">${
																	item.allowComment
																		? "Comment Allowed"
																		: "Comment Disallowed"
																}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
	}

	function generateTemplate2() {
		return `

        `;
	}
});
