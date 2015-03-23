(function($){
    var Editor = {
	updateParagraph: function($this) {
	    if ($this.text().length>0) {
		MathJax.Hub.Queue(
		    ["Typeset",MathJax.Hub,$this[0]]
		);
	    }
	    else {
		$this.prev().focus();
		$this.remove();
	    }
	},
	insertEditBox: function($this) {
	    var id=$this[0].id;
	    var editorid=id+"-edit";
	    var math=MathJax.Hub.getJaxFor(id);
	    var text=math.originalText;
	    
	    $this.hide();
	    $this.before("<span contenteditable=\"false\"><span id=\""+editorid+"\" class=\"src\" contenteditable=\"true\">"+text+"</span></span>");
	    setTimeout(function(){
		$("#"+editorid).focus();
            }, 0); 
	},
	updateMath: function($this) {
	    var id=$this[0].id;
	    var targetid=id.substring(0,id.length-5);
	    var math=MathJax.Hub.getJaxFor(targetid);
	    MathJax.Hub.Queue(["Text",math,$this.text()]);
	    $("#"+targetid).show();
	    $this.parent().remove();
	},
	prevParagraph: function($this) {
	    setTimeout(function(){
		$this.prev().focus();
	    },0);
	},
	nextParagraph: function($this) {
	    $this.after("<div class=\"paragraph\" contenteditable=\"true\"></div>");
	    setTimeout(function(){
		$this.next().focus();
	    },0);
	},
	copyToClipboard: function() {
	    var s=window.getSelection();
	    var range=s.getRangeAt(0);
	    $("#clipboard").html(range.cloneContents());
	},
	pasteAsText: function($this) {
	    var range=window.getSelection().getRangeAt(0);
	    var node=document.createElement("div");
	    node.innerHTML = $("#clipboard").html();
	    for (var i=node.childNodes.length-1; i>=0; i--) {
		var n=node.childNodes[i];
		if (n.tagName=="SCRIPT") {
		    if (n.type=="math/tex; mode=display") {
			range.insertNode(document.createTextNode("\\["+n.textContent+"\\]"));
		    }
		    else if (n.type=="math/tex") {
			range.insertNode(document.createTextNode("$"+n.textContent+"$"));
		    }
		}
		else if (n.nodeType==3) {
		    range.insertNode(n);
		}
	    }
	    this.updateParagraph($this);
	}
    }
    
    $(document).ready(function() {
	$(document).on("click","span.MathJax", function(e) {
	    Editor.insertEditBox($(this));
	});
	$(document).on("focusout","span.src",function() {
	    Editor.updateMath($(this));
	});
	$(document).on("focusout","div.paragraph",function() {
	    Editor.updateParagraph($(this));
	});
	$(document).on("keydown","div.paragraph",function(e) {
	    var $this=$(this);
	    if(e.which == 9 && e.shiftKey) {
		Editor.prevParagraph($this);
	    }
	    else if (e.which==9 && !e.shiftKey) {
		Editor.nextParagraph($this);
	    }
	    else if (e.which==67 && e.ctrlKey) {
		Editor.copyToClipboard();
	    }
	    else if (e.which==86 && e.ctrlKey) {
		Editor.pasteAsText($this);
	    }
	});
	$("div#main").on("keyup", function(e) {
	    if (e.which == 52) {
//		var s=window.getSelection();
//		var range=s.getRangeAt(0);
//		var span = document.createElement("span");
//		range.surroundContents(span);
	    }
	});
});
})(jQuery);
