import styled from 'styled-components';
import { sizes } from '~/client/styles';
import { NAV_WIDTH, STATE_PANEL_WIDTH } from '~/client/components';

const SCREEN_CONTAINER_WIDTH = `calc(100vw - ${NAV_WIDTH}px - ${STATE_PANEL_WIDTH}px)`;

export const ScreenContainer = styled.div`
  padding: ${sizes.sm};
  min-width: ${SCREEN_CONTAINER_WIDTH};
  max-width: ${SCREEN_CONTAINER_WIDTH};
`;
