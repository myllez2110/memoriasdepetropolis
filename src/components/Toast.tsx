import { X } from 'lucide-react';

type ToastProps = {
  message: string;
  onDismiss: () => void;
};

export function Toast({ message, onDismiss }: ToastProps) {
  if (!message) return null;
  return (
    <button className="toast" onClick={onDismiss}>
      {message}<X size={15} />
    </button>
  );
}
