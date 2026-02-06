import React from 'react';
import { Modal as HeroModal } from '@heroui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <HeroModal>
      <HeroModal.Backdrop
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        variant="blur"
        className="bg-black/50"
      >
        <HeroModal.Container size="md" placement="center" scroll="inside">
          <HeroModal.Dialog
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <HeroModal.CloseTrigger className="absolute top-4 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FAFBFC] transition-colors" />
            <HeroModal.Header className="sticky top-0 bg-white border-b border-[rgba(20,30,60,0.08)] px-6 py-4 flex items-center justify-between">
              <HeroModal.Heading id="modal-title" className="text-2xl font-bold text-[#0F172A]">
                {title}
              </HeroModal.Heading>
            </HeroModal.Header>
            <HeroModal.Body className="p-6 overflow-y-auto flex-1">{children}</HeroModal.Body>
          </HeroModal.Dialog>
        </HeroModal.Container>
      </HeroModal.Backdrop>
    </HeroModal>
  );
};
