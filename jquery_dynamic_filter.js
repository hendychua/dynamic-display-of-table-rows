(function ($) {
    
    $.fn.dynamicFilter = function(options) {
        
        var settings = $.extend( {
            "searchboxid": null,
            "columnsToSearchOn": null
        }, options);
        
        var chosenColumnIndexes = new Array();
        for (var i=0; i<settings["columnsToSearchOn"].length; i++) {
             var tmp = $("th").index($("#"+settings["columnsToSearchOn"][i]));
             chosenColumnIndexes[i] = tmp;
        }
        
        var allRowsInTable = $(this).find("tbody tr");
        
        $("#"+settings["searchboxid"]).keyup(function() {
            var newFilterString = $(this).val().toLowerCase();
            
            for (var i=0; i<allRowsInTable.length; i++) {
                
                var allTDs = allRowsInTable[i].getElementsByTagName("td");
                
                for (var k=0; k<chosenColumnIndexes.length; k++) {
                    var currentTDText = $(allTDs[chosenColumnIndexes[k]]).text().toLowerCase();
                    
                    if (currentTDText.indexOf(newFilterString) != -1) {
                        $(allTDs[chosenColumnIndexes[k]].parentNode).fadeIn();
                        break;
                    } else {
                        if (k == chosenColumnIndexes.length-1) {
                            $(allTDs[chosenColumnIndexes[k]].parentNode).fadeOut();
                        }
                    }
                }
                
            }
            
        });

    };
    
})(jQuery);