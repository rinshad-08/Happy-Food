export type ToastType = 'success' | 'error' | 'info';

export interface ToastEventDetail {
  message: string;
  type?: ToastType;
}

export const toast = (message: string, type: ToastType = 'success') => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent<ToastEventDetail>('show-toast', {
      detail: { message, type }
    });
    document.dispatchEvent(event);
  }
};
