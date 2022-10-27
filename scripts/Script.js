$(document).ready(function() {

document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}
document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

let loader = $('.loader');
$('#submit').click(function () {
    let name = $('#name');
    let product = $('#product');
    let phone = $('#phone');
    let hasError = false;

    $('.error-input').hide();

    if (!name.val()) {
        name.next().show();
        hasError = true;
        name.css("border-color", "red");
    }  else {
        name.css("border-color", "rgb(130, 19, 40)");
    }

    if (!product.val()) {
        product.next().show();
        hasError = true;
        product.css("border-color", "red");
    } else {
        product.css("border-color", "rgb(130, 19, 40)");
    }

    if (!phone.val()) {
        phone.next().show();
        hasError = true;
        phone.css("border-color", "red");
    } else {
        phone.css("border-color", "rgb(130, 19, 40)");
    }

    if (!hasError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: { product: product.val(), name: name.val(), phone: phone.val() }
        })
            .done(function( msg ) {
                loader.hide();
                if(msg.success) {
                    $('#order__form').css('display', 'none');
                    $('#thanks').css('display', 'block');

                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
                console.log(msg)
            });
    }
})

})