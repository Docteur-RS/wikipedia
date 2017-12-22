var InteractionReporter = require("../../../sysModules/interactionReporter");
var https = require('https');

var Wikipedia = function (moduleSysMngr) {
    this.moduleSysMngr = moduleSysMngr;
};

Wikipedia.prototype.makeURL = function (text)
{
	text = encodeURI(text);
    text = "https://fr.m.wikipedia.org/wiki/" + text;
    return (text);
};

Wikipedia.prototype.deleteResearch = function (text)
{
    text = text.substring(5);
    return (text);
};

Wikipedia.prototype.replace = function (text, character, to)
{
    var count = 16;

    while (count > 0)
    {
        text = text.replace(character, to);
        count = count - 1;
    }
    return (text);
};

Wikipedia.prototype.parseResponse = function (rawData)
{
    this.moduleSysMngr.frontMngr.callFrontModule("Wikipedia", "HUGUESDPDN_CLASSNAME_Wikipedia", "showResults", rawData);
};

Wikipedia.prototype.prelaunch = function (userText)
{
    userText = this.makeURL(userText);
	this.parseResponse(userText);
};

Wikipedia.prototype.launch = function (paramFromTree, userText)
{
    userText = this.deleteResearch(userText);
    this.prelaunch(userText);
};

module.exports = Wikipedia;