import Swal from "sweetalert2";

const BaseSwal = Swal.mixin({
  scrollbarPadding: false,
  customClass: {
    popup: "rounded-xl shadow-lg",
    confirmButton: "bg-primary text-white px-4 py-2 rounded-md",
    cancelButton: "bg-muted text-foreground px-4 py-2 rounded-md",
  },
  buttonsStyling: false,
});

export const showSuccess = (message: string, title = "Success") => {
  return BaseSwal.fire({
    icon: "success",
    title,
    text: message,
    timer: 3500,
    showConfirmButton: false,
  });
};

export const showError = (message: string, title = "Oops!") => {
  return BaseSwal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonText: "Okay",
    customClass: {
      confirmButton: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md",
    },
    buttonsStyling: false, // Important!
  });
};

export const showConfirm = (message: string, title = "Are you sure?", confirmText = "Yes", cancelText = "Cancel"): Promise<boolean> => {
  return BaseSwal.fire({
    icon: "question",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  }).then((result) => result.isConfirmed);
};

export const showInfo = (message: string, title = "Info") => {
  return BaseSwal.fire({
    icon: "info",
    title,
    text: message,
  });
};
