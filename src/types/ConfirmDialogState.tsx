type ConfirmDialogState = {
  isOpen: boolean;
  title: string;
  subTitle: string;
  onConfirm: () => void;
};

export default ConfirmDialogState;
