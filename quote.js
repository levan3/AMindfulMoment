// Speed of the quotation marks to show
var quoteSpeed = 500;

// Speed of the quote container to expand
var quoteContainerSpeed = 1000;

// Time the quote will be visible
var showQuoteSpeed = 5000;

// Time the screen will be empty
var cleanScreenSpeed = 500;

// Width of the quote box
// Would be cool to automatically grow to the containing text size in the future.
var quoteBoxWidth = "300px";

// The quotes we'll show
var quotes = [ {
		"quote" : "When you realize nothing is lacking, the whole world belongs to you.",
		"author" : "- Lao Tzu"
	}, {
		"quote" : "There is no way to happiness - happiness is the way.",
		"author" : "- Thich Nhat Hanh"
	}, {
		"quote" : "Breathing in, I calm body and mind. Breathing out, I smile. Dwelling in the present moment I know this is the only moment.",
		"author" : "- Thich Nhat Hanh"
	}, {
		"quote" : "Waste no more time arguing what a good man should be. Be One.",
		"author" : "- Marcus Aurelius"
	}, {
		"quote" : "The happiness of your life depends upon the quality of your thoughts: therefore, guard accordingly.",
		"author" : "- Marcus Aurelius"
	}, {
		"quote" : "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
		"author" : "- Thich Nhat Hanh"
	},{
		"quote" : "You have power over your mind — not outside events. Realize this, and you will find strength.",
		"author" : "- Marcus Aurelius"
	},{
		"quote" : "Why should we pay so much attention to what the majority thinks?",
		"author" : "- Socrates"
	},{
		"quote" : "To complain is always nonacceptance of what is.",
		"author" : "- Eckhart Tolle"
	},{
		"quote" : "While we wait for life, life passes.",
		"author" : "- Seneca"
	},{
		"quote" : "We should not, like sheep, follow the herd of creatures in front of us, making our way where others go, not where we ought to go.",
		"author" : "- Seneca"
	},{
		"quote" : "Just keep in mind: the more we value things outside our control, the less control we have.",
		"author" : "- Epictetus"
	},{
		"quote" : "The tranquility that comes when you stop caring what they say. Or think, or do. Only what you do.",
		"author" : "- Marcus Aurelius"
	},{
		"quote" : "The whole future lies in uncertainty: live immediately.",
		"author" : "- Seneca"
	},{
		"quote" : "It does not matter what you bear, but how you bear it.",
		"author" : "- Seneca"
	},{
		"quote" : "A gem cannot be polished without friction, nor a man perfected without trials.",
		"author" : "- Seneca"
	},{
		"quote" : "Self-control is strength. Right thought is mastery. Calmness is power.",
		"author" : "- James Allen"
	},{
		"quote" : "Man conquers the world by conquering himself.",
		"author" : "- Zeno of Citium"
	},{
		"quote" : "To bear trials with a calm mind robs misfortune of its strength and burden.",
		"author" : "- Seneca"
	},{
		"quote" : "Don’t explain your philosophy. Embody it.",
		"author" : "- Epictetus"
	}
	
];

// The quote index to start with
var currentQuoteIndex = 4;

// Document ready
$(document).ready(function()
{	
	// Webkit seems to have different ways of cerning the quotation marks
	// This little hack makes sure it's in the correct position
	if($.browser.webkit) {
		$(".quotemark").css({ "margin-top" : "-22px" });
		$(".rightquote").css({ "margin-top" : "-24px" });
	}	
	
	startAnimation();
});

/* Starts the animation */
var startAnimation = function() {
	setTimeout(function() {
		showLeftQuote();
	}, quoteSpeed);	
}

/* Shows left quote */
var showLeftQuote = function() {
	$(".leftquote").show();
	
	setTimeout(function() {
		showRightQuote();
	}, quoteSpeed);
};

/* Shows right quote */
var showRightQuote = function() {
	$(".rightquote").show();
	
	setTimeout(function() {
		showQuoteContainer();
	}, quoteSpeed);
};

/* Shows the quote container */
var showQuoteContainer = function() {
	// Small fix for the right quotation mark
	$(".rightquote").css({ "margin-left" : "-10px" });
	
	$("<p />")
		.html(quotes[currentQuoteIndex].quote)
		.css({ "display" : "none"})
		.appendTo($(".quote"));
		
	$("<p />")
		.addClass("author")
		.html(quotes[currentQuoteIndex].author)
		.css({ "display" : "none"})
		.appendTo($(".quote"));

	$(".quote")
		.show()
		.animate({ width : quoteBoxWidth }, quoteContainerSpeed, function() {
			showQuote();
		});
}

/* Shows the current quote */
var showQuote = function() {
	$(".quote").children().fadeIn();
		
	setTimeout(function() {
		clearQuote();
	}, showQuoteSpeed);
}

/* Clear the current quote */
var clearQuote = function() {
	// Determine the curren quote index
	if(currentQuoteIndex == quotes.length - 1) {
		currentQuoteIndex = 0;
	}
	else {
		currentQuoteIndex++;
	}
	
	// Fade out the quotation marks
	$(".quotemark").fadeOut();

	// Fade out the current quote and reset the data	
	$(".quote").fadeOut(function() {
		$(".rightquote").css({ "margin-left" : "0px" });
		
		$(".quote")
			.empty()
			.css({ width : "0px" });
		
		setTimeout(function() {
			startAnimation();
		}, cleanScreenSpeed);
	});
}