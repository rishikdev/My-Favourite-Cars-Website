$(document).ready(function()
{
    $(document).scrollTop(0);

    $(".clickableCarImageRow").remove();

    //id is defined as the name of the car in html
    var id = "";

    $(".link").on("click", function(e)
    {
        e.preventDefault();

        // console.log(e);
        id = $(this).attr('id');

        if(id == "index")
        {
            $(".clickableCarImageRow").remove();
            
            loadIndex();
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
                id = id.replace(/-/g, " ");
                let words = id.split(" ");

                for (let i = 0; i < words.length; i++) 
                {
                    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                }

                id = words.join(" ");
                window.location.href = "./carPage.html?id=" + id;
                console.log(id);
            }
        }
    });

    $(".clickableCarImageOuterDiv").on("click", "a", function(e)
    {
        e.preventDefault();
        let id = $(this).attr("id");
        window.location.href = "./carPage.html?id="+id;
    });
    
    loadIndex();
});

function loadIndex()
{
    let CompanyName = [];
    let CarName = [];
    
    $.ajax(
    {
        url: "loadIndex.php",
        method: "GET",
        success: function(dataFromPHP)
        {
            var reloadImage = true;
            // console.log("Successfully got data from loadIndex.php using GET method");

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

function loadIndexCompany(clickedCompanyName)
{
    let CompanyName = [];
    let CarName = [];
    console.log(clickedCompanyName);
    
    $.ajax(
    {
        url: "loadIndexCompany.php?companyName="+clickedCompanyName,
        method: "GET",
        success: function(dataFromPHP)
        {
            var reloadImage = true;
            // console.log("Successfully got data from loadIndexCompany.php using GET method");
            console.log(dataFromPHP);

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