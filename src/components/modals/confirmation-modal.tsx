import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import PrimaryButton from "../buttons/primary-button";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  desc: React.ReactNode;
  closeTitle?: string;
  confirmTitle?: string;
  isLoadingConfirm?: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
};

export default function ConfirmationModal({
  isOpen,
  title,
  desc,
  closeTitle = "Cancel",
  confirmTitle = "Confirm",
  isLoadingConfirm = false,
  onOpenChange,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{desc}</ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={isLoadingConfirm}
                  variant="bordered"
                  onPress={onClose}
                >
                  {closeTitle}
                </Button>
                <PrimaryButton
                  isLoading={isLoadingConfirm}
                  className="w-fit"
                  onPress={onConfirm}
                >
                  {confirmTitle}
                </PrimaryButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
