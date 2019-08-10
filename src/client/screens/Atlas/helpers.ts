import { NAV_WIDTH, STATE_PANEL_WIDTH } from 'client/components';

export type AtlasSize = {
  width: number;
  height: number;
};

export const getAtlasSize = () => ({
  width: window.innerWidth - NAV_WIDTH - STATE_PANEL_WIDTH,
  height: window.innerHeight,
});
