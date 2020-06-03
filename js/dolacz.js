$(document).ready(function () {

    fillInputs()


    $(".myButtonSave").click(function () {
        save(this)

    });


    $(".myButtonClear").click(function () {
        clear(this)
    });
    $("#myButtonClearAll").click(function () {

        $(".myButtonClear").each(function () {
            if ($(this).attr("id") !== "myButtonClearAll") {

                clear(this)
            }

        })


    });

    $("#myButtonSaveAll").click(function () {
        console.log("na   save all:::")
        $(".myButtonSave").each(function () {
            console.log("namdfsdesfsfdsf:::")
            if ($(this).attr("id") !== "myButtonSaveAll") {
                let name = $(this).parent().children(".myInput").attr("name")
                console.log("name:::" + name)
                save(this)
            }

        })


    });

});


function save(context) {
    console.log("save")
    let name = $(context).parent().children(".myInput").attr("name")
    console.log(name)

    let formClass = $(context).parent().attr("class")
    console.log(formClass)
    if (formClass.includes("myCheckbox")) {
        saveCheckbox(context)
    } else if (formClass.includes("myRadio")) {
        saveCheckbox(context)
    } else {


        console.log(".myButtonSave")

        let errorId = $(context).parent().children(".error").attr("id")
        console.log(errorId)
        let form = $(context).parent().validate({
                errorElement: "div",
                errorLabelContainer: "#" + errorId,

            }
        )
        let isValid = $(context).parent().valid()

        if (isValid) {
            let name = $(context).parent().children(".myInput").attr("name")
            console.log(name)
            let value = $(context).parent().children(".myInput").val()
            console.log(value)


            let data = JSON.parse(localStorage.getItem("data"));
            if (data === null) {
                data = {}
            }
            data[name] = value
            localStorage.setItem("data", JSON.stringify(data));
        } else {
            console.log("invalid")
        }

    }
}

function saveCheckbox(context) {
    let name = $(context).parent().children(".myInput").attr("name")
    let sList = "";
    let inputType = $(context).parent().children(".myInput").attr("type")
    let value = {}
    $(context).parent().children('input[type=' + inputType + ' ]').each(function () {

        sList += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
        value[$(this).val()] = (this.checked ? true : false)
    });
    console.log(sList);
    console.log(value);


    let data = JSON.parse(localStorage.getItem("data"));
    if (data === null) {
        data = {}
    }
    data[name] = value
    localStorage.setItem("data", JSON.stringify(data));


}

function saveRadio(context) {
    let name = $(context).parent().children(".myInput").attr("name")

    //"input[name='"+name+"']:checked"

    console.log(name)
    let value = $(context).parent().children(".myInput:checked").attr("value")

    console.log(value)


    let data = JSON.parse(localStorage.getItem("data"));
    if (data === null) {
        data = {}
    }
    data[name] = value
    localStorage.setItem("data", JSON.stringify(data));


}

function clear(context) {


    console.log(".myButtonClear")


    let name = $(context).parent().children(".myInput").attr("name")
    console.log(name)


    let data = JSON.parse(localStorage.getItem("data"));
    if (data === null) {
        data = {}
    }
    delete data[name]
    localStorage.setItem("data", JSON.stringify(data));
    let type = $(context).parent().children(".myInput").attr("type")
    console.log(type)
    if (type === "checkbox" || type === "radio") {
        $(context).parent().children('input[type=' + type + ' ]').each(function () {


            $(this).prop('checked', false);
        });
    } else {
        let value = ""
        $(context).parent().children(".myInput").val(value)
    }


}

function fillInputs() {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data === null) {
        data = {}
    }

    Object.keys(data).forEach(function (key) {
        if (key === "university") {
            $('input[type=checkbox]').each(function () {
                let isChecked = data[key][$(this).val()]
                $(this).prop('checked', isChecked);
            });
        } else if (key === "location") {
            $('input[type=radio]').each(function () {
                let isChecked = data[key][$(this).val()]
                $(this).prop('checked', isChecked);
            });
        } else {
            console.log(key, data[key]);
            $("input[name^='" + key + "']").val(data[key])
        }

    });


}