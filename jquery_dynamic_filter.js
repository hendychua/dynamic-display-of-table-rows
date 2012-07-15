(function ($) {
    
    $.fn.dynamicFilter = function(options) {
        
        var settings = $.extend( {
            "searchboxid": null,
            "columnsToSearchOn": null,
            "style": "fade",
        }, options);
        
        var styleChosen = settings["style"].toLowerCase();
        var chosenColumnIndexes = new Array();
        
        if (settings["columnsToSearchOn"] != null) {
            for (var i=0; i<settings["columnsToSearchOn"].length; i++) {
                 var tmp = $("th").index($("#"+settings["columnsToSearchOn"][i]));
                 chosenColumnIndexes[i] = tmp;
            }
        } else {
            //user did not specify columns to search on. make every columns in the table searchable
            var numberOfColumns = $("th").size();
            for (var i=0; i<numberOfColumns; i++) {
                chosenColumnIndexes[i] = i;
            }
        }
        
        var allRowsInTable = $(this).find("tbody tr");
        
        $("#"+settings["searchboxid"]).keyup(function() {
            var newFilterString = $(this).val().toLowerCase();
            
            for (var i=0; i<allRowsInTable.length; i++) {
                
                var allTDs = allRowsInTable[i].getElementsByTagName("td");
                
                for (var k=0; k<chosenColumnIndexes.length; k++) {
                    var currentTDText = $(allTDs[chosenColumnIndexes[k]]).text().toLowerCase();
                    
                    if (currentTDText.indexOf(newFilterString) != -1) {
                        showRow($(allTDs[chosenColumnIndexes[k]].parentNode));
                        break;
                    } else {
                        if (k == chosenColumnIndexes.length-1) {
                            hideRow($(allTDs[chosenColumnIndexes[k]].parentNode))
                        }
                    }
                }
                
            }
            
        });
        
        function showRow(jqueryNode) {
            if (styleChosen == "fade") {
                jqueryNode.fadeIn();
            } else if (styleChosen == "normal") {
                jqueryNode.show();
            }
        }

        function hideRow(jqueryNode) {
            if (styleChosen == "fade") {
                jqueryNode.fadeOut();
            } else if (styleChosen == "normal") {
                jqueryNode.hide();
            }
        }

    };
    
})(jQuery);