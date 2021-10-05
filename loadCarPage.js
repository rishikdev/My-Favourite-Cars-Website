var CarData = [];
var cacheImage = [];

$(document).ready(function()
{
    $(document).scrollTop(0);

    let carName = window.location.search;

    if(!carName.includes("id="))
        window.location.href  = "./index.html";
    
    carName = carName.substring(1).split("=")[1].replace(/%20/g, " ");

    findCar(carName);

    //id is defined as the name of the car in html
    var name = "";

    $(".link").on("click", function(e)
    {
        e.preventDefault();

        id = $(this).attr('id');
        
        if(id == "index")
        {
            window.location.href  = "./index.html";
        }

        else
        {
            let name = id.split("@");

            if(name[0] == "company")
            {
                $(".clickableCarImageRow").remove();

                let clickedCompanyName = name[1];
                clickedCompanyName = clickedCompanyName.split("-");

                for (let i = 0; i < clickedCompanyName.length; i++) 
                {
                    clickedCompanyName[i] = clickedCompanyName[i].charAt(0).toUpperCase() + clickedCompanyName[i].substring(1);
                }

                clickedCompanyName = clickedCompanyName.join("-");

                loadIndexCompany(clickedCompanyName);
            }

            else
            {
                $(document).scrollTop(0);

                id = id.replace(/-/g, " ");
                let words = id.split(" ");

                for (let i = 0; i < words.length; i++) 
                {
                    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                }

                id = words.join(" ");

                window.location.href = "./carPage.html?id="+id;
            }
        }
    });

    setContentPosition();

    $(window).resize(function()
    {
        setContentPosition();
    });
});

function findCar(CarName)
{
    $.ajax(
        {
            url: "loadCarPage.php",
            method: "POST",
            data: 
            {
                name: JSON.stringify(CarName)
            },
            success: function(dataFromPHP)
            {
                var reloadImage = true;
                // console.log("Successfully got data from loadCarPage.php using POST method");

                dataFromPHP = dataFromPHP.split("-/-");
                // console.log(dataFromPHP);

                if(dataFromPHP[0] == "0 results")
                    loadData(dataFromPHP);
                
                else
                {
                    $(".renderImgTag").remove();

                    let CompanyName = dataFromPHP[0];
                    let CarName = dataFromPHP[1];
                    let CarData = [];

                    CarData.push(CompanyName);
                    CarData.push(CarName);

                    loadAnimation(dataFromPHP);

                    // cacheImageFunction(CarData);
                    
                    // loadData(dataFromPHP);
                    // loadRenderImage(dataFromPHP, -1);
                }
            },
            error: function(error)
            {
                console.log(error);
            }
        });    
}

function sleep(time)
{
    return new Promise(resolve => setTimeout(resolve, time));
}

async function loadAnimation(dataFromPHP)
{
    // console.log("loading video...");

    let CompanyName = dataFromPHP[0];
    let CarName = dataFromPHP[1];
    let CarData = [];

    CarData.push(CompanyName);
    CarData.push(CarName);

    $(".carDetailsDiv").css("display", "none");

    $(".carRenderDivParent").css("height", "100vh");

    $(".carRenderDiv").append("<video class=\"carVideoTag\" playsinline autoplay muted>"+
                                        "<source src=\"./Animations/" + CompanyName + " " + CarName + ".mp4\" type=\"video/mp4\">"+
                                    "</video>").css("display", "none");
    $(".carRenderDiv").fadeIn();
    // $(".carVideoTag").fadeOut(7000);

    await sleep(1000);

    let cacheImage = cacheImageFunction(CarData);

    await sleep(10000);

    // console.log("video complete");

    $(".carVideoTag").remove();

    setContentPosition();
    loadData(dataFromPHP);
    loadRenderImage(dataFromPHP, -1, cacheImage);
}

function loadData(dataFromPHP)
{
    $(".carDetailsDiv").css("display", "none");

    if(dataFromPHP[0] == "0 results")
    {
        $(".carRenderDivParent").remove();

        $("<div class=\"noDetailsFoundDiv\">"+
            "<h1 class=-display-1>No Details Found</h1>"+
        "</div>").insertBefore(".carDetailsDiv");
    }

    else
    {
        $(".carDetailsTable").remove();

        let tableHead = ["Company", "Name", "Engine Displacement [CC]", "Torque NM", "Horse Power", "Number of cylinders", "RPM", "Mileage [KMPL]"];

        for(let i = 0; i < dataFromPHP.length - 1; i = i + 1)
        {
            $(".table").append("<tr class=\"carDetailsTable\">"+
                                    "<th>" + tableHead[i] + "</th>"+
                                    "<td>" + dataFromPHP[i] + "</td>"+
                                "</tr>");
        }

        $("<div class=\"carDescriptionDiv\">"+
            "<p>" + dataFromPHP[dataFromPHP.length-1] + "</p>"+
        "</div>").insertAfter(".carDetailsDiv");
    }
}

function loadRenderImage(dataFromPHP, newImgSrc, cacheImage)
{
    if(dataFromPHP[0] != "0 results")
    {
        var CompanyName = dataFromPHP[0];
        var CarName = dataFromPHP[1];

        $(".carDetailsDiv").fadeIn();

        if(newImgSrc == -1)
        {
            CarData.push(CompanyName);
            CarData.push(CarName);

            carData(CarData, cacheImage);

            $(".carRenderDiv").prepend("<img class=\"renderImgTag\" src=\"./" + CompanyName + " " + CarName + " Renders/0001.jpg\" alt=\"image\">").css("display", "none").fadeIn();
        }

        //this block will not get executed
        else
        {
            document.getElementsByClassName("renderImgTag")[0].src = newImgSrc;
        }
    }
}

function carData(CarData, cacheImage)
{   
    // let cacheImage = cacheImageFunction(CarData);
    // console.log(cacheImage[1].src);

    $(window).on("scroll", function()
    {   
        let CompanyName = CarData[0];
        let CarName = CarData[1];

        let maxScroll = 900;
        let currentScrollYValue = window.scrollY;

        // console.log(currentScrollYValue);

        newImageNumber = Math.round((currentScrollYValue / maxScroll) * 100);

        if(newImageNumber <= 1)
            newImageNumber = 1;
        
        if(newImageNumber >= 300)
        {
            newImageNumber = 300;
        }
        
        //newImgSrc = `./${CompanyName} ${CarName} Renders/${(newImageNumber).toString().padStart(4, '0')}.jpg`
        
        //document.getElementsByClassName("renderImgTag")[0] = cacheImage[newImageNumber];
        $(".renderImgTag").remove();
        $(".carRenderDiv").append(cacheImage[newImageNumber]);
        $(".carRenderDiv").find("img").addClass("renderImgTag");
        
        //loadRenderImage(CarData, newImgSrc);
    });
}

function loadIndexCompany(clickedCompanyName)
{
    let CompanyName = [];
    let CarName = [];
    
    $.ajax(
    {
        url: "loadIndexCompany.php?companyName="+clickedCompanyName,
        method: "GET",
        success: function(dataFromPHP)
        {
            var reloadImage = true;
            console.log("Successfully got data from loadIndexCompany.php using GET method");
            // console.log(dataFromPHP);

            dataFromPHP = dataFromPHP.split("-/-");

            CompanyName = [];
            CarName = [];

            for(var i = 0; i < dataFromPHP.length - 1; i = i + 2)
            {
                CompanyName.push(dataFromPHP[i]);
                CarName.push(dataFromPHP[i + 1]);
            }

            loadClickableCarImage(CompanyName, CarName);
        },
        error: function(error)
        {
            console.log(error);
        }
    });
}

function loadClickableCarImage(CompanyName, CarName)
{
    for(var i = 0; i < CompanyName.length; i = i + 1)
    {
        let className = CarName[i].replace(/ /g, "-");
        if(i % 4 == 0)
        {
            $(".clickableCarImageOuterDiv").append("<div class=\"row clickableCarImageRow\">"+
                                                        "<div class=\"card "+ className +"\">"+
                                                            "<a id=\"" + CarName[i] + "\">"+
                                                                "<img class=\"card-img-top\" src=\"./Cover Images/" + CompanyName[i] + " " + CarName[i] + ".jpg\" alt=\"Cover Image\">"+
                                                            "</a>"+
                                                        "</div>"+
                                                    "</div>").css("display", "none").fadeIn();
        }

        else
        {
            $(".clickableCarImageRow").append("<div class=\"card "+ className +"\">"+
                                                "<a id=\"" + CarName[i] + "\">"+
                                                    "<img class=\"card-img-top\" src=\"./Cover Images/" + CompanyName[i] + " " + CarName[i] + ".jpg\" alt=\"Cover Image\">"+
                                                "</a>"+
                                            "</div>").css("display", "none").fadeIn();
        }
    }
}

function cacheImageFunction(CarData)
{
    // console.log("caching images...");

    let CompanyName = CarData[0];
    let CarName = CarData[1];

    for(let i = 1; i <= 300; i = i + 1)
    {
        cacheImage[i] = new Image();
        cacheImage[i].src = `./${CompanyName} ${CarName} Renders/${(i).toString().padStart(4, '0')}.jpg`;
    }
    // console.log("images cached");
    return cacheImage;
}


function setContentPosition()
{
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if(windowHeight > windowWidth)
    {
        // console.log("portrait");
        $(".carRenderDiv").css("top", "25%");
        $(".carRenderDiv").css("width", "100%");
        $(".carRenderDiv").css("margin-left", "0%");
        $(".carRenderDivParent").css("height", "450vh");
    }

    else
    {
        // console.log("landscape");
        $(".carRenderDiv").css("top", "10%");
        $(".carRenderDiv").css("width", "80%");
        $(".carRenderDiv").css("margin-left", "10%");
        $(".carRenderDivParent").css("height", "500vh");
    }
}