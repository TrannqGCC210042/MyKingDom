$("#sign-out").click(function (e) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-secondary me-2'
        },
        buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        cancelButtonText: 'Cancel',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/logout'
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    })
})

const pathname = window.location.pathname
const element = document.querySelector("#ftco-nav > ul");

for (let i = 1; i < element.childNodes.length; i += 2) {
    const href = element.childNodes[i].childNodes[0].getAttribute("href")
    if (href === pathname) {
        element.childNodes[i].className += " active"
    }
}