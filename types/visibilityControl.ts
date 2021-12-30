export type VisibilityControl = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  visible: boolean;
};

export type VisibilityControlProps = {
  control: VisibilityControl;
};
