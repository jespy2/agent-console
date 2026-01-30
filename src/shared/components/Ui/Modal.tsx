import { useEffect, useId, useRef, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // close on esc and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose])

  // Move focus to first focasable element when opening
  useEffect(() => {
    if (!isOpen) return;
    const el = dialogRef.current;
    if (!el) return;

    const focusable = el.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusable?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className='modal-overlay'
      onMouseDown={(e) => {
        // click outside closes
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className='modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        ref={dialogRef}
        onKeyDown={(e) => {
          // Focus trap: handle Tab inside dialog
          if (e.key !== 'Tab') return;
          const el = dialogRef.current;
          if (!el) return;

          const focusables = Array.from(
            el.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((node) => !node.hasAttribute('disabled'));

          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }}
      >
        <div className='modal-header'>
          <h2 id={titleId} className='modal-title'>
            {title}
          </h2>
          <button type='button' onClick={onClose} aria-label='Close dialog'>
            x
          </button>
        </div>

        <div className='modal-body'>{children}</div>
      </div>
    </div>
  )
}