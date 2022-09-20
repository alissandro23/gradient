const colorsData = [
    {
        color: "18eaff",
        percentage: 0
    },
    {
        color: "ff00bd",
        percentage: 100
    }
]

function generateGradient(colorsData) {
    const colors = JSON.parse(JSON.stringify(colorsData))
    colors.sort(function (prev, next) {
        return prev.percentage - next.percentage
    })

    let gradientString = "linear-gradient(45deg, ";
    
    const parsedColors = colors.map(function (color) {
        return "#" + color.color + " " + color.percentage + "%"
    }) 

    gradientString += parsedColors.join(", ")
    gradientString += ")"
    
    return gradientString;
}

function showGradient(colorsData) {
    const gradientText = generateGradient(colorsData)
    
    $(".gradient-body").css("background", gradientText)
    $(".code-body").html("background: " + gradientText + ";")
}

function init() {
    const colorsData = parseColors();
    const $message = $(".message-error")

    if (colorsData.length < 2) {
        $message.show()
    } else {
        $message.hide()
    }

    showGradient(colorsData)
}

function parseColors() {
    const colorsData = [];
    $('[data-row="colors"]').each(function (index, item) {
        const $row = $(item);
        const colorHex = $row.find(".control-colors-hex-input").val();
        const colorPercentage = $(item).find(".control-colors-percentage-input").val();

        colorsData.push(
            {
                color: colorHex,
                percentage: colorPercentage
            }
        );
        setColorMark($row, "#" + colorHex);
    });
    return colorsData;
}

function setColorMark($row, color) {
    $row.find('.control-colors-color').css("background-color", color)

}

function addColor() {
    const $colorRow = $('[data-row="colors"]').last()
    const $rowClone = $colorRow.clone();

    $(".control-colors-body").append($rowClone)

    setEvents($rowClone)
}

function setEvents($parent) {
    $parent.find("input").change(init)
    $parent.find(".control-colors-action-delete").click(deleteRow)
}

function deleteRow() {
    $(this).closest('[data-row="colors"]').remove()

    init()
}

$(function () {
    init()

    $("input").change(init)

    $(".control-colors-action-delete").click(deleteRow)

    $(".control-add-btn").click(function () {
        addColor()
        init()
    }) 
})