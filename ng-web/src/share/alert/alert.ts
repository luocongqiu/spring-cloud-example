import swal from 'sweetalert2';

class AlertFactory {

    show(): void {
        swal({});
    }

    confirm(options: { title?: string, message?: string } | string): Promise<any> {
        if (typeof options === 'string') {
            options = {title: options};
        }
        return swal({
            title: options.title || '',
            text: options.message || '',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '确&#12288;定',
            cancelButtonText: '取&#12288;消',
            confirmButtonClass: 'btn btn-primary mr-4',
            cancelButtonClass: 'btn btn-secondary',
            buttonsStyling: false
        });
    }
}
export const Alert = new AlertFactory();