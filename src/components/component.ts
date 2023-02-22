// npm i --save-dev bootstrap-confirmation2
// https://www.npmjs.com/package/bootstrap-confirmation2

export class RpgData {
	SUM_LIST: number[] = [];
	D_LIST: number[] = [];
	DATA: object = {};
	historyLines: string[] = [];

	save() {
		localStorage.setItem("rggdata", JSON.stringify(this));
		console.log("RpgData.save: " + JSON.stringify(this));
	}
}

const rpgData = new RpgData();
const SUCCESSTEXT = "SUCCESS";
const FAILTEXT = "FAIL";

export class Component {
	window_localStorage_getItem(key: string): string | null {
		const v1 = (rpgData.DATA as any)[key];
		//const v2 = window.localStorage.getItem(key);
		//console.log("window_localStorage_getItem: " + key + " v1:" + v1 + " v2:" + v2);
		//return v2;
		return v1;
	}

	window_localStorage_setItem(key: string, value: string): void {
		(rpgData.DATA as any)[key] = value;
		rpgData.save()
		//window.localStorage.setItem(key, value);
		//console.log("window_localStorage_setItem: " + key + " v1:" + value + " json:" + JSON.stringify(rpgData.DATA));
	}

	init(): void {
		{
			const rggdata1: string | null = localStorage.getItem("rggdata");
			if (rggdata1) {
				console.log("RpgData.init: " + rggdata1);
				const rggdata2 = JSON.parse(rggdata1);
				rpgData.SUM_LIST = rggdata2.SUM_LIST;
				rpgData.D_LIST = rggdata2.D_LIST;
				rpgData.DATA = rggdata2.DATA;
				rpgData.historyLines = rggdata2.historyLines;
				if (rpgData.historyLines.length > 0) {
					$("#LAST_HISTORY").html(rpgData.historyLines[rpgData.historyLines.length - 1]);
					rpgData.historyLines.forEach((historyLine: string) => {
						$("#FULL_HISTORY").prepend("<li class='list-group-item' data-type='array-item'>" + historyLine + "</li>");
					});
				}
			}
		}
		{
			const MINIMUM: string | null = this.window_localStorage_getItem("MINIMUM");
			if (MINIMUM != null && (+MINIMUM) > 0) {
				$("#MINIMUM").val(MINIMUM);
				$("#MINIMUM").attr('data-slider-value', MINIMUM);
				$("#MINIMUMVal").text(MINIMUM);
			}
			($("#MINIMUM") as any).slider();
			$("#MINIMUM").on("slide", (slideEvt: any) => {
				$("#MINIMUMVal").text(slideEvt.value);
			});
		}
		{
			const FLAT: string | null = this.window_localStorage_getItem("FLAT");
			if (FLAT != null && (+FLAT) > 0) {
				$("#FLAT").val(FLAT);
				$("#FLAT").attr('data-slider-value', FLAT);
				$("#FLATVal").text(FLAT);
			}
			($("#FLAT") as any).slider();
			$("#FLAT").on("slide", (slideEvt: any) => {
				$("#FLATVal").text(slideEvt.value);
			});
		}
		{
			const SKILL: string | null = this.window_localStorage_getItem("SKILL");
			if (SKILL != null) {
				(<HTMLInputElement>document.getElementById("SKILL")).value = SKILL;
				console.log("restoreSkill:" + SKILL);
			}
		}
		{
			const TABSVIEW: string | null = this.window_localStorage_getItem("TABSVIEW");
			if (TABSVIEW != null && TABSVIEW == "true") {
				console.log("restore TABSVIEW: TRUE");
				$("#TABSVIEW").prop("checked", true);
				$("#TABSVIEW_PARENT").removeClass("tabsviewoff");
			} else {
				console.log("restore TABSVIEW: FALSE");
				$("#TABSVIEW").prop("checked", false);
				$("#TABSVIEW_PARENT").addClass("tabsviewoff");
			}
		}
		{
			const W40MODE: string | null = this.window_localStorage_getItem("W40MODE");
			if (W40MODE != null && W40MODE == "true") {
				$("#W40MODE").prop("checked", true);
				$("#TABSVIEW_PARENT").addClass("w40kmode");
			} else {
				$("#W40MODE").prop("checked", false);
				$("#TABSVIEW_PARENT").removeClass("w40kmode");
			}
		}
		{
			const SUM: string | null = this.window_localStorage_getItem("SUM");
			if (SUM != null && SUM == "true") {
				$("#SUM").prop("checked", true);
			} else {
				$("#SUM").prop("checked", false);
			}
		}
		{
			const DEGREESV_MIN: string | null = this.window_localStorage_getItem("DEGREESV_MIN");
			if (DEGREESV_MIN != null && DEGREESV_MIN == "true") {
				$("#DEGREESV_MIN").prop("checked", true);
			} else {
				$("#DEGREESV_MIN").prop("checked", false);
			}
		}
		{
			const REROLLLOWEST: string | null = this.window_localStorage_getItem("REROLLLOWEST");
			if (REROLLLOWEST != null && REROLLLOWEST == "true") {
				$("#REROLLLOWEST").prop("checked", true);
			} else {
				$("#REROLLLOWEST").prop("checked", false);
			}
		}
		{
			const SHOWFORMULA: string | null = this.window_localStorage_getItem("SHOWFORMULA");
			if (SHOWFORMULA != null && SHOWFORMULA == "true") {
				$("#SHOWFORMULA").prop("checked", true);
				$("#FORMULAPARENT").css({
					"display": "inherit"
				});
			} else {
				$("#SHOWFORMULA").prop("checked", false);
				$("#FORMULAPARENT").css({
					"display": "none"
				});
			}
		}
		{
			const LASMASTERY: string | null = this.window_localStorage_getItem("LASMASTERY");
			if (LASMASTERY != null && LASMASTERY == "true") {
				$("#LASMASTERY").prop("checked", true);
			} else {
				$("#LASMASTERY").prop("checked", false);
			}
		}
		{
			$("#SHOWFORMULA").change((ev: JQuery.Event) => {
				this.window_localStorage_setItem("SHOWFORMULA", $("#SHOWFORMULA").prop("checked") ? "true" : "false");
				const SHOWFORMULA: string | null = this.window_localStorage_getItem("SHOWFORMULA");
				if ($("#SHOWFORMULA").prop("checked")) {
					console.log("set SHOWFORMULA: TRUE");
					$("#FORMULAPARENT").css({
						"display": "inherit"
					});
				} else {
					console.log("set SHOWFORMULA: FALSE");
					$("#FORMULAPARENT").css({
						"display": "none"
					});
				}
			});
		}
		{
			$("#FLAT").change((ev: JQuery.Event) => {
				const FLAT_FIELD: JQuery<HTMLInputElement> = $("#FLAT");
				const FLAT_FIELD_VAL = FLAT_FIELD.val();
				if (FLAT_FIELD_VAL) {
					this.window_localStorage_setItem("FLAT", FLAT_FIELD_VAL.toString());
				}
				const FLAT: string | null = this.window_localStorage_getItem("FLAT");
				console.log("set FLAT:" + FLAT);
			});
			$("#MINIMUM").change((ev: JQuery.Event) => {
				const MINIMUM_FIELD: JQuery<HTMLInputElement> = $("#MINIMUM");
				const MINIMUM_FIELD_VAL = MINIMUM_FIELD.val();
				if (MINIMUM_FIELD_VAL) {
					this.window_localStorage_setItem("MINIMUM", MINIMUM_FIELD_VAL.toString());
				}
				const MINIMUM: string | null = this.window_localStorage_getItem("MINIMUM");
				console.log("set MINIMUM:" + MINIMUM);
			});
			$("#REROLLLOWEST").change((ev: JQuery.Event) => {
				this.window_localStorage_setItem("REROLLLOWEST", $("#REROLLLOWEST").prop("checked") ? "true" : "false");
				const REROLLLOWEST: string | null = this.window_localStorage_getItem("REROLLLOWEST");
				console.log("set REROLLLOWEST:" + REROLLLOWEST);
			});
			$("#LASMASTERY").change((ev: JQuery.Event) => {
				this.window_localStorage_setItem("LASMASTERY", $("#LASMASTERY").prop("checked") ? "true" : "false");
				const LASMASTERY: string | null = this.window_localStorage_getItem("LASMASTERY");
				console.log("set LASMASTERY:" + LASMASTERY);
			});
			$("#SUM").change((ev: JQuery.Event) => {
				this.window_localStorage_setItem("SUM", $("#SUM").prop("checked") ? "true" : "false");
				const SUM: string | null = this.window_localStorage_getItem("SUM");
				console.log("set SUM:" + SUM);
			});
			$("#DEGREESV_MIN").change((ev: JQuery.Event) => {
				this.window_localStorage_setItem("DEGREESV_MIN", $("#DEGREESV_MIN").prop("checked") ? "true" : "false");
				const DEGREESV_MIN: string | null = this.window_localStorage_getItem("DEGREESV_MIN");
				console.log("set DEGREESV_MIN:" + DEGREESV_MIN);
			});
			$("#TABSVIEW").change((ev: JQuery.Event) => {
				$("#TABSVIEW_PARENT").toggleClass("tabsviewoff");
				this.window_localStorage_setItem("TABSVIEW", $("#TABSVIEW").prop("checked") ? "true" : "false");
				const TABSVIEW: string | null = this.window_localStorage_getItem("TABSVIEW");
				console.log("set TABSVIEW:" + TABSVIEW);
			});
			$("#W40MODE").change((ev: JQuery.Event) => {
				$("#TABSVIEW_PARENT").toggleClass("w40kmode");
				this.window_localStorage_setItem("W40MODE", $("#W40MODE").prop("checked") ? "true" : "false");
				const W40MODE: string | null = this.window_localStorage_getItem("W40MODE");
				console.log("set W40MODE:" + W40MODE);
			});
		}
		{
			($('[data-toggle="popover"]') as any).popover({
				"trigger": "focus",
				"html": true
			});
		}
		{
			/*($("[data-toggle=confirmation]") as any).confirmation({
				rootSelector: "[data-toggle=confirmation]",
			});*/
			($('#clearLatest') as any).confirmation({
				rootSelector: '#clearLatest',
				onConfirm: () => {
					this.clearLatest();
				}
			});
			($('#clearSum') as any).confirmation({
				rootSelector: '#clearSum',
				onConfirm: () => {
					this.clearSum();
				}
			});
			($('#clearHistory') as any).confirmation({
				rootSelector: '#clearHistory',
				onConfirm: () => {
					this.clearHistory();
				}
			});
		}
		{
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const _this = this;
			$("#SKILL").change((ev: JQuery.Event) => {
				_this.change();
				_this.saveSkill();
			});
			$("#SKILL").keyup((ev: JQuery.Event) => {
				_this.change();
				_this.saveSkill();
			});
			$("#ROLL").change((ev: JQuery.Event) => {
				const ROLL_FIELD: JQuery<HTMLInputElement> = $("#ROLL");
				const ROLL_FIELD_VAL = ROLL_FIELD.val();
				if (ROLL_FIELD_VAL) {
					_this.rollSet100(Number(ROLL_FIELD_VAL));
				}
			});
			$("#ROLL").keyup((ev: JQuery.Event) => {
				if (/*typeof myVar !== 'undefined' &&*/ ev != null && (ev.key === "Enter" || ev.keyCode === 13)) {
					const ROLL_FIELD: JQuery<HTMLInputElement> = $("#ROLL");
					const ROLL_FIELD_VAL = ROLL_FIELD.val();
					if (ROLL_FIELD_VAL) {
						_this.rollSet100(Number(ROLL_FIELD_VAL));
					}
				} else {
					_this.change();
				}
			});
			$("#FORMULA").change((ev: JQuery.Event) => {
				_this.calcFormula();
			});
			$("#FORMULA").keyup((ev: JQuery.Event) => {
				_this.calcFormula();
			});
		}
		{
			let tt = 0;
			let ttt = 0;
			for (tt = 0; tt < 10000; tt++) {
				ttt += this.getRandomInt(100) + 1;
			}
			console.log("test " + (ttt / 10000));
		}
		{
			document.getElementById("rollRandom100")?.addEventListener("click", (event: MouseEvent) => {
				this.rollRandom100(event);
			});
			document.getElementById("saveFormulaResult")?.addEventListener("click", (event: MouseEvent) => {
				this.saveFormulaResult();
			});
			document.getElementById("ACCURATE_ROLL")?.addEventListener("click", (event: MouseEvent) => {
				this.rollRandomAccurate(10, 'i10');
			});
			$("[rollRandom]").click((event: JQuery.Event) => {
				console.log("event", event);
				const eventTarget: HTMLElement = (event as JQuery.TriggeredEvent).target;
				console.log("eventTarget", eventTarget);
				const max: string | null = eventTarget.getAttribute("rollRandom");
				console.log("max", max);
				if (max) {
					const originalEvent: Event | undefined = (event as JQuery.TriggeredEvent).originalEvent;
					console.log("originalEvent", originalEvent);
					if (originalEvent) {
						this.rollRandom(originalEvent as MouseEvent, Number(max), 'i' + max);
					}
				}
			});
		}
	}

	saveSkill() {
		const SKILL_FIELD: JQuery<HTMLInputElement> = $("#SKILL");
		const SKILL_FIELD_VAL = SKILL_FIELD.val();
		if (SKILL_FIELD_VAL) {
			this.window_localStorage_setItem("SKILL", SKILL_FIELD_VAL.toString());
			console.log("saveSkill:" + SKILL_FIELD_VAL);
		}
	}

	calcFormula() {
		try {
			let FORMULA = $("#FORMULA").val();
			if (FORMULA) {
				console.log(FORMULA);
				FORMULA = FORMULA.toString().replace("x", "*").replace(":", "/").replace("×", "*").replace("÷", "/").replace("+", "+").replace(",", ".");
				console.log(FORMULA);
				const FORMULA_EVAL = eval(FORMULA);
				console.log(FORMULA_EVAL);
				$("#FORMULA_RESULT").text(FORMULA_EVAL);
			}
		} catch (err) {
			console.log(err);
			$("#FORMULA_RESULT").text('?');
		}
	}

	/*string_as_unicode_escape(input: string) {
		function pad_four(iinput: string) {
			const l = iinput.length;
			if (l == 0) return "0000";
			if (l == 1) return "000" + iinput;
			if (l == 2) return "00" + iinput;
			if (l == 3) return "0" + iinput;
			return iinput;
		}

		let output = "";
		for (let i = 0, l = input.length; i < l; i++) output += "\\u" + pad_four(input.charCodeAt(i).toString(16));
		return output;
	}*/

	saveFormulaResult() {
		$("#SKILL").val($("#FORMULA_RESULT").text());
		this.saveSkill();
	}

	clearSum() {
		rpgData.SUM_LIST.splice(0, rpgData.SUM_LIST.length)
		//rpgData.SUM_LIST = [];
		rpgData.D_LIST.splice(0, rpgData.D_LIST.length)
		//rpgData.D_LIST = [];
		rpgData.historyLines.splice(0, rpgData.historyLines.length)
		//rpgData.historyLines = [];
		rpgData.save();
	}

	clearHistory() {
		this.clearSum();
		$("#FULL_HISTORY").html("<!-- -->");
	}

	clearLatest() {
		console.log($("#FULL_HISTORY li:first-of-type").attr('data-type'));
		if ($("#FULL_HISTORY li:first-of-type").attr('data-type') == 'array-item') {
			console.log('last array item removed');
			rpgData.SUM_LIST.pop();
			rpgData.D_LIST.pop();
			rpgData.historyLines.pop();
			rpgData.save();
		}
		$("#FULL_HISTORY li:first-of-type").remove();
	}

	rollRandomAccurate(max: number, input: string) {
		const accurate_dice = $("#ACCURATE_ROLL").attr("accurate-dice");
		console.log('accurate-dice: ' + accurate_dice);
		for (let i = 0; i < Number(accurate_dice); i++) {
			this.rollRandom(null, max, input);
		}
	}

	rollRandom(event: MouseEvent | null, max: number, input: string) {
		let iii = 1;
		if (event) {
			console.log("SHIFT:" + event.shiftKey);
			console.log("CTRL:" + event.ctrlKey);
			if (event.ctrlKey && event.shiftKey) {
				iii = 20;
			} else if (event.ctrlKey) {
				iii = 10;
			} else if (event.shiftKey) {
				iii = 5;
			}
		}
		for (let xi = 0; xi < iii; xi++) {
			this._rollRandom(max, input);
		}
	}

	_rollRandom(max: number, input: string) {
		const rnd = this.getRandomInt(max) + 1;
		(<HTMLInputElement>document.getElementById(input)).value = rnd.toString();
		const isSUM = $("#SUM").prop("checked");
		if (!isSUM) {
			this.clearSum();
		}
		rpgData.SUM_LIST.push(rnd);
		rpgData.D_LIST.push(max);
		rpgData.save();
		const ARR_ALL_EQ = this.checkSameValues(rpgData.D_LIST);
		const tmpW = ARR_ALL_EQ && rpgData.D_LIST[0] == 10 && $("#RESULT").val() == SUCCESSTEXT && $("#W40MODE").prop("checked");
		const withDEGREESV_MIN = tmpW && $("#DEGREESV_MIN").prop("checked");
		const withREROLLLOWEST = $("#REROLLLOWEST").prop("checked");
		const withLASMASTERY = tmpW && $("#LASMASTERY").prop("checked");
		const withMINIMUM = Number($("#MINIMUM").val()) > 0;
		const withFLAT = Number($("#FLAT").val()) > 0;
		console.log("SUM_LIST: " + rpgData.SUM_LIST);
		console.log("D_LIST: " + rpgData.D_LIST);
		let SUM_VALUE = 0;
		let SUM_TEXT = "";
		const CONVERTED_LIST = [...rpgData.SUM_LIST];
		if (withREROLLLOWEST) {
			let LIST_MIN_VALUE = 9999999;
			let LIST_MIN_VALUE_I = 9999999;
			CONVERTED_LIST.forEach((item, index, array) => {
				if (item < LIST_MIN_VALUE) {
					LIST_MIN_VALUE = item;
					LIST_MIN_VALUE_I = index;
				}
			});
			CONVERTED_LIST[LIST_MIN_VALUE_I] = -1;
			console.log("withREROLLLOWEST: " + CONVERTED_LIST);
		}
		if (withMINIMUM) {
			const MINIMUM = Number($("#MINIMUM").val());
			CONVERTED_LIST.forEach((item, index, array) => {
				if (item < MINIMUM && item != -1) {
					CONVERTED_LIST[index] = MINIMUM;
				}
			});
			console.log("withMINIMUM: " + CONVERTED_LIST);
		}
		if (withDEGREESV_MIN) {
			let LIST_MIN_VALUE = 9999999;
			let LIST_MIN_VALUE_I = 9999999;
			CONVERTED_LIST.forEach((item, index, array) => {
				if (item < LIST_MIN_VALUE && item != -1) {
					LIST_MIN_VALUE = item;
					LIST_MIN_VALUE_I = index;
				}
			});
			const MIN_VALUE: number = Math.min(10, Number($("#DEGREESV").val()));
			if (LIST_MIN_VALUE < MIN_VALUE) {
				CONVERTED_LIST[LIST_MIN_VALUE_I] = MIN_VALUE;
			}
			console.log("withDEGREESV_MIN: " + CONVERTED_LIST);
		}
		SUM_TEXT = "";
		SUM_VALUE = 0;
		CONVERTED_LIST.forEach((item, index, array) => {
			console.log("item", item, 'index', index, 'array', array, 'rpgData.SUM_LIST[index]', rpgData.SUM_LIST[index], 'CONVERTED_LIST[index]', CONVERTED_LIST[index], 'rpgData.D_LIST[index]', rpgData.D_LIST[index]);
			if (index > 0) {
				SUM_TEXT = SUM_TEXT + " + ";
			}
			if (item == -1) {
				if (ARR_ALL_EQ) {
					SUM_TEXT = SUM_TEXT + "<span class='cross'>" + rpgData.SUM_LIST[index] + "</span>";
				} else {
					SUM_TEXT = SUM_TEXT + "<span class='cross'>" + rpgData.SUM_LIST[index] + "/[D" + rpgData.D_LIST[index] + "]</span>";
				}
			} else {
				if (rpgData.SUM_LIST[index] != item) {
					if (ARR_ALL_EQ) {
						SUM_TEXT = SUM_TEXT + rpgData.SUM_LIST[index] + "&#x21E8;" + item + "";
					} else {
						SUM_TEXT = SUM_TEXT + rpgData.SUM_LIST[index] + "&#x21E8;" + item + "/[D" + rpgData.D_LIST[index] + "]";
					}
				} else {
					if (ARR_ALL_EQ) {
						SUM_TEXT = SUM_TEXT + item;
					} else {
						SUM_TEXT = SUM_TEXT + item + "/[D" + rpgData.D_LIST[index] + "]";
					}
				}
				// CRIT
				if ($("#W40MODE").prop("checked")) {
					if (index == 0 && rpgData.SUM_LIST[index] == 10) {
						SUM_TEXT = SUM_TEXT + "<i style='margin-left:2px;' class='fas fa-meteor text-warning'></i>";
					}
				} else {
					if (rpgData.SUM_LIST[index] == 20 && rpgData.D_LIST[index] == 20) {
						SUM_TEXT = SUM_TEXT + "<i style='margin-left:2px;' class='fas fa-meteor text-warning'></i>";
					}
				}
				SUM_VALUE += item;
			}
		});
		if (withLASMASTERY) {
			const LASMASTERYVAL = Math.floor((Number($("#DEGREESV").val()) - 1) / 2);
			if (LASMASTERYVAL > 0) {
				SUM_VALUE += LASMASTERYVAL;
			}
		}
		if (withFLAT) {
			SUM_VALUE += Number($("#FLAT").val());
		}
		SUM_TEXT = "<span style='width:35px;' class='badge badge-pill badge-info'>" + SUM_VALUE + "</span>" + " = &Sigma;[#" + rpgData.SUM_LIST.length + "](" + SUM_TEXT + ")";
		if (ARR_ALL_EQ) {
			SUM_TEXT = SUM_TEXT + "/[D" + rpgData.D_LIST[0] + "]";
		}
		if (withFLAT) {
			SUM_TEXT = SUM_TEXT + " + " + Number($("#FLAT").val()) + " (Flat Bonus)";
		}
		if (withLASMASTERY) {
			const LASMASTERYVAL = Math.floor((Number($("#DEGREESV").val()) - 1) / 2);
			if (LASMASTERYVAL > 0) {
				SUM_TEXT = SUM_TEXT + " + " + LASMASTERYVAL + " (Las Mastery)";
			}
		}
		const prepre = "<span style='display:inline;color:inherit;font-family:monospace;'>";
		const historyLine = new Date().toLocaleTimeString(this.getNavigatorLanguages()[0]) //
			+
			" &#8669; roll " //
			+
			prepre //
			+
			"<span style='width:35px;' class='badge badge-pill badge-info'>" + ("" + rnd).padStart(3, " ") + "</span>" //
			+
			"</span>" //
			+
			" " //
			+
			prepre //
			+
			(" op D" + max).padStart(6, " ") //
			+
			" &#8669; </span> " //
			+
			SUM_TEXT;
		$("#LAST_HISTORY").html(historyLine);
		$("#FULL_HISTORY").prepend("<li class='list-group-item' data-type='array-item'>" + historyLine + "</li>");
		rpgData.historyLines.push(historyLine);
		rpgData.save();
	}

	checkSameValues(array: number[]) {
		return new Set(array).size == 1;
	}

	rollRandom100(event: MouseEvent) {
		console.log("SHIFT:" + event.shiftKey);
		console.log("CTRL:" + event.ctrlKey);
		let iii;
		if (event.ctrlKey && event.shiftKey) {
			for (iii = 0; iii < 20; iii++) {
				this._rollRandom100();
			}
		} else if (event.ctrlKey) {
			for (iii = 0; iii < 10; iii++) {
				this._rollRandom100();
			}
		} else if (event.shiftKey) {
			for (iii = 0; iii < 5; iii++) {
				this._rollRandom100();
			}
		} else {
			this._rollRandom100();
		}
	}

	_rollRandom100() {
		const rnd = this.getRandomInt(100) + 1;
		$("#ROLL").val(rnd);
		this.rollSet100(rnd);
	}

	rollSet100(rnd: number) {
		this.clearSum();
		this.change();
		const SKILL = Number($("#SKILL").val());
		const SUCCESS = $("#RESULT").val() == SUCCESSTEXT;
		const DEGREESV = $("#DEGREESV").val();
		const d = new Date().toLocaleTimeString(this.getNavigatorLanguages()[0]);
		const prepre = "<span style='display:inline;color:inherit;font-family:monospace;'>";
		const historyLine = d //
			+
			" &#8669; roll " //
			+
			"<span style='width:35px;' class='badge badge-pill badge-info'>" + prepre + "</span>" //
			+
			("" + rnd).padStart(3, " ") //
			+
			"</span>" //
			+
			" op skill " //
			+
			prepre + ("" + SKILL).padStart(3, " ") //
			+
			"</span> &#8669; " //
			+
			(SUCCESS ? //
				" <span style='width:65px;' class='badge badge-pill badge-success'>" + SUCCESSTEXT + "</span>" //
				:
				"<span style='width:65px;' class='badge badge-pill badge-warning'>" + FAILTEXT + "</span>") //
			+
			" met " //
			+
			"<span style='width:35px;' class='badge badge-pill badge-dark'>" //
			+
			DEGREESV //
			+
			"</span> degrees" //
		;
		$("#LAST_HISTORY").html(historyLine);
		$("#FULL_HISTORY").prepend("<li class='list-group-item' data-type='roll-item'>" + historyLine + "</li>");
	}

	getRandomInt(max: number) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	change() {
		const SKILL = Number($("#SKILL").val());
		const ROLL = Number($("#ROLL").val());
		console.log("ROLL<=SKILL :: " + ROLL + "<=" + SKILL + " :: " + (ROLL <= SKILL));
		let DEGREESV;
		let SUCCESS;
		if (ROLL <= SKILL) {
			const diff = (SKILL - ROLL) / 10.0;
			console.log("diff=" + diff);
			DEGREESV = 1 + Math.floor(diff);
			SUCCESS = true;
			console.log(SUCCESSTEXT + " +" + DEGREESV + " DEGREESV");
		} else {
			const diff = (ROLL - SKILL - 1) / 10.0;
			console.log("diff=" + diff);
			DEGREESV = 1 + Math.floor(diff);
			SUCCESS = false;
			console.log(FAILTEXT + " -" + DEGREESV + " DEGREESV");
		}
		$("#RESULT").val(SUCCESS ? SUCCESSTEXT : FAILTEXT);
		if (SUCCESS) {
			$("#RESULT").addClass("bg-success");
			$("#RESULT").removeClass("bg-warning");
			$("#RESULT").addClass("text-white");
			const ACCURATE = Math.min(2, Math.floor(DEGREESV / 2));
			console.log("ACCURATE=" + ACCURATE)
			$("#ACCURATE_ROLL").html("+" + ACCURATE + "D");
			$("#ACCURATE_ROLL").attr("accurate-dice", 1 + ACCURATE);
		} else {
			$("#RESULT").removeClass("bg-success");
			$("#RESULT").addClass("bg-warning");
			$("#RESULT").addClass("text-white");
			$("#ACCURATE_ROLL").html("-");
			$("#ACCURATE_ROLL").attr("accurate-dice", 0);
		}
		$("#DEGREESV").val(DEGREESV);
	}

	getNavigatorLanguages() {
		console.log(navigator.language);
		return navigator.language.split("-");
	}
}
