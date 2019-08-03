import React from 'react';
import { Mission } from 'api';

export type ListMissionsProps = {
  missions: Mission[];
};

export const ListMissions: React.FC<ListMissionsProps> = ({ missions }) => {
  return (
    <ul>
      {missions.map((mission) => (
        <li key={mission.id}>
          <div>
            from: x: {mission.from.x} y: {mission.from.y}
          </div>
          <div>
            to: x: {mission.to.x} y: {mission.to.y}
          </div>
          <div>kind: {mission.kind}</div>
          <div>arrival: {mission.arrivalTick}</div>
          <div>comeback: {mission.comebackTick}</div>
        </li>
      ))}
    </ul>
  );
};
