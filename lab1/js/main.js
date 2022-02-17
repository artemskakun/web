$('.main__btns button').on("click", function (e) {
    e.preventDefault();
    let btnValue = $(this).attr('data-value');
    $('.main__btns button').removeClass("active");
    $(this).addClass("active");
    $('.main__btns input').val(btnValue);
});
$(function(){
    $('.down').click(function(){
        $('html, body').animate({scrollTop: $(document).height() - $(window).height()}, 350);
        return false;
    });
});
$(function(){
    $('.up').click(function(){
        $('html, body').animate({scrollTop: $(window).height() - $(document).height()}, 600);
        return false;
    });
});
function validateForm() {
    let errors = 0;

    // validateX
    if ($('.main__input-select').val() != 7) {
        $('.main__input-select').removeClass("error");
    } else {
        $('.main__input-select').addClass("error");
        errors = 1;
    }

    // validateY
    const Y_MIN = -3;
    const Y_MAX = 3;
    let yVal = $('.main__input-text').val();
    if (isNum(yVal)) {
        if (yVal >= Y_MIN && yVal <= Y_MAX) {
            $('.main__input-text').removeClass('error');
        } else {
            $('.main__input-text').addClass('error');
            errors = 1;
        }
    } else {
        $('.main__input-text').addClass('error');
        errors = 1;
    }

    // validateR
    if ($('.r-radio').is(':checked')) {
        $('.rbox-label').removeClass('error');
    } else {
        $('.rbox-label').addClass('error');
        errors = 1;
    }

    // return result
    if (errors == 0) {
        return true;
    } else {
        return false;
    }

}

function isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

$('form').on('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;
    $.ajax({
        url: 'main.php',
        method: 'POST',
        data: $(this).serialize(),
        dataType: "json",
        beforeSend: function () {
            $('.main__form-submit').attr('disabled', 'disabled');
        },
        success: function (data) {
            $('.main__form-submit').attr('disabled', false);
            if (data.validate) {
                newRow = '<tr>';
                newRow += '<td>' + data.xval + '</td>';
                newRow += '<td>' + data.yval + '</td>';
                newRow += '<td>' + data.rval + '</td>';
                newRow += '<td>' + data.hitres + '</td>';
                newRow += '<td>' + data.curtime + '</td>';
                newRow += '<td>' + data.exectime/1000 + '</td>';

                $('.main__table').append(newRow);
                $("form").trigger("reset");
            }
        }
    });
});