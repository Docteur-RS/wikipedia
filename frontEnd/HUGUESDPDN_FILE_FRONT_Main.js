main.HUGUESDPDN_CLASSNAME_Wikipedia = Backbone.View.extend({
    el: '',

    initialize: function () {
    this.firstCard = "";
    this.allCards = [];
    this.current = -1;
    },
	
	loadstop: function(){
		this.firstCard.find("#HUGUESDPDN_LOADING_Wikipedia").css('display', 'none');
		this.firstCard.find("#HUGUESDPDN_WEBVIEW_Wikipedia").css('display', 'block');
	},

    showResults: function (data, calledFromRestore) {
        var that = this;

        this.firstCard = main.cardMngr.addNewCard(true);
        var template = main.cardMngr.getTemplate("Wikipedia", "HUGUESDPDN_TEMPLATE_Reset");
        var templateFilled = template({HUGUESDPDN_WEBVIEW_SRC_Wikipedia: data});
        this.firstCard.append(templateFilled);
		
		var webview = this.firstCard.find("#HUGUESDPDN_WEBVIEW_Wikipedia")[0];
        webview.addEventListener("loadstop", this.loadstop.bind(this));
        $(".add-card").last().off();
        $(".add-card").last().on("click", function (node) {that.next();});
    },

    errorServer: function (calledFromRestore) {
        var that = this;

        this.firstCard = main.cardMngr.addNewCard(true);
        var template = main.cardMngr.getTemplate("Wikipedia", "HUGUESDPDN_TEMPLATE_ErrorServer");
        var templateFilled = template();
        this.firstCard.append(templateFilled);
    },

    errorInternet: function (calledFromRestore) {
        var that = this;

        this.firstCard = main.cardMngr.addNewCard(true);
        var template = main.cardMngr.getTemplate("Wikipedia", "HUGUESDPDN_TEMPLATE_ErrorInternet");
        var templateFilled = template();
        this.firstCard.append(templateFilled);
    },

    next: function ()
    {
        var that = this;
        var newCard = main.cardMngr.addNewCard();
        this.allCards.push(newCard);
        that.current = that.allCards.length - 1;
        var template = main.cardMngr.getTemplate("myNewArchi", "myTemplate");
        var templateFilled = template({title: "Nouvelle card...", plop: newCard});
        $(newCard).append(templateFilled);
        this.showControls(newCard);
        $(".add-card").last().off();
        $(".add-card").last().on("click", function (node) {
            that.next();});
    },
	
    showControls: function (newCard)
    {
        var that = this;
        var controlNext = $(newCard).children(".show-next-card");
        controlNext.css("visibility", "visible");
        $(controlNext).on("click", function () {
            if (that.current >= that.allCards.length - 1)
                return;
            that.current += 1;
            main.cardMngr.showCard(that.allCards[that.current]);});
        var controlPrevious = $(newCard).children(".show-previous-card");
        controlPrevious.css("visibility", "visible");
        controlPrevious.on("click", function () {
            if (that.current <= 0)
                return;
            that.current -= 1;
            main.cardMngr.showCard(that.allCards[that.current]);});
    },
    
    HUGUESDPDN_OBJECTNAME_Wikipedia: function ()
    {
    }
});