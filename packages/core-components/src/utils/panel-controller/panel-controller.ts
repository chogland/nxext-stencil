import { PanelI } from '../../components/interfaces';
import { componentOnReady } from '../helpers';

const createPanelController = () => {
  const panels: PanelI[] = [];

  const open = async (panel?: string | null): Promise<boolean> => {
    const panelEl = await get(panel);
    if (panelEl) {
      return panelEl.open();
    }
    return false;
  };

  const close = async (panel?: string | null): Promise<boolean> => {
    const panelEl = await (panel !== undefined ? get(panel) : getOpen());
    if (panelEl !== undefined) {
      return panelEl.close();
    }
    return false;
  };

  const toggle = async (panel?: string | null): Promise<boolean> => {
    const panelEl = await get(panel);
    if (panelEl) {
      return panelEl.toggle();
    }
    return false;
  };

  const enable = async (shouldEnable: boolean, panel?: string | null): Promise<HTMLRdsPanelElement | undefined> => {
    const panelEl = await get(panel);
    if (panelEl) {
      panelEl.disabled = !shouldEnable;
    }
    return panelEl;
  };

  const isOpen = async (panel?: string | null): Promise<boolean> => {
    if (panel != null) {
      const panelEl = await get(panel);
      return panelEl !== undefined && panelEl.isOpen();
    } else {
      const panelEl = await getOpen();
      return panelEl !== undefined;
    }
  };

  const isEnabled = async (panel?: string | null): Promise<boolean> => {
    const panelEl = await get(panel);
    if (panelEl) {
      return !panelEl.disabled;
    }
    return false;
  };

  const get = async (panel?: string | null): Promise<HTMLRdsPanelElement | undefined> => {
    await waitUntilReady();
    if (panel != null) {
      // get the panel by its "id"
      const idMatch = find(p => p.panelId === panel);
      if (idMatch) {
        return idMatch;
      }
    }

    // return the first enabled panel
    const panelEl = find(p => !p.disabled);
    if (panelEl) {
      return panelEl;
    }

    // get the first panel in the array, if one exists
    return panels.length > 0 ? panels[0].el : undefined;
  };

  /**
   * Get the instance of the opened panel. Returns `null` if a panel is not found.
   */
  const getOpen = async (): Promise<HTMLRdsPanelElement | undefined> => {
    await waitUntilReady();
    return _getOpenSync();
  };

  /**
   * Get all panel instances.
   */
  const getPanels = async (): Promise<HTMLRdsPanelElement[]> => {
    await waitUntilReady();
    return getPanelsSync();
  };

  const _register = (panel: PanelI) => {
    if (panels.indexOf(panel) < 0) {
      if (!panel.disabled) {
        _setActivePanel(panel);
      }

      panels.push(panel);
    }
  };

  const _unregister = (panel: PanelI) => {
    const index = panels.indexOf(panel);
    if (index > -1) {
      panels.splice(index, 1);
    }
  };

  const _setActivePanel = (panel: PanelI) => {
    // if this panel should be enabled
    // then find all the other panels and
    // automatically disable other panels
    panels.filter(p => p !== panel).forEach(p => (p.disabled = true));
  };

  const _setOpen = async (panel: PanelI, shouldOpen: boolean): Promise<boolean> => {
    if (shouldOpen) {
      const openedpanel = await getOpen();
      if (openedpanel && panel.el !== openedpanel) {
        await openedpanel.setOpen(false);
      }
    }
    return panel._setOpen(shouldOpen);
  };

  const _getOpenSync = (): HTMLRdsPanelElement | undefined => {
    return find(p => p._isOpen);
  };

  const getPanelsSync = (): HTMLRdsPanelElement[] => {
    return panels.map(panel => panel.el);
  };

  const find = (predicate: (panel: PanelI) => boolean): HTMLRdsPanelElement | undefined => {
    const instance = panels.find(predicate);
    if (instance !== undefined) {
      return instance.el;
    }
    return undefined;
  };

  const waitUntilReady = () => {
    return Promise.all(Array.from(document.querySelectorAll('rds-panel')).map(panel => new Promise(resolve => componentOnReady(panel, resolve))));
  };

  return {
    get,
    getPanels,
    getOpen,
    isEnabled,
    isOpen,
    enable,
    toggle,
    close,
    open,
    _getOpenSync,
    _register,
    _unregister,
    _setOpen,
    _setActivePanel,
  };
};

export const panelController = /*@__PURE__*/ createPanelController();
