var previous = null;

$(document).ready(function()
{    
    // for all buttons: when they are clicked call toggleInstructions with correct instruction div id
    
    $("#colorButton").click(function() 
    {
        toggleInstructions("#colorInstructions");
    });
    
    $("#sizeButton").click(function() 
    {
        toggleInstructions("#sizeInstructions");
    });
    
    $("#clearButton").click(function() 
    {
        toggleInstructions("#clearInstructions");
    });
    
    $("#uploadButton").click(function() 
    {
        toggleInstructions("#uploadInstructions");
    });
    
    $("#downloadButton").click(function() 
    {
        toggleInstructions("#downloadInstructions");
    });
    
    $("#canvasButton").click(function() 
    {
        toggleInstructions("#canvasInstructions");
    });
    
    $("#toolsButton").click(function() 
    {
        toggleInstructions("#toolsInstructions");
    });
    
})

// open the clicked instruction and close the previous one
// unless the same button is clicked twice, than just toggle it
function toggleInstructions(current)
{
    if (previous != null && previous != current)
    {
        $(previous).hide();
        $(current).toggle();
    }
    else
    {
        $(current).toggle();
    }
    previous = current;
}