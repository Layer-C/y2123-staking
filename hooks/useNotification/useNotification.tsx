import { Notification, NotificationType } from 'components';
import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as UUID } from 'uuid';
import { DomUtils } from 'utils';
import { ClassName } from 'types';

type VerticalAlignment = 'top' | 'bottom';
type HorizontalAlignment = 'left' | 'right' | 'center';

export type Placement = `${VerticalAlignment}-${HorizontalAlignment}`;

export type Options = {
  hideOnUnmount?: boolean;
  hideAfter?: number;
  model?: React.MutableRefObject<HTMLElement> | Element;
  host?: React.MutableRefObject<HTMLElement> | Element;
  placement?: Placement;
  containerClassName?: string;
};

const NOTIFICATION_CONTAINER_ID = 'notification-container';
const NOTIFICATION_ID_WRAPPER_CLASS = 'notification-id-wrapper';

const NOTIFICATION_DEFAULT_TIMEOUT = 3000;

export const useNotification = (options?: Options) => {
  const {
    hideOnUnmount = false,
    hideAfter = NOTIFICATION_DEFAULT_TIMEOUT,
    model,
    host,
    placement = 'top-center',
    containerClassName,
  } = options || {};
  const [verticalAlignment, horizontalAlignment] = placement.split('-') as [VerticalAlignment, HorizontalAlignment];

  const idsRef = React.useRef<string[]>([]);

  const hide = React.useCallback((id: string) => {
    const notificationIdWrapper = document.querySelector(`[data-notification-id='${id}']`);
    const notification = notificationIdWrapper?.getElementsByClassName('vs-notification')[0];

    notification?.classList.add('disappear');

    setTimeout(() => {
      document.querySelector(`[data-notification-id='${id}']`)?.remove();

      const idWrappers = document.getElementsByClassName(NOTIFICATION_ID_WRAPPER_CLASS);

      const hasNoNotifications = !idWrappers.length;

      if (hasNoNotifications) {
        document.getElementById(NOTIFICATION_CONTAINER_ID)?.remove();
      }
    }, 150);
  }, []);

  React.useEffect(() => {
    return () => {
      if (hideOnUnmount) {
        idsRef.current.forEach(id => hide(id));
      }
    };
  }, [hide, hideOnUnmount]);

  const adjustPosition = React.useCallback(() => {
    const notificationContainer = document.getElementById(NOTIFICATION_CONTAINER_ID);

    if (!notificationContainer) return;

    const modelElement: HTMLElement =
      (model as React.MutableRefObject<HTMLElement>)?.current || (model as HTMLElement) || document.body;

    const modelElementStyles = window.getComputedStyle(modelElement);
    const { y: modelElementTop } = DomUtils.getCoords(modelElement);
    const modelElementPaddingTop = +modelElementStyles.paddingTop.slice(0, modelElementStyles.paddingTop.length - 2);
    const modelElementPaddingRight = +modelElementStyles.paddingRight.slice(
      0,
      modelElementStyles.paddingRight.length - 2
    );
    const { offsetWidth: rootWidth } = document.body!;
    const { offsetWidth: bodyWidth } = document.body;
    const scrollbarWidth = bodyWidth - rootWidth;

    // if (modelElementTop < window.scrollY && notificationContainer.style.position === 'absolute') {
    //   Object.assign(notificationContainer.style, { position: 'fixed', top: modelElementPaddingTop + 'px' });
    // }

    // if (modelElementTop >= window.scrollY && notificationContainer.style.position === 'fixed') {
    //   Object.assign(notificationContainer.style, {
    //     position: 'absolute',
    //     top: modelElementTop + modelElementPaddingTop + 'px',
    //   });
    // }
  }, [model]);

  React.useEffect(() => {
    window.addEventListener('scroll', adjustPosition);

    return () => {
      window.removeEventListener('scroll', adjustPosition);
    };
  }, [adjustPosition]);

  type OpenOptions = ClassName & {
    content: React.ReactNode | ((id: string) => React.ReactNode);
    onHide?: () => void;
    type?: NotificationType;
  };

  const resolvePosition = React.useCallback(() => {
    let top: number | string = 'auto';
    let bottom: number | string = 'auto';
    let left: number | string = 'auto';
    let right: number | string = 'auto';
    let transform = 'none';

    switch (verticalAlignment) {
      case 'top':
        top = 0;
        break;
      case 'bottom':
        bottom = 0;
        break;
      default:
        break;
    }

    switch (horizontalAlignment) {
      case 'left':
        left = 0;
        break;
      case 'right':
        right = 0;
        break;
      case 'center':
        left = '50%';
        transform = 'translateX(-50%)';
        break;
      default:
        break;
    }

    return { top, bottom, left, right, transform };
  }, [horizontalAlignment, verticalAlignment]);

  const show = React.useCallback(
    ({ content, onHide, className, type }: OpenOptions) => {
      const modelElement: HTMLElement =
        (model as React.MutableRefObject<HTMLElement>)?.current || (model as HTMLElement) || document.body;

      const modelElementStyles = window.getComputedStyle(modelElement);
      const { y: modelElementTop } = DomUtils.getCoords(modelElement);
      const modelElementPaddingTop = +modelElementStyles.paddingTop.slice(0, modelElementStyles.paddingTop.length - 2);
      const modelElementPaddingRight = +modelElementStyles.paddingRight.slice(
        0,
        modelElementStyles.paddingRight.length - 2
      );
      const { offsetWidth: rootWidth } = document.body!;
      const { offsetWidth: bodyWidth } = document.body;
      const scrollbarWidth = bodyWidth - rootWidth;
      let notificationContainer = document.getElementById(NOTIFICATION_CONTAINER_ID);

      const { top, bottom, left, right, transform } = resolvePosition();

      if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = NOTIFICATION_CONTAINER_ID;
        notificationContainer.className = containerClassName || '';
        notificationContainer.style.cssText = `
          top: ${typeof top === 'string' ? top : top + modelElementTop + modelElementPaddingTop + 104 + 'px'};
          bottom: ${bottom};
          left: ${left};
          right: ${typeof right === 'string' ? right : right + +scrollbarWidth + modelElementPaddingRight + 'px'};
          transform: ${transform};
          max-height: calc(100vh - ${modelElementTop}px - ${modelElementPaddingTop});
          position: fixed;
          overflow: hidden;
          width: fit-content;
          z-index: 100;
        `;

        const notificationStickingContainer = document.createElement('div');
        notificationStickingContainer.style.cssText = `

        `;
        notificationContainer.appendChild(notificationStickingContainer);

        const hostNode =
          (host && ((host as React.MutableRefObject<HTMLElement>)?.current || (host as HTMLElement))) || document.body;

        hostNode.appendChild(notificationContainer);
      }

      const notificationId = UUID();
      const notificationIdWrapper = document.createElement('div');
      notificationIdWrapper.style.cssText = `
        width: fit-content;
      `;
      notificationIdWrapper.setAttribute('data-notification-id', notificationId);
      notificationIdWrapper.className = NOTIFICATION_ID_WRAPPER_CLASS;

      idsRef.current.push(notificationId);

      setTimeout(() => {
        hide(notificationId);
        onHide?.();
      }, hideAfter);

      ReactDOM.render(
        <Notification onHide={() => hide(notificationId)} type={type} className={className}>
          {typeof content === 'function' ? content(notificationId) : content}
        </Notification>,
        notificationIdWrapper
      );

      notificationContainer.appendChild(notificationIdWrapper);

      adjustPosition();

      return notificationId;
    },
    [adjustPosition, containerClassName, hide, hideAfter, host, model, resolvePosition]
  );

  return React.useMemo(() => ({ show, hide }), [hide, show]);
};
