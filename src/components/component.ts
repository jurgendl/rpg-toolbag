// npm i --save-dev bootstrap-confirmation2
// https://www.npmjs.com/package/bootstrap-confirmation2

export class RpgData {
	SUM_LIST: number[] = [];
	D_LIST: number[] = [];
	historyLines: string[] = [];
	_MINIMUM: string | null = null;

	set MINIMUM(MINIMUM: string) {
		this._MINIMUM = MINIMUM;
		this.save();
	}

	_FLAT: string | null = null;

	set FLAT(FLAT: string) {
		this._FLAT = FLAT;
		this.save();
	}

	_SKILL: string | null = null;

	set SKILL(SKILL: string) {
		this._SKILL = SKILL;
		this.save();
	}

	_TABSVIEW: string | null = null;

	set TABSVIEW(TABSVIEW: string) {
		this._TABSVIEW = TABSVIEW;
		this.save();
	}

	_W40MODE: string | null = null;

	set W40MODE(W40MODE: string) {
		this._W40MODE = W40MODE;
		this.save();
	}

	_SUM: string | null = null;

	set SUM(SUM: string) {
		this._SUM = SUM;
		this.save();
	}

	_DEGREESV_MIN: string | null = null;

	set DEGREESV_MIN(DEGREESV_MIN: string) {
		this._DEGREESV_MIN = DEGREESV_MIN;
		this.save();
	}

	_REROLLLOWEST: string | null = null;

	set REROLLLOWEST(REROLLLOWEST: string) {
		this._REROLLLOWEST = REROLLLOWEST;
		this.save();
	}

	_SHOWFORMULA: string | null = null;

	set SHOWFORMULA(SHOWFORMULA: string) {
		this._SHOWFORMULA = SHOWFORMULA;
		this.save();
	}

	_LASMASTERY: string | null = null;

	set LASMASTERY(LASMASTERY: string) {
		this._LASMASTERY = LASMASTERY;
		this.save();
	}

	save() {
		localStorage.setItem("rggdata", JSON.stringify(this));
		console.log("RpgData.save: " + JSON.stringify(this));
	}
}

const rpgData = new RpgData();
const SUCCESSTEXT = "SUCCESS";
const FAILTEXT = "FAIL";

export class Component {
	$ROLL!: JQuery<HTMLInputElement>;
	$SKILL!: JQuery<HTMLInputElement>;
	$MINIMUM!: JQuery<HTMLInputElement>;
	$FLAT!: JQuery<HTMLInputElement>;
	$TABSVIEW!: JQuery<HTMLInputElement>;
	$REROLLLOWEST!: JQuery<HTMLInputElement>;
	$FORMULA!: JQuery<HTMLInputElement>;
	$SHOWFORMULA!: JQuery<HTMLInputElement>;
	$LASMASTERY!: JQuery<HTMLInputElement>;
	$DEGREESV_MIN!: JQuery<HTMLInputElement>;
	$RESULT!: JQuery<HTMLInputElement>;
	$ACCURATE_ROLL!: JQuery<HTMLInputElement>;
	$LAST_HISTORY!: JQuery<HTMLElement>;
	$FULL_HISTORY!: JQuery<HTMLElement>;
	$FORMULAPARENT!: JQuery<HTMLElement>;
	$TABSVIEW_PARENT!: JQuery<HTMLElement>;
	$W40MODE!: JQuery<HTMLInputElement>;
	$MINIMUMVal!: JQuery<HTMLElement>;
	$FLATVal!: JQuery<HTMLElement>;
	$SUM!: JQuery<HTMLInputElement>;
	$FORMULA_RESULT!: JQuery<HTMLElement>;
	$DEGREESV!: JQuery<HTMLInputElement>;

	init(): void {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const _this = this;
		this.$ROLL = $("#ROLL");
		this.$SKILL = $("#SKILL");
		this.$MINIMUM = $("#MINIMUM");
		this.$FLAT = $("#FLAT");
		this.$TABSVIEW = $("#TABSVIEW");
		this.$REROLLLOWEST = $("#REROLLLOWEST");
		this.$FORMULA = $("#FORMULA");
		this.$SHOWFORMULA = $("#SHOWFORMULA");
		this.$LASMASTERY = $("#LASMASTERY");
		this.$DEGREESV_MIN = $("#DEGREESV_MIN");
		this.$RESULT = $("#RESULT");
		this.$ACCURATE_ROLL = $("#ACCURATE_ROLL");
		this.$LAST_HISTORY = $("#LAST_HISTORY");
		this.$FULL_HISTORY = $("#FULL_HISTORY");
		this.$FORMULAPARENT = $("#FORMULAPARENT");
		this.$TABSVIEW_PARENT = $("#TABSVIEW_PARENT");
		this.$W40MODE = $("#W40MODE");
		this.$MINIMUMVal = $("#MINIMUMVal");
		this.$FLATVal = $("#FLATVal");
		this.$SUM = $("#SUM");
		this.$FORMULA_RESULT = $("#FORMULA_RESULT");
		this.$DEGREESV = $("#DEGREESV");
		{
			const rggdata$: string | null = localStorage.getItem("rggdata");
			if (rggdata$) {
				console.log("RpgData.init: " + rggdata$);
				const rggdata$$ = JSON.parse(rggdata$);
				rpgData.SUM_LIST = rggdata$$.SUM_LIST;
				rpgData.D_LIST = rggdata$$.D_LIST;
				rpgData._MINIMUM = rggdata$$._MINIMUM;
				rpgData._FLAT = rggdata$$._FLAT;
				rpgData._SKILL = rggdata$$._SKILL;
				rpgData._TABSVIEW = rggdata$$._TABSVIEW;
				rpgData._W40MODE = rggdata$$._W40MODE;
				rpgData._SUM = rggdata$$._SUM;
				rpgData._DEGREESV_MIN = rggdata$$._DEGREESV_MIN;
				rpgData._REROLLLOWEST = rggdata$$._REROLLLOWEST;
				rpgData._SHOWFORMULA = rggdata$$._SHOWFORMULA;
				rpgData._LASMASTERY = rggdata$$._LASMASTERY;
				rpgData.historyLines = rggdata$$.historyLines;
				if (rpgData.historyLines && rpgData.historyLines.length > 0) {
					this.$LAST_HISTORY.html(rpgData.historyLines[rpgData.historyLines.length - 1]);
					rpgData.historyLines.forEach((historyLine: string) => {
						this.$FULL_HISTORY.prepend("<li class='list-group-item' data-type='array-item'>" + historyLine + "</li>");
					});
				}
			}
		}
		{
			if (rpgData.MINIMUM != null && (+rpgData.MINIMUM) > 0) {
				this.$MINIMUM.val(rpgData.MINIMUM);
				this.$MINIMUM.attr('data-slider-value', rpgData.MINIMUM);
				this.$MINIMUMVal.text(rpgData.MINIMUM);
			}
			(this.$MINIMUM as any).slider();
			this.$MINIMUM.on("slide", (slideEvt: JQuery.Event) => {
				this.$MINIMUMVal.text((slideEvt as any).value);
			});
		}
		{
			if (rpgData.FLAT != null && (+rpgData.FLAT) > 0) {
				this.$FLAT.val(rpgData.FLAT);
				this.$FLAT.attr('data-slider-value', rpgData.FLAT);
				this.$FLATVal.text(rpgData.FLAT);
			}
			(this.$FLAT as any).slider();
			this.$FLAT.on("slide", (slideEvt: JQuery.Event) => {
				this.$FLATVal.text((slideEvt as any).value);
			});
		}
		{
			if (rpgData.SKILL != null) {
				(<HTMLInputElement>document.getElementById("SKILL")).value = rpgData.SKILL;
				console.log("restoreSkill:" + rpgData.SKILL);
			}
		}
		{
			if (rpgData.TABSVIEW != null && rpgData.TABSVIEW == "true") {
				console.log("restore TABSVIEW: TRUE");
				this.$TABSVIEW.prop("checked", true);
				this.$TABSVIEW_PARENT.removeClass("tabsviewoff");
			} else {
				console.log("restore TABSVIEW: FALSE");
				this.$TABSVIEW.prop("checked", false);
				this.$TABSVIEW_PARENT.addClass("tabsviewoff");
			}
		}
		{
			if (rpgData.W40MODE != null && rpgData.W40MODE == "true") {
				this.$W40MODE.prop("checked", true);
				this.$TABSVIEW_PARENT.addClass("w40kmode");
			} else {
				this.$W40MODE.prop("checked", false);
				this.$TABSVIEW_PARENT.removeClass("w40kmode");
			}
		}
		{
			if (rpgData.SUM != null && rpgData.SUM == "true") {
				this.$SUM.prop("checked", true);
			} else {
				this.$SUM.prop("checked", false);
			}
		}
		{
			if (rpgData.DEGREESV_MIN != null && rpgData.DEGREESV_MIN == "true") {
				this.$DEGREESV_MIN.prop("checked", true);
			} else {
				this.$DEGREESV_MIN.prop("checked", false);
			}
		}
		{
			if (rpgData.REROLLLOWEST != null && rpgData.REROLLLOWEST == "true") {
				this.$REROLLLOWEST.prop("checked", true);
			} else {
				this.$REROLLLOWEST.prop("checked", false);
			}
		}
		{
			if (rpgData.SHOWFORMULA != null && rpgData.SHOWFORMULA == "true") {
				this.$SHOWFORMULA.prop("checked", true);
				this.$FORMULAPARENT.css({
					"display": "inherit"
				});
			} else {
				this.$SHOWFORMULA.prop("checked", false);
				this.$FORMULAPARENT.css({
					"display": "none"
				});
			}
		}
		{
			if (rpgData.LASMASTERY != null && rpgData.LASMASTERY == "true") {
				this.$LASMASTERY.prop("checked", true);
			} else {
				this.$LASMASTERY.prop("checked", false);
			}
		}
		{
			this.$SHOWFORMULA.change((ev: JQuery.Event) => {
				rpgData.SHOWFORMULA = this.$SHOWFORMULA.prop("checked") ? "true" : "false";
				if (this.$SHOWFORMULA.prop("checked")) {
					console.log("set SHOWFORMULA: TRUE");
					this.$FORMULAPARENT.css({
						"display": "inherit"
					});
				} else {
					console.log("set SHOWFORMULA: FALSE");
					this.$FORMULAPARENT.css({
						"display": "none"
					});
				}
			});
		}
		{
			this.$FLAT.change((ev: JQuery.Event) => {
				const FLAT_FIELD_VAL = this.$FLAT.val();
				if (FLAT_FIELD_VAL) {
					rpgData.FLAT = FLAT_FIELD_VAL.toString();
				}
				const FLAT: string | null = rpgData.FLAT;
				console.log("set FLAT:" + FLAT);
			});
			this.$MINIMUM.change((ev: JQuery.Event) => {
				const MINIMUM_FIELD_VAL = this.$MINIMUM.val();
				if (MINIMUM_FIELD_VAL) {
					rpgData.MINIMUM = MINIMUM_FIELD_VAL.toString();
				}
				const MINIMUM: string | null = rpgData.MINIMUM;
				console.log("set MINIMUM:" + MINIMUM);
			});
			this.$REROLLLOWEST.change((ev: JQuery.Event) => {
				rpgData.REROLLLOWEST = this.$REROLLLOWEST.prop("checked") ? "true" : "false";
				const REROLLLOWEST: string | null = rpgData.REROLLLOWEST;
				console.log("set REROLLLOWEST:" + REROLLLOWEST);
			});
			this.$LASMASTERY.change((ev: JQuery.Event) => {
				rpgData.LASMASTERY = this.$LASMASTERY.prop("checked") ? "true" : "false";
				const LASMASTERY: string | null = rpgData.LASMASTERY;
				console.log("set LASMASTERY:" + LASMASTERY);
			});
			this.$SUM.change((ev: JQuery.Event) => {
				rpgData.SUM = this.$SUM.prop("checked") ? "true" : "false";
				const SUM: string | null = rpgData.SUM;
				console.log("set SUM:" + SUM);
			});
			this.$DEGREESV_MIN.change((ev: JQuery.Event) => {
				rpgData.DEGREESV_MIN = this.$DEGREESV_MIN.prop("checked") ? "true" : "false";
				const DEGREESV_MIN: string | null = rpgData.DEGREESV_MIN;
				console.log("set DEGREESV_MIN:" + DEGREESV_MIN);
			});
			this.$TABSVIEW.change((ev: JQuery.Event) => {
				this.$TABSVIEW_PARENT.toggleClass("tabsviewoff");
				rpgData.TABSVIEW = this.$TABSVIEW.prop("checked") ? "true" : "false";
				const TABSVIEW: string | null = rpgData.TABSVIEW;
				console.log("set TABSVIEW:" + TABSVIEW);
			});
			this.$W40MODE.change((ev: JQuery.Event) => {
				this.$TABSVIEW_PARENT.toggleClass("w40kmode");
				rpgData.W40MODE = this.$W40MODE.prop("checked") ? "true" : "false";
				const W40MODE: string | null = rpgData.W40MODE;
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
			this.$SKILL.change((ev: JQuery.Event) => {
				_this.change();
				_this.saveSkill();
			});
			this.$SKILL.keyup((ev: JQuery.Event) => {
				_this.change();
				_this.saveSkill();
			});
			this.$ROLL.change((ev: JQuery.Event) => {
				const ROLL_FIELD_VAL = this.$ROLL.val();
				if (ROLL_FIELD_VAL) {
					_this.rollSet100(Number(ROLL_FIELD_VAL));
				}
			});
			this.$ROLL.keyup((ev: JQuery.Event) => {
				if (/*typeof myVar !== 'undefined' &&*/ ev != null && (ev.key === "Enter" || ev.keyCode === 13)) {
					const ROLL_FIELD_VAL = this.$ROLL.val();
					if (ROLL_FIELD_VAL) {
						_this.rollSet100(Number(ROLL_FIELD_VAL));
					}
				} else {
					_this.change();
				}
			});
			this.$FORMULA.change((ev: JQuery.Event) => {
				_this.calcFormula();
			});
			this.$FORMULA.keyup((ev: JQuery.Event) => {
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
		const SKILL_FIELD_VAL = this.$SKILL.val();
		if (SKILL_FIELD_VAL) {
			rpgData.SKILL = SKILL_FIELD_VAL.toString();
			console.log("saveSkill:" + SKILL_FIELD_VAL);
		}
	}

	calcFormula() {
		try {
			let FORMULA = this.$FORMULA.val();
			if (FORMULA) {
				console.log(FORMULA);
				FORMULA = FORMULA.toString().replace("x", "*").replace(":", "/").replace("×", "*").replace("÷", "/").replace("+", "+").replace(",", ".");
				console.log(FORMULA);
				const FORMULA_EVAL = eval(FORMULA);
				console.log(FORMULA_EVAL);
				this.$FORMULA_RESULT.text(FORMULA_EVAL);
			}
		} catch (err) {
			console.log(err);
			this.$FORMULA_RESULT.text('?');
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
		this.$SKILL.val(this.$FORMULA_RESULT.text());
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
		this.$FULL_HISTORY.html("<!-- -->");
	}

	clearLatest() {
		const $FULL_HISTORY_FIRST = $("#FULL_HISTORY li:first-of-type");
		console.log($FULL_HISTORY_FIRST.attr('data-type'));
		if ($FULL_HISTORY_FIRST.attr('data-type') == 'array-item') {
			console.log('last array item removed');
			rpgData.SUM_LIST.pop();
			rpgData.D_LIST.pop();
			rpgData.historyLines.pop();
			rpgData.save();
		}
		$FULL_HISTORY_FIRST.remove();
	}

	rollRandomAccurate(max: number, input: string) {
		const accurate_dice = this.$ACCURATE_ROLL.attr("accurate-dice");
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
		const isSUM = this.$SUM.prop("checked");
		if (!isSUM) {
			this.clearSum();
		}
		rpgData.SUM_LIST.push(rnd);
		rpgData.D_LIST.push(max);
		rpgData.save();
		const ARR_ALL_EQ = this.checkSameValues(rpgData.D_LIST);
		const tmpW = ARR_ALL_EQ && rpgData.D_LIST[0] == 10 && this.$RESULT.val() == SUCCESSTEXT && this.$W40MODE.prop("checked");
		const withDEGREESV_MIN = tmpW && this.$DEGREESV_MIN.prop("checked");
		const withREROLLLOWEST = this.$REROLLLOWEST.prop("checked");
		const withLASMASTERY = tmpW && this.$LASMASTERY.prop("checked");
		const withMINIMUM = Number(this.$MINIMUM.val()) > 0;
		const withFLAT = Number(this.$FLAT.val()) > 0;
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
			const MINIMUM = Number(this.$MINIMUM.val());
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
			const MIN_VALUE: number = Math.min(10, Number(this.$DEGREESV.val()));
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
				if (this.$W40MODE.prop("checked")) {
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
			const LASMASTERYVAL = Math.floor((Number(this.$DEGREESV.val()) - 1) / 2);
			if (LASMASTERYVAL > 0) {
				SUM_VALUE += LASMASTERYVAL;
			}
		}
		if (withFLAT) {
			SUM_VALUE += Number(this.$FLAT.val());
		}
		SUM_TEXT = "<span style='width:35px;' class='badge badge-pill badge-info'>" + SUM_VALUE + "</span>" + " = &Sigma;[#" + rpgData.SUM_LIST.length + "](" + SUM_TEXT + ")";
		if (ARR_ALL_EQ) {
			SUM_TEXT = SUM_TEXT + "/[D" + rpgData.D_LIST[0] + "]";
		}
		if (withFLAT) {
			SUM_TEXT = SUM_TEXT + " + " + Number(this.$FLAT.val()) + " (Flat Bonus)";
		}
		if (withLASMASTERY) {
			const LASMASTERYVAL = Math.floor((Number(this.$DEGREESV.val()) - 1) / 2);
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
		this.$LAST_HISTORY.html(historyLine);
		this.$FULL_HISTORY.prepend("<li class='list-group-item' data-type='array-item'>" + historyLine + "</li>");
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
		this.$ROLL.val(rnd);
		this.rollSet100(rnd);
	}

	rollSet100(rnd: number) {
		this.clearSum();
		this.change();
		const SKILL = Number(this.$SKILL.val());
		const SUCCESS = this.$RESULT.val() == SUCCESSTEXT;
		const DEGREESV = this.$DEGREESV.val();
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
		this.$LAST_HISTORY.html(historyLine);
		this.$FULL_HISTORY.prepend("<li class='list-group-item' data-type='roll-item'>" + historyLine + "</li>");
	}

	getRandomInt(max: number) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	change() {
		const SKILL = Number(this.$SKILL.val());
		const ROLL = Number(this.$ROLL.val());
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
		this.$RESULT.val(SUCCESS ? SUCCESSTEXT : FAILTEXT);
		if (SUCCESS) {
			this.$RESULT.addClass("bg-success");
			this.$RESULT.removeClass("bg-warning");
			this.$RESULT.addClass("text-white");
			const ACCURATE = Math.min(2, Math.floor(DEGREESV / 2));
			console.log("ACCURATE=" + ACCURATE)
			this.$ACCURATE_ROLL.html("+" + ACCURATE + "D");
			this.$ACCURATE_ROLL.attr("accurate-dice", 1 + ACCURATE);
		} else {
			this.$RESULT.removeClass("bg-success");
			this.$RESULT.addClass("bg-warning");
			this.$RESULT.addClass("text-white");
			this.$ACCURATE_ROLL.html("-");
			this.$ACCURATE_ROLL.attr("accurate-dice", 0);
		}
		this.$DEGREESV.val(DEGREESV);
	}

	getNavigatorLanguages() {
		console.log(navigator.language);
		return navigator.language.split("-");
	}
}
