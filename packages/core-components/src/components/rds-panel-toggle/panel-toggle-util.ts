import { panelController } from '../../utils/panel-controller/panel-controller';

// Given a panel, return whether or not the panel toggle should be visible
export const updateVisibility = async (panel: string | undefined) => {
  const panelEl = await panelController.get(panel);

  return !!(panelEl && (await panelEl.isActive()));
};
