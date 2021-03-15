$(() => {
    console.log('js connected!');

    $('.recipe').on('click', (e) => {
    	e.preventDefault();
    	const id = '#' + $(e.target).data('id');
    	if ($(id).parent().parent().children('.ingredients').css('display') == "none"){
    		$(id).parent().parent().children('.ingredients').css('display', "block");
    		$(id).html("Hide Ingredients");
    	} else {
    		$(id).parent().parent().children('.ingredients').css('display', "none");
    		$(id).html("List Ingredients");
    	}
    })

    $('.search-ingredients').on('submit', (e) => {
        e.preventDefault();

        let name = $('.ingredient-input').val();

        $.ajax({
            method: 'GET',
            url: `/ingredients/${name}`,
            success: response => {
                window.location.replace('/ingredients/list')
            },
            error: msg => {
                console.log(msg);
            }
        });
    });
});