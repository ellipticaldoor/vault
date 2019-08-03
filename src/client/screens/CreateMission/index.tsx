import React, { useState } from 'react';
import {
  ScreenContainer,
  InputGroup,
  TextTitle,
  InputNumber,
  Button,
  Select,
  InputCoordinate,
} from 'client/components';
import { MissionKind } from 'api';
import useGameStateContext from 'client/state';

const missionKindOptions = Object.keys(MissionKind);

export const CreateMission: React.FC = () => {
  const {
    state: { myVault },
  } = useGameStateContext();

  const [kind, setKind] = useState<string>(MissionKind.Attack);
  const [toX, setToX] = useState(0);
  const [toY, setToY] = useState(0);
  const [dwellers, setDwellers] = useState(0);
  const [iron, setIron] = useState(0);

  return (
    <ScreenContainer>
      <TextTitle>Create a mission</TextTitle>

      <Select
        value={kind}
        options={missionKindOptions}
        label="Mission kind"
        onChange={setKind}
      />

      <InputCoordinate
        label="To coordinate"
        x={toX}
        setX={setToX}
        y={toY}
        setY={setToY}
      />

      <InputGroup label="Initial mission resources">
        <InputNumber
          label="dwellers"
          value={dwellers}
          onChange={setDwellers}
          min={0}
          max={myVault.resource.dwellers}
        />
        <InputNumber
          label="iron"
          value={iron}
          onChange={setIron}
          min={0}
          max={myVault.resource.iron}
        />
      </InputGroup>

      <Button title="Submit" onClick={() => {}} />
    </ScreenContainer>
  );
};
