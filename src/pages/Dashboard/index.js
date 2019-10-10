import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import { Container, Title, List } from './styles';
import Appointment from '~/components/Appointment';
import api from '~/services/api';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments');

      if (Platform.OS === 'android') {
        response.data.map(appointment => {
          const { avatar } = appointment.provider;
          if (avatar) {
            appointment.provider.avatar.url = avatar.url.replace(
              'localhost',
              '10.0.0.100'
            );
          }
        });
      }
      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
      </Container>
      <List
        data={appointments}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Appointment onCancel={() => handleCancel(item.id)} data={item} />
        )}
      />
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
