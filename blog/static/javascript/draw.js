var down = false;
var x = 0;
var y = 0;
var colorInput = "darkturquoise";
var size = 5;
var tool = 0;
var file = null;
var download = null;
var canvasWidth = 700;
var canvasHeight = 500;

$(document).ready(function()
{    
    //initiate canvas
    canvas = document.getElementById('canvas');
    c = canvas.getContext('2d');
    
    //initiate the color icon
    $("#colorIcon").css("color", colorInput)
    
    //initiate dropdown menus
    $('.dropdown-toggle').dropdown();
    
    // if the user moves the mouse
    $(document).on("mousemove", function(event) 
    {
        //note the x,y and call draw
        x = event.pageX - canvas.offsetLeft;
        y = event.pageY - canvas.offsetTop;
        draw(x, y)
    });
    
    // check wether or not the users is holding the mousebutton down and call draw when neccesary
    $(canvas).mousedown(function()
    {
        down = true;
        draw(x, y)
    })
    $(canvas).mouseup(function() 
    {
        down = false;
    });
    
    // when the user is typing in the color input, change colorInput and the icon in the button accordenly
    $("#colorInput").keyup(function() 
    {
        colorInput = $(this).val();
        $("#colorIcon").css("color", colorInput)
    });
    
    //when the user is typing in the size input, change size accordenly 
    $("#sizeInput").keyup(function() 
    {
        size = $(this).val();
        // this if is ensures that the value in the button is either an integer or zero
        if(size != 0 && !isNaN(size))
        {
            $("#sizeButton").text(size);
        }
        else
        {
            $("#sizeButton").text("0");
        }
    });
    
    //when the clearbutton is clicked clear the canvas
    $("#clearButton").click(function() 
    {
        c.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    // when one of the tools is clicked change the tool variable and the icon in the tools button
    $("#pencilTool").click(function() 
    {
        $("#toolDropdown").removeClass("fa fa-eraser").addClass("fa fa-pencil");
        tool = 0;
    });
    $("#eraserTool").click(function() 
    {
        $("#toolDropdown").removeClass("fa fa-pencil").addClass("fa fa-eraser");
        tool = 1;
    });
    
    // change the canvas height and width according to the given input
    $("#canvasWidthInput").keyup(function() 
    {
        document.getElementById('canvas').width = $(this).val();
    });
    $("#canvasHeightInput").keyup(function() 
    {
        document.getElementById('canvas').height = $(this).val();
    });
    
    // when the download button is clicked call downloadCanvas
    $("#downloadButton").click(function()
    {
        downloadCanvas(this, 'canvas', 'draWing.png');
    });
    
    //when a file is selected as background, call readurl
    // js is used because jquery does not support the change eventListener (as far as I know)
    document.getElementById('backgroundInput').addEventListener('change', readURL, true);
    
})

// draws or erases on the canvas according to the slected tool
function draw(x, y)
{
    //if the mouse button is down
    if(down)
    {
        // pencil tool
        if(tool == 0)
        {
            // draw a filled circle with the given parameters
            c.beginPath();
            c.arc(x, y, size, 0, Math.PI*2);
            c.fillStyle = colorInput;
            c.fill();
            c.closePath();
        }
        // eraser tool
        else if(tool == 1)
        {
            // clear a square with the given size
            c.clearRect(x - size, y - size, size * 2, size * 2);
        }
    }
}

// read in a url and set it as the canvas background. Credits to:
//https://stackoverflow.com/questions/31353703/how-to-upload-image-file-from-computer-and-set-as-div-background-image-using-jqu
function readURL()
{
    //get the file from the file input
    file = document.getElementById("backgroundInput").files[0];
    var reader = new FileReader();
    //if the reader is done loading, set the file as background
    reader.onloadend = function()
    {
        document.getElementById('canvas').style.backgroundImage = "url(" + reader.result + ")";        
    }
    // if there is a file read it as data url
    if(file)
    {
      reader.readAsDataURL(file);
    }
    else
    {}
}

// downloads the canvas as file (png)
function downloadCanvas(link, canvasId, filename) 
{
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}