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

export const NewMission: React.FC = () => {
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
      <TextTitle>New Mission</TextTitle>

      <Select
        value={kind}
        options={missionKindOptions}
        label="Of kind"
        onChange={setKind}
      />

      <InputCoordinate
        label="To vault at"
        x={toX}
        setX={setToX}
        y={toY}
        setY={setToY}
      />

      <InputGroup label="With initial resources amount">
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

      <Button title="Start new mission" onClick={() => {}} />
    </ScreenContainer>
  );
};
