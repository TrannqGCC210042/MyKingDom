function confirmOrder(id) {
    const confirmOrder = document.getElementById('confirmOrder_' + id);
    const path = '/manage/order/' + id;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success me-2',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        'icon': 'question',
        'title': 'Are you sure?',
        'text': 'This order will be confirmed!',
        'showCancelButton': true,
        'confirmButtonText': 'Yes, delete it',
        'cancelButtonText': 'No, keep it'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: path,
                type: 'PUT',
                success: function (result) {
                    Swal.fire({
                        icon: 'success',
                        title: result.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    confirmOrder.className = 'btn btn-success fa fa-check';
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    })
}