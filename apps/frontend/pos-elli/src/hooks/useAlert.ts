import Swal, { type SweetAlertIcon, type SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface ConfirmationOptions {
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

interface CustomHtmlModalOptions {
    title?: string;
    html: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    preConfirm?: () => any | Promise<any>;
}

export const useAlert = () => {
    const showSuccess = (message: string = "Operación exitosa") => {
        MySwal.fire({
            icon: "success",
            title: message,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
        });
    };

    const showSuccessFire = (
        message: string,
        title: string = "Éxito",
        icon: SweetAlertIcon = "success"
    ) => {
        MySwal.fire({
            icon,
            title,
            text: message,
        });
    };

    const showError = (message: string = "Ocurrió un error") => {
        MySwal.fire({
            icon: "error",
            title: "Error",
            text: message,
        });
    };

    const showInfo = (message: string = "Información relevante") => {
        MySwal.fire({
            icon: "info",
            title: "Información",
            text: message,
        });
    };

    const showConfirmation = async ({
        title = "¿Estás seguro?",
        text = "",
        confirmButtonText = "Sí",
        cancelButtonText = "Cancelar",
    }: ConfirmationOptions): Promise<boolean> => {
        const result: SweetAlertResult = await MySwal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText,
            cancelButtonText,
        });
        return result.isConfirmed;
    };

    const showLoadingModal = (title: string = "Cargando...") => {
        MySwal.fire({
            title,
            allowOutsideClick: false,
            didOpen: () => {
                MySwal.showLoading();
            },
        });
    };

    const hideLoadingModal = () => {
        MySwal.close();
    };

    const showCustomHtmlModal = async ({
        title = "Personalizado",
        html,
        confirmButtonText = "Aceptar",
        cancelButtonText = "Cancelar",
        preConfirm,
    }: CustomHtmlModalOptions): Promise<SweetAlertResult> => {
        const result = await MySwal.fire({
            title,
            html,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText,
            cancelButtonText,
            preConfirm,
        });
        return result;
    };

    return {
        showSuccess,
        showSuccessFire,
        showError,
        showInfo,
        showConfirmation,
        showLoadingModal,
        hideLoadingModal,
        showCustomHtmlModal,
    };
};
